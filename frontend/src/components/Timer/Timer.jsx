import React from 'react'
import { useEffect, useState } from 'react';
import { convertTime } from './TimeHelper';

export default React.memo(function Timer({ check = false, timeBegin=null, getTimeResult, isLose=false, isStart=false }) {
    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0,
        miliseconds:0
    })

    useEffect(() => {
        let timer
        if (isStart && !check && timeBegin !=null && !isLose) {
            timer = setInterval(() => {
                let timePresent = Date.now() - timeBegin
                let minutes = convertTime('minute',timePresent)
                let seconds = convertTime('second',timePresent);
                let miliseconds = convertTime('milisecond',timePresent);
                setTime(prev => {
                    return {
                        ...prev,
                        minutes: minutes,
                        seconds: seconds,
                        miliseconds:miliseconds
                    }
                })
            }, 0)
        }
        else {
            getTimeResult(time);
            clearInterval(timer)
        }
        return () => clearInterval(timer);
    })


    return (
        <div style={{
            backgroundColor: 'black',
            paddingLeft: '20px',
            width: '100%'
        }}>
            <h1 style={{
                textAlign: 'left',
                color: '#fff'
            }}>{time.minutes}:{time.seconds}:{time.miliseconds}</h1>
        </div>
    )
})
