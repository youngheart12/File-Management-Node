import React, { useEffect, useState } from "react";
import FileListingTableView from "./component/FileListingTableView";
import FileListingHeader from "./component/FileListingHeader";
import classes from "./styles.module.css";
import { Button } from "@mui/material";
const FileListing = (props) => {
  const { folderSelected } = props;
  const [searchText, setSearchText] = useState("");
  const [activeViewType, setActiveViewType] = useState("card");
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [refreshFileListing,setRefreshFileListing]=useState(0);
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearchText = () => {
    setSearchText("");
  };
  console.log(folderSelected, "folde sele",refreshFileListing);
  useEffect(() => {
    if (folderSelected) {
      setFetchError(false);
      setIsLoading(true);
      fetch(`/files/${folderSelected}`)
        .then((res) => res.json())
        .then((data) => {
          setFileList(data.files);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setFetchError(true);
        });
    }
  }, [folderSelected,refreshFileListing]);

  return (
    <div className={classes.fileListWrapperCss} key={folderSelected}>
      <FileListingHeader
        searchText={searchText}
        handleSearchText={handleSearchText}
        clearSearchText={clearSearchText}
        activeViewType={activeViewType}
        setActiveViewType={setActiveViewType}
        folderSelected={folderSelected}
      />
      <FileListingTableView
        fileList={fileList}
        searchText={searchText}
        isLoading={isLoading}
        fetchError={fetchError}
        folderSelected={folderSelected}
        setRefreshFileListing={setRefreshFileListing}
      />
    </div>
  );
};

export default FileListing;
