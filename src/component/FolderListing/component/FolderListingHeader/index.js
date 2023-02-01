import {
  Divider,
  Typography,
  IconButton,
  Stack,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
const FolderListingHeader = (props) => {
  const { searchText, handleSearchText, clearSearchText } = props;
  const [searchActivated, setSearchActivated] = useState(false);
  const activateSearchHandler = () => setSearchActivated(true);
  const deactivateSearchHandler = () => 
  {setSearchActivated(false);
    clearSearchText()
  }
  return (
    <div className={classes.folderListingHeaderCss}>
      <Stack
        px={2}
        mb={1}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        {searchActivated ? (
          <OutlinedInput
            fullWidth
            size="small"
            onChange={(e) => handleSearchText(e)}
            placeholder="Search for folder"
            value={searchText}
          />
        ) : (
          <Typography variant="subtitle2" component="h6">
            All Folder
          </Typography>
        )}
        {searchActivated ? (
          <IconButton
            aria-label="clear search text"
            onClick={deactivateSearchHandler}
            //   onMouseDown={clearSearchText}
            edge="end"
          >
            <ClearIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={activateSearchHandler}
            aria-label="search icon"
            edge="end"
          >
            <SearchIcon sx={{ color: "#466CBD" }} />
          </IconButton>
        )}
      </Stack>

      <Divider />
    </div>
  );
};

export default FolderListingHeader;
