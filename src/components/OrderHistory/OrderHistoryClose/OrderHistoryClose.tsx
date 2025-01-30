import {
  StyledCloseIcon,
  OrderHistoryCloseOverlay,
  OrderHistoryCloseWord,
} from "./OrderHistoryClose.style";
import { LanguageCode, OrderHistoryLocales } from "db/constants";

interface OrderHistoryCloseProps {
  onClose: () => void;
  selectedLanguage: LanguageCode;
}

const OrderHistoryClose: React.FC<OrderHistoryCloseProps> = ({ onClose, selectedLanguage }) => {
  const orderHistoryLocale = OrderHistoryLocales[selectedLanguage];
  return (
    <OrderHistoryCloseOverlay onClick={onClose}>
      <StyledCloseIcon />
      <OrderHistoryCloseWord>{orderHistoryLocale.close}</OrderHistoryCloseWord>
    </OrderHistoryCloseOverlay>
  );
};

export default OrderHistoryClose;
