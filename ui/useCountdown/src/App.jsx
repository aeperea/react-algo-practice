import {useState, useCallback, useEffect} from "react";

function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}) {
  const [count, setCount] = useState(countStart);
  const [active, setActive] = useState(false);

  const start = useCallback(() => setActive(true));
  const stop = useCallback(() => setActive(false));
  const reset = useCallback(() => {
    setActive(false);
    setCount(countStart);
  }, [countStart]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = setInterval(() => {
      if (count === countStop) return stop();

      if (isIncrement) {
        setCount((prev) => prev + 1);
      } else {
        setCount((prev) => prev - 1);
      }
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [countStop, intervalMs, isIncrement, active]);

  return {
    count,
    start,
    stop,
    reset,
  };
}

export default function App() {
  const { count, start, stop, reset } = useCountdown({ countStart: 10 });

  return (
    <div>
      <p>Countdown: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
