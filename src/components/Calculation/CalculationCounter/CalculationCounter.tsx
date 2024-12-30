import React, { useEffect, useState } from "react";
import {
  CalculationCounterOverlay,
  CalculationCounterWord,
} from "./CalculationCounter.style";

interface CalculationCounterProps {
  onExpire: () => void;
  resetTimer: boolean;
}

const CalculationCounter: React.FC<CalculationCounterProps> = ({ onExpire, resetTimer }) => {
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
    <CalculationCounterOverlay>
      <CalculationCounterWord>Auto closing in {count}...</CalculationCounterWord>
    </CalculationCounterOverlay>
  );
};

export default CalculationCounter;
