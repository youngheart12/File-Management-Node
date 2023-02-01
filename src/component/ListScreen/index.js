import React, { useState, useEffect } from "react";
import FileListing from "../FileListing";
import FolderListing from "../FolderListing";
import classes from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
const ListScreen = () => {
  const [folderSelected, setFolderSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const folderSelectedHandler = (name) => {
    setFolderSelected(name);
    navigate(`/?folder=${name}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const folderName = params.get("folder");
    if (!folderSelected && folderName) {
      setFolderSelected(folderName);
    }
  }, [location]);

  return (
    <div className={classes.parentWrapperCss}>
      <div className={classes.firstChildWrapperCss}>
        <FolderListing
          folderSelectedHandler={folderSelectedHandler}
          folderSelected={folderSelected}
        />
      </div>
      <div className={classes.secondChildWrapperCss}>
        <FileListing folderSelected={folderSelected} />
      </div>
    </div>
  );
};

export default ListScreen;
