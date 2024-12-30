import React, { useEffect, useState } from "react";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  OrderHistoryOverlay,
  OrderHistoryWrapper,
  OrderHistoryBG,
} from "./OrderHistory.style";
import OrderHistoryClose from "./OrderHistoryClose/OrderHistoryClose";
import OrderHistoryCounter from "./OrderHistoryCounter/OrderHistoryCounter";
import OrderHistoryTitle from "./OrderHistoryTitle/OrderHistoryTitle";

interface OrderHistoryProps {
  setShowOrderHistory: (value: boolean) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ setShowOrderHistory }) => {
  const [resetTimer, setResetTimer] = useState(false);

  const handleClose = () => {
    setShowOrderHistory(false);
  };

  const handleUserActivity = () => {
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  return (
    <OrderHistoryOverlay>
      <OrderHistoryWrapper>
        <TableIndicator />
        <OrderHistoryTitle />
        <OrderHistoryCounter onExpire={handleClose} resetTimer={resetTimer} />
        <OrderHistoryClose onClose={handleClose} />
        <OrderHistoryBG />
      </OrderHistoryWrapper>
    </OrderHistoryOverlay>
  );
};

export default OrderHistory;
