import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./styles.module.css";
import { FileIcon, defaultStyles } from "react-file-icon";
import { IconButton, Stack, Typography, Tooltip, Card } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { convertSizeInKB, getDateFromEpoc, showToast } from "../../../../helper";
import ActionDialog from "../ActionOverlay";
import { useNavigate } from "react-router";

export default function FileListingTableView(props) {
  const { fileList, 
    isLoading, 
    fetchError,
     folderSelected, 
    searchText,
    setRefreshFileListing
  } = props;

  const [fileListToShow, setFileListToShow] = useState([]);
  const [showActionDialog,setShowActionDialog]=useState(false);
  const [message,setMessage]=useState('');
  const navigate=useNavigate();
  const handleRefresh=()=>{
    setRefreshFileListing(prev=>prev+1);
  }

  const handleDownload = (fileName) => {
    fetch(`/download/${folderSelected}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      });
    });
  };

  const handleDelete=(fileName)=>{
    fetch(`/delete/${folderSelected}/${fileName}`, {
      method: 'DELETE'
    })
      .then(data => {
        setMessage(data.message);
        handleRefresh()
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred while deleting the file');
      });
  
  }
  useEffect(() => {
    const fileListImprint = [...fileList];
    const result = fileListImprint.filter(({ name }) =>
      String(name).toLowerCase().includes(String(searchText))
    );
    setFileListToShow(result);
  }, [fileList, searchText]);

  const handleShowDialog=(fileName)=>{
    setShowActionDialog(true);
    navigate(`/?folder=${folderSelected}&file=${fileName}`)
  }

  return (
    <div className={classes.fileListingTableVieWrapperCss}>
      {!folderSelected && <ShowMessageCard message="Please select a folder to view"/>}
      {folderSelected && isLoading && <ShowMessageCard message={`Fetching all files for ${folderSelected}...`}/>}
      {folderSelected && !isLoading && fetchError && <ShowMessageCard message='Something went wrong'/>}
      {folderSelected && !isLoading && fileListToShow.length===0 && <ShowMessageCard 
      message={`No result found, ${searchText?'try adjusting your search':''}`}
      />}
      {folderSelected && !isLoading && fileListToShow.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ minHeight: "662px", maxHeight: "662px", overflowY: "scroll" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Last edit on</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileListToShow.length > 0 &&
                fileListToShow.map(({ name, size, createdOn }) => {
                  return (
                    <TableRow
                      key={name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <div style={{ width: "24px", height: "24px" }}>
                            {" "}
                            <FileIcon
                              extension={name.split(".")[1]}
                              {...defaultStyles[name.split(".")[1]]}
                            />
                          </div>
                          <Typography variant="subtitle2" pt={1}>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        {getDateFromEpoc(createdOn)}
                      </TableCell>
                      <TableCell align="right">
                        {convertSizeInKB(size)}
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Tooltip title="Download">
                            <IconButton
                              size="small"
                              color="primary"
                              aria-label="downlaod"
                              onClick={() => handleDownload(name)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Share">
                            <IconButton
                              size="small"
                              aria-label="copy or move"
                              onClick={() => handleShowDialog(name)}
                            >
                              <ContentCopyIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              sx={{ color: "#696969" }}
                              aria-label="delete"
                              onClick={() => handleDelete(name)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {
        showActionDialog && <ActionDialog open={showActionDialog} setOpen={setShowActionDialog}/>
      }
    </div>
  );
}



const ShowMessageCard=(props)=>{
  const {message}=props
  return(
  <Card className={classes.cardWrapperCss}>
  <Typography variant="h6">
  {message}
  </Typography>
</Card>
  )
}