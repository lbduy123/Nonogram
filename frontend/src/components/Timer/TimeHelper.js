export const convertTimeToMSM = (type,value) =>{
    if(type==="minute"){
        return  Math.floor((value % (1000 * 60 * 60)) / (1000 * 60))
    }
    else if(type==="second") {
        return Math.floor((value % (1000 * 60)) / 1000);
    }
    else if(type==="milisecond") {
        return Math.floor(value % 1000)
    }
    else {
        console.log('Type Error')
        return NaN
    }
}

export const convertToMiliSecond = (type,value) =>{
    if(type==="minute"){
        return  Math.floor(value* 60 * 1000 )
    }
    else if(type==="second") {
        return Math.floor(value*1000) ;
    }
    else {
        console.log('Type Error')
        return NaN
    } 
}