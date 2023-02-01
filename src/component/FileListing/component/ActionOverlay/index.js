import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Stack,
  FormLabel,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState,useEffect } from "react";
import { useLocation } from "react-router";


const ActionDialog = ({ open, setOpen }) => {
  const [action, setAction] = useState("copy");
  const [destination, setDestination] = useState("");
  const [folderList,setFolderList]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [fetchError,setFetchError]=useState(false);
  const location =useLocation();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  useEffect(() => {
    setFetchError(false)
    setIsLoading(true);
   fetch('/directory').then((res)=>res.json()).then((data)=>{
   setFolderList(data.files);
   setIsLoading(false);
   }
   ).catch((e)=>{
       setIsLoading(false);
       setFetchError(true);
       console.warn(e,"error")
   })
}, []);

const handleSubmit=()=>{
    const actionType=action==="copy";
    const params = new URLSearchParams(location.search);
    const fileName= params.get('file');
    const folderName= params.get('folder');
    const data={
        sourceFileName:fileName,
        sourceFolder:folderName,
        destinationFolder:destination
    }
    if(actionType){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('/copy', requestOptions)
            .then(response => response.json())
            .then(data =>{
                if(data.message){
                    alert('File copied');
                    setOpen(false);
                }
            });
 
    }else{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('/move', requestOptions)
            .then(response => response.json())
            .then(data =>{
                if(data.message){
                    alert('File moved');
                    setOpen(false);
                }
            });
    }
}
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Select Action
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Action</DialogTitle>
        <DialogContent>
          <Stack direction="column">
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
            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-name-label">Destination</InputLabel>
          {!isLoading&& !fetchError &&    <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={destination}
                onChange={handleDestinationChange}
                input={<OutlinedInput label="Name" />}
                //   MenuProps={MenuProps}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActionDialog;
