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

const icon_increase = "/assets/icon/icon_increase.png";
const icon_decrease = "/assets/icon/icon_decrease.png";

interface Props {
  cartItem: CategoryItemProps;
  handleFreeServiceToast: () => void;
}

const CartListItem = ({ cartItem, handleFreeServiceToast }: Props) => {
  const dispatch = useAppDispatch();
  const totalPrice = cartItem.itemPrice! * cartItem.cartItemQuantity!;

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
      <div className="cart-item-body">
        <div className="cart-item-counter">
          <Button
            iconBtn
            iconUrl={icon_increase}
            onClick={() => handleIncreaseCartItemQuantity(cartItem)}
          />
          <span>{cartItem.cartItemQuantity} Order</span>
          <Button
            iconBtn
            iconUrl={icon_decrease}
            onClick={() => handleDecreaseCartItemQuantity(cartItem)}
          />
        </div>
        <div className="cart-item-price-total">
          ₱ {totalPrice.toLocaleString()}
        </div>
      </div>
    </StyledCartListItem>
  );
};

export default CartListItem;