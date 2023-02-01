import { LinearProgress, Skeleton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import classes from "./styles.module.css";
const FolderListView = (props) => {
  const {
    folderList,
    folderSelectedHandler,
    searchText,
    isLoading,
    fetchError,
    folderSelected
  } = props;
  const [folderListToShow, setFolderListToShow] = useState([]);
  useEffect(() => {
    const folderListImprint = [...folderList];
    const result = folderListImprint.filter(({ name }) =>
      String(name).toLowerCase().includes(String(searchText))
    );
    setFolderListToShow(result);
  }, [folderList, searchText]);
  return (
    <div className={classes.folderListWrapperCss}>
      {isLoading && (
        <div className={classes.loadingCss}>
          <LinearProgress />
          {[...new Array(6)].map(() => {
            return (
              <div className={classes.skeletonCss}>
                <Skeleton variant="rectangular" height={32} />
              </div>
            );
          })}
        </div>
      )}
      {fetchError && (
        <div className={classes.errorCss}>Something went wrong ..</div>
      )}
      {!isLoading && !fetchError && folderListToShow.length > 0 && (
        <React.Fragment>
          {folderListToShow.length > 0 &&
            folderListToShow.map(({ name, count }) => {
              return (
                <div
                  className={folderSelected===name? classes.folderListNavItemWrapperSelected:classes.folderListNavItemWrapper}
                  onClick={() => folderSelectedHandler(name)}
                >
                  <Typography variant="subtitle2">{name}</Typography>
                  <Typography variant="subtitle2">{count}</Typography>
                </div>
              );
            })}
        </React.Fragment>
      )}

      {!isLoading && !fetchError && folderListToShow.length === 0 && (
        <div className={classes.errorCss}>No result found</div>
      )}
    </div>
  );
};

export default FolderListView;
