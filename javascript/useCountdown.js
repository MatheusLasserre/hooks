import React from 'react'

export default function useCountdown() {

    var countDownDate = new Date("Dec 02, 2022 23:59:59").getTime();


    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    


    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    
    const   [totalHours, setTotalHours] = React.useState((hours + days*24));

    // console.log('Days', days);
    // console.log('Hours', hours);
    // console.log('totalHours', Math.floor(days * hours))

    const tick = () => {
   
        if (hrs === 0 && mins === 0 && secs === 0) 
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };


    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    React.useEffect(() => {
        setTotalHours((hrs + days*24));
    },[hrs])

    return {
        days, hrs, mins, secs, totalHours
    }
}

