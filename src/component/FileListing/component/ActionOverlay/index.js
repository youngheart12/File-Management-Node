import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Select,
    MenuItem,
    Stack,
    InputLabel,
    OutlinedInput,
  } from "@mui/material";
  import React, { useState,useEffect } from "react";
  import { useLocation } from "react-router";
  
  // ActionDialog component for displaying the action dialog
  const ActionDialog = ({ open, setOpen }) => {
    // State for storing selected action (move or copy)
    const [action, setAction] = useState("copy");
    // State for storing selected destination folder
    const [destination, setDestination] = useState("");
    // State for storing folder list to show in destination select
    const [folderList,setFolderList]=useState([]);
    // State for loading indicator
    const [isLoading,setIsLoading]=useState(false);
    // State for error while fetching folder list
    const [fetchError,setFetchError]=useState(false);
    // To get location of current page
    const location = useLocation();
  
    // Function to open the dialog
    const handleOpen = () => {
      setOpen(true);
    };
  
    // Function to close the dialog
    const handleClose = () => {
      setOpen(false);
    };
  
    // Function to handle change in selected action
    const handleActionChange = (event) => {
      setAction(event.target.value);
    };
  
    // Function to handle change in selected destination folder
    const handleDestinationChange = (event) => {
      setDestination(event.target.value);
    };
  
    // useEffect to fetch folder list from API
    useEffect(() => {
      // Resetting error state and setting loading state to true
      setFetchError(false)
      setIsLoading(true);
      // Fetching folder list from API
      fetch('/directory')
        .then((res) => res.json())
        .then((data) => {
          // Updating folder list and setting loading state to false
          setFolderList(data.files);
          setIsLoading(false);
        })
        .catch((e) => {
          // Setting loading state to false and error state to true
          setIsLoading(false);
          setFetchError(true);
          console.warn(e,"error");
        });
    }, []);

    const handleSubmit=()=>{
        // Get the values of `file` and `folder` from the URL search parameters
        const params = new URLSearchParams(location.search);
        const fileName= params.get('file');
        const folderName= params.get('folder');
    
        // Prepare data object to send to the server
        const data={
            sourceFileName:fileName,
            sourceFolder:folderName,
            destinationFolder:destination
        }
    
        // Check if the action type is "copy"
        if(action==="copy"){
            // Set the request options for a PUT request
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
    
            // Make a fetch request to the `/copy` endpoint
            fetch('/copy', requestOptions)
                .then(response => response.json())
                .then(data =>{
                    // Check if the response contains a message
                    if(data.message){
                        // If it does, show an alert and close the dialog
                        alert('File copied');
                        setOpen(false);
                    }
                });
     
        // If the action type is not "copy", it must be "move"
        }else{
            // Set the request options for a POST request
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
    
            // Make a fetch request to the `/move` endpoint
            fetch('/move', requestOptions)
                .then(response => response.json())
                .then(data =>{
                    // Check if the response contains a message
                    if(data.message){
                        // If it does, show an alert and close the dialog
                        alert('File moved');
                        setOpen(false);
                    }
                });
        }
    }
    
  return (
    <div>
    {/* Open a dialog with a Select Action button */}
    <Button variant="outlined" color="primary" onClick={handleOpen}>
      Select Action
    </Button>

    {/* Dialog to select copy or move action and destination folder */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Action</DialogTitle>
      <DialogContent>
        <Stack direction="column">

          {/* Form control to select between copy or move action */}
          <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="demo-multiple-name-label">
              Copy or Move
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={action}
              onChange={handleActionChange}
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem key="move" value="move">
                Move
              </MenuItem>
              <MenuItem key="copy" value="copy">
                Copy
              </MenuItem>
            </Select>
          </FormControl>

          {/* Form control to select destination folder */}
          <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id="demo-multiple-name-label">Destination</InputLabel>
            {
              !isLoading && !fetchError &&
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={destination}
                onChange={handleDestinationChange}
                input={<OutlinedInput label="Name" />}
              >
                {folderList.map(({name}) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            }
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* Cancel button to close the dialog */}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>

        {/* Confirm button to submit the selected action and destination folder */}
        <Button onClick={handleSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </div>

  );
};

export default ActionDialog;
