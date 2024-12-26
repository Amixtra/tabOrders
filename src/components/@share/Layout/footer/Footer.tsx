import StyledFooter from "./Footer.style";
import Button from "components/@share/Button/Button";
import { useAppDispatch } from "features/store/rootReducer";
import { toggleCartOpen } from "features/cart/cartReducer";

const icon_cart = "/assets/icon/icon_cart.png";
const icon_order_history = "/assets/icon/icon_receipt.png"

const Footer = () => {
  const dispatch = useAppDispatch();

  const handleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  return (
    <StyledFooter>
      <Button
        color="WHITE"
        withIcon
        iconUrl={icon_cart}
        onClick={handleCartOpen}
      >
        Cart
      </Button>
      <Button
        color="WHITE"
        withIcon
        iconUrl={icon_order_history}
        // onClick= //needs to be add
      >
        Order History
      </Button>
    </StyledFooter>
  );
};

export default Footer;