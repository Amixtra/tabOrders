import React from "react";
import StyledCartListItem from "./CartListItem.style";
import Button from "components/@share/Button/Button";
import { CategoryItemProps } from "types";
import { useAppDispatch } from "features/store/rootReducer";
import {
  addToCart,
  decreaseCartItemQuantity,
  removeFromCart,
} from "features/cart/cartReducer";
import { CartOrderPopupLocales, LanguageCode } from "db/constants";

const icon_increase = "/assets/icon/icon_increase.png";
const icon_decrease = "/assets/icon/icon_decrease.png";

interface Props {
  cartItem: CategoryItemProps;
  handleFreeServiceToast: () => void;
  selectedLanguage: LanguageCode;
}

const CartListItem = ({ cartItem, handleFreeServiceToast, selectedLanguage }: Props) => {
  const dispatch = useAppDispatch();
  const totalPrice = cartItem.itemPrice! * cartItem.cartItemQuantity!;
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];

  const handleRemoveFromCart = (cartItem: CategoryItemProps) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCartItemQuantity = (cartItem: CategoryItemProps) => {
    dispatch(decreaseCartItemQuantity(cartItem));
  };

  const handleIncreaseCartItemQuantity = (cartItem: CategoryItemProps) => {
    if (totalPrice === 0) {
      handleFreeServiceToast();
      return;
    }
    dispatch(addToCart(cartItem));
  };

  return (
    <StyledCartListItem>
      <div className="cart-item-header">
        <h4 className="product-name">{cartItem.itemName}</h4>
        <Button
          color="MAIN"
          outlined
          rounded
          onClick={() => handleRemoveFromCart(cartItem)}
        >
          Remove
        </Button>
      </div>
      <div className="cart-item-price-total">
        ₱ {totalPrice.toLocaleString()}
      </div>
      <div className="cart-item-body">
        <div className="cart-item-counter">
          <Button
            iconBtnCart
            iconUrl={icon_decrease}
            onClick={() => handleDecreaseCartItemQuantity(cartItem)}
          />
          <span className="cart-order-number">
            {cartItem.cartItemQuantity} {cartItem.cartItemQuantity === 1 ? cartOrderPopupLocale.order : cartOrderPopupLocale.orders}
          </span>
          <Button
            iconBtnCart
            iconUrl={icon_increase}
            onClick={() => handleIncreaseCartItemQuantity(cartItem)}
          />
        </div>
      </div>
    </StyledCartListItem>
  );
};

export default CartListItem;