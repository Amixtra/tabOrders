import { useEffect, useState } from "react";
import {
  WaiterCounterOverlay,
  WaiterCounterWord,
} from "./WaiterCounter.style";

interface WaiterCounterProps {
  onExpire: () => void;
  resetTimer: boolean;
}

const WaiterCounter: React.FC<WaiterCounterProps> = ({ onExpire, resetTimer }) => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (resetTimer) {
      setCount(10);
    }
  }, [resetTimer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <WaiterCounterOverlay>
      <WaiterCounterWord>Auto closing in {count}...</WaiterCounterWord>
    </WaiterCounterOverlay>
  );
};

export default WaiterCounter;
