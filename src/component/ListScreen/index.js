import React, { useState, useEffect } from "react";
import FileListing from "../FileListing";
import FolderListing from "../FolderListing";
import classes from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const ListScreen = () => {
  // State to store the selected folder name
  const [folderSelected, setFolderSelected] = useState("");

  // Hook to navigate to a new route
  const navigate = useNavigate();

  // Hook to access the current location object
  const location = useLocation();

  // Function to handle the selection of a folder
  const folderSelectedHandler = (name) => {
    setFolderSelected(name);
    navigate(`/?folder=${name}`);
  };

  // Effect to set the folderSelected state based on the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const folderName = params.get("folder");
    if (!folderSelected && folderName) {
      setFolderSelected(folderName);
    }
  }, [location]);

  return (
    <div className={classes.parentWrapperCss}>
      {/* First child wrapper for folder listing component */}
      <div className={classes.firstChildWrapperCss}>
        <FolderListing
          folderSelectedHandler={folderSelectedHandler}
          folderSelected={folderSelected}
        />
      </div>
      {/* Second child wrapper for file listing component */}
      <div className={classes.secondChildWrapperCss}>
        <FileListing folderSelected={folderSelected} />
      </div>
    </div>
  );
};

export default ListScreen;
