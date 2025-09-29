import { useCallback, type Dispatch, type SetStateAction } from "react";

import { useBoolean, useCounter, useInterval } from "usehooks-ts";
type CountdownOptions = {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
};

type CountdownControllers = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
  setCounter: Dispatch<SetStateAction<number>>;
};

export function useCountdown({
  countStart = 240,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: CountdownOptions): [number, CountdownControllers] {
  const {
    count: counter,
    increment,
    decrement,
    reset: resetCounter,
    setCount: setCounter,
  } = useCounter(countStart);

  /*
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval.
   */
  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  // Will set running false and reset the seconds to initial value.
  const resetCountdown = useCallback(() => {
    stopCountdown();
    resetCounter();
  }, [stopCountdown, resetCounter]);

  const countdownCallback = useCallback(() => {
    if (counter === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [counter, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [
    counter,
    { startCountdown, stopCountdown, resetCountdown, setCounter },
  ];
}
