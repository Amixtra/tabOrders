import { useState } from "react";
import StyledFooter from "./Footer.style";
import Button from "components/@share/Button/Button";
import { useAppDispatch } from "features/store/rootReducer";
import { toggleCartOpen } from "features/cart/cartReducer";
import OrderHistory from "components/OrderHistory/OrderHistory";
import Calculation from "components/Calculation/Calculation";

const icon_cart = "/assets/icon/icon_cart.png";
const icon_order_history = "/assets/icon/icon_receipt.png";
const icon_calculator = "/assets/icon/icon_calculator.png";

interface FooterProps {
  setIsOverlayActive: (value: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ setIsOverlayActive }) => {
  const dispatch = useAppDispatch();
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);


  const handleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  const handleOrderHistoryOpen = () => {
    setShowOrderHistory(true);
    setIsOverlayActive(true);
  };

  const handleCalculationOpen = () => {
    setShowCalculation(true);
    setIsOverlayActive(true);
  };

  const handleOverlayClose = () => {
    setShowOrderHistory(false);
    setShowCalculation(false);
    setIsOverlayActive(false);
  };

  return (
    <>
      <StyledFooter>
        <Button color="WHITE" withIcon iconUrl={icon_cart} onClick={handleCartOpen}>
          Cart
        </Button>
        <Button color="WHITE" withIcon iconUrl={icon_calculator} onClick={handleCalculationOpen}>
          Calculate
        </Button>
        <Button color="WHITE" withIcon iconUrl={icon_order_history} onClick={handleOrderHistoryOpen}>
          Order History
        </Button>
      </StyledFooter>

      {showOrderHistory && <OrderHistory setShowOrderHistory={handleOverlayClose} />}
      {showCalculation && <Calculation setShowCalculation={handleOverlayClose} />}
    </>
  );
};

export default Footer;
