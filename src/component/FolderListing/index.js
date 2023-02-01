
import React,{useState,useEffect} from 'react'
import FolderListingHeader from './component/FolderListingHeader';
import FolderListView from './component/FolderListView';
// import FolderListingTableView from './component/FolderListingTableView';
import classes from './styles.module.css';
const FolderListing=(props)=>{
    const [searchText,setSearchText]=useState('');
    const [folderList,setFolderList]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [fetchError,setFetchError]=useState(false);
    const handleSearchText=(e)=>{
        setSearchText(e.target.value)
    }

    const clearSearchText=()=>{
        setSearchText('');
    }
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
    }, [])
    return(
        <div className={classes.folderListingWrapperCss}>
            <FolderListingHeader
            searchText={searchText}
            handleSearchText={handleSearchText}
            clearSearchText={clearSearchText}
           
            />
           <FolderListView
            folderList={folderList}
            searchText={searchText}
            isLoading={isLoading}
            fetchError={fetchError}
            folderSelectedHandler={props.folderSelectedHandler}
            folderSelected={props.folderSelected}
           />
        </div>
    )
}


export default FolderListing;