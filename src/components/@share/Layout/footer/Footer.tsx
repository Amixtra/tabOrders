import React from "react";
import StyledFooter from "./Footer.style";
import Button from "components/@share/Button/Button";
import { useAppDispatch } from "features/store/rootReducer";
import { toggleCartOpen } from "features/cart/cartReducer";

const icon_cart = "assets/icon/icon_cart.png";

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
        onClick={() => handleCartOpen()}
      >
        Cart
      </Button>
    </StyledFooter>
  );
};

export default Footer;
