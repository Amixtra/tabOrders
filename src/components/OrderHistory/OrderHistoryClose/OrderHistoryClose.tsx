import React from "react";
import {
  StyledCloseIcon,
  OrderHistoryCloseOverlay,
  OrderHistoryCloseWord,
} from "./OrderHistoryClose.style";

interface OrderHistoryCloseProps {
  onClose: () => void;
}

const OrderHistoryClose: React.FC<OrderHistoryCloseProps> = ({ onClose }) => {
  return (
    <OrderHistoryCloseOverlay onClick={onClose}>
      <StyledCloseIcon />
      <OrderHistoryCloseWord>Close</OrderHistoryCloseWord>
    </OrderHistoryCloseOverlay>
  );
};

export default OrderHistoryClose;
