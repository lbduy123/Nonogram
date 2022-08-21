import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'



export default function Timer({check=false,timeBegin, getTimeResult}) {

    const [seconds, setSeconds] =  useState(0);
    const [minutes, setMinutes] = useState(0);
    const [time,setTime]= useState({
        hours:0,
        minutes:0,
        seconds:0
    })


    var timer;
    useEffect(()=>{
        if(!check){
            timer = setInterval(()=>{      
                let timePresent = Date.now() - timeBegin
                let hours = Math.floor((timePresent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((timePresent % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timePresent % (1000 * 60)) / 1000);
                setTime(prev=>{
                    return {
                        ...prev,
                        hours:hours,
                        minutes:minutes,
                        seconds:seconds
                    }
                })
            },1000)
        }
        else{
            clearInterval(timer)
        }
        return ()=>clearInterval(timer);
    })
    if(check){
        getTimeResult(time);
    }
   
  return (
    <div style={{
        backgroundColor:'black',
        paddingLeft:'20px'
    }}>  
        <h1 style={{
            textAlign:'left',
            color:'#fff'
        }}>{time.hours}:{time.minutes}:{time.seconds}</h1>
    </div>
  )
}
