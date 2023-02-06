import { useEffect, useState } from "react";

function Timer({ setStop, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) {
      setStop(true);
    }
    const timerId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
}

export default Timer;
