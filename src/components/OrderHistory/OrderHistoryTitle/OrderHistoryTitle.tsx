import { LanguageCode, OrderHistoryLocales } from "db/constants";
import {
  OrderHistoryTitleOverlay,
  OrderHistoryTitleWord,
} from "./OrderHistoryTitle.style";

interface OrderHistoryTitleProps {
  selectedLanguage: LanguageCode;
}

const OrderHistoryTitle: React.FC<OrderHistoryTitleProps> = ({ selectedLanguage }) => {
  const orderHistoryLocale = OrderHistoryLocales[selectedLanguage];
  return (
    <OrderHistoryTitleOverlay>
      <OrderHistoryTitleWord>{orderHistoryLocale.title}</OrderHistoryTitleWord>
    </OrderHistoryTitleOverlay>
  );
};

export default OrderHistoryTitle;
