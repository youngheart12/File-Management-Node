

export const getDateFromEpoc=(date)=>{
   return new Date(Math.floor(date)).toDateString()
}

export const convertSizeInKB=(size)=>{
    const kb=Math.floor(size/1024);

    if(kb<1)
    {
        return `${size} byte`
    }
    return `${Math.floor(size/1024)} kb`;
}

