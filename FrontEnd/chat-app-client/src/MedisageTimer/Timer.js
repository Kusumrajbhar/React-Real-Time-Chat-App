import React, { useState, useEffect, useRef } from "react";

function Timer({ time, direction, callback }) {
  let startTime;
  if (direction === "clock") {
    startTime = 0;
  } else if (direction === "anticlock") {
    startTime = time;
  }
  const [second, setSecond] = useState(startTime);
  const [isRunning, setIsrunning] = useState();

  let interval = useRef();
  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        if (direction === "clock") {
          setSecond((pre) => pre + 1);
        } else if (direction === "anticlock") {
          setSecond((pre) => pre - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval.current);
  }, [isRunning]);

  const startTimerHandler = () => {
    setIsrunning(true);
  };

  const format = (timeProp) => {
    if (direction === "clock") {
      if (time !== timeProp) {
        return timeProp;
      } else {
        clearInterval(interval.current);
        callback(time);
      }
    } else if (direction === "anticlock") {
      if (timeProp !== 0) {
        console.log("interval", interval);
        return timeProp;
      } else {
        clearInterval(interval.current);
        callback(time);
      }
    }
  };

  return (
    <>
      <div>Timer: {format(second)}</div>
      <button onClick={startTimerHandler}>Start</button>
    </>
  );
}

export default Timer;
