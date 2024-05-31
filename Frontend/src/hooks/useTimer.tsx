export default function useTimer(timeLeft: number) {
    const hours = Math.floor(timeLeft / 60 / 60);
    const minutes = hours === 0 ? Math.floor(timeLeft / 60) : Math.floor(timeLeft / 60) - 60 * hours;
    const seconds = Math.ceil((timeLeft % 60));

    let secondsStr: string = `${seconds}`;
    let minutesStr: string = `${minutes}`;
    let hoursStr: string = "";

    if(hours === -1) {
        return "0 : 00";
    }

    if(hours > 0) {
        hoursStr = `${hours} : `;
        if(minutes < 10) {
            minutesStr = `0${minutes}`
        }
    }

    if (seconds === 60) {
        secondsStr = "00";
        minutesStr = `${minutes + 1}`;
    }

    if(seconds < 10) {
        secondsStr =  `0${seconds}`;
    }

    if(minutes + 1 === 60 && seconds === 60) {
        hoursStr = `${hours + 1} : `;
        minutesStr = "00";
    }

    if(seconds < 20 && minutes === 0 && hours === 0) {
        return `${timeLeft.toFixed(1)}`;
    } 

    return `${hoursStr}${minutesStr} : ${secondsStr}`;
}