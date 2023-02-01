import React,{useState} from "react";
import classes from "./styles.module.css";
import {
  Avatar,
  Stack,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import ProfilePic from "../../../../images/profile.jpg";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TableRowsIcon from '@mui/icons-material/TableRows';
import WindowIcon from '@mui/icons-material/Window';
const FileListingHeader = (props) => {
  const { searchText,
     handleSearchText,
      clearSearchText,
    activeViewType,
setActiveViewType,
folderSelected
} = props;
const [message, setMessage] = useState('');
  const handleFileChange = (e) => {
      const fileList=e.target.files;
      console.log(fileList,"hehe")
        handleUploadClick(fileList)
  };

  const handleUploadClick = (files) => {
    if (!files) {
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        console.log(files[i],"hererr")
      formData.append('files', files[i],files[i].name);
    }

    fetch(`/upload/${folderSelected}`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred while uploading the files');
      });
  };

const isCardViewActive=activeViewType==='card';

  return (
    <div className={classes.fileListHeaderWrapperCss}>
      <div className={classes.searchWrapperCss}>
        <OutlinedInput
          fullWidth
          size="small"
          onChange={(e)=>handleSearchText(e)}
          placeholder="Search for files"
          value={searchText}
          endAdornment={
            <InputAdornment position="end">
              {searchText ? (
                <IconButton
                  aria-label="clear search text"
                  onClick={clearSearchText}
                  onMouseDown={clearSearchText}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              ) : (
                <IconButton aria-label="search icon" edge="end">
                  <SearchIcon />
                </IconButton>
              )}
            </InputAdornment>
          }
        />
      </div>
      <Stack direction="row" spacing={2}>
      <IconButton aria-label="delete" disabled color="primary">
          </IconButton>
      <Button
      size="small"
  variant="outlined"
  onClick={handleUploadClick}
  component="label"
>
  Upload File
  <input
onChange={handleFileChange}
    type="file"
    multiple
    hidden
  />
</Button>
        <Avatar 
        onClick={()=>setActiveViewType('row')}
        sx={{background: !isCardViewActive?'#F6F6FA':'transparent',cursor:'pointer'}} >
          <TableRowsIcon sx={{color:!isCardViewActive?'#456CBD' :'black'}}/>
        </Avatar>
        <Avatar
           onClick={()=>setActiveViewType('card')}
        sx={{background: isCardViewActive?'#F6F6FA':'transparent',cursor:'pointer'}}>
          <WindowIcon sx={{color: isCardViewActive?'#456CBD' :'black'}}/>
        </Avatar>
        <Avatar alt="Remy Sharp" src={ProfilePic} />
        {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
      </Stack>
    </div>
  );
};

export default FileListingHeader;
