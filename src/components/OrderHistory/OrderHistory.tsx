import React, { useEffect, useState } from "react";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  OrderHistoryOverlay,
  OrderHistoryWrapper,
  OrderHistoryBG,
  MiddleBlock,
} from "./OrderHistory.style";
import OrderHistoryClose from "./OrderHistoryClose/OrderHistoryClose";
import OrderHistoryCounter from "./OrderHistoryCounter/OrderHistoryCounter";
import OrderHistoryTitle from "./OrderHistoryTitle/OrderHistoryTitle";
import { LanguageCode } from "db/constants";

interface OrderHistoryProps {
  setShowOrderHistory: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ setShowOrderHistory, selectedLanguage }) => {
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
        <OrderHistoryTitle selectedLanguage={selectedLanguage} />
        <TableIndicator selectedLanguage={selectedLanguage} />
        <OrderHistoryCounter onExpire={handleClose} resetTimer={resetTimer} selectedLanguage={selectedLanguage} />
        <OrderHistoryClose onClose={handleClose} selectedLanguage={selectedLanguage} />
        <OrderHistoryBG>
          <MiddleBlock />
        </OrderHistoryBG>
      </OrderHistoryWrapper>
    </OrderHistoryOverlay>
  );
};

export default OrderHistory;
