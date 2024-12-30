import React, { useEffect, useState } from "react";
import {
  OrderHistoryCounterOverlay,
  OrderHistoryCounterWord,
} from "./OrderHistoryCounter.style";

interface OrderHistoryCounterProps {
  onExpire: () => void;
  resetTimer: boolean;
}

const OrderHistoryCounter: React.FC<OrderHistoryCounterProps> = ({ onExpire, resetTimer }) => {
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
    <OrderHistoryCounterOverlay>
      <OrderHistoryCounterWord>Auto closing in {count}...</OrderHistoryCounterWord>
    </OrderHistoryCounterOverlay>
  );
};

export default OrderHistoryCounter;
