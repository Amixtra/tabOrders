// Cart.tsx
import React, { useEffect, useState } from "react";

import StyledCart from "./Cart.styles";
import CartListItem from "./CartListItem/CartListItem";
import Button from "components/@share/Button/Button";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import { clearCart, getTotal, toggleCartOpen } from "features/cart/cartReducer";
import Toast from "components/@share/Toast/Toast";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import { useSearchParams } from "react-router-dom";

const Cart = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");

  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const [isActive, setIsActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  const handleFreeServiceToast = () => {
    setToastMessage("Free service can only be ordered 1 at a time.");
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 1500);
  };

  return (
    <>
      <Toast
        message={toastMessage || "Order Complete. Please Wait for a while.."}
        isActive={isActive}
        setIsActive={setIsActive}
      />

      <StyledCart className={cart.isCartOpen ? "" : "hide"}>
        <div className="cart-header">
          <TableIndicator />
          <h3 className="cart-title">Cart</h3>
        </div>

        <div className="cart-body">
          {cart.cartItems.length === 0 ? (
            <p className="empty-sign">Cart is Empty.</p>
          ) : (
            cart.cartItems.map((cartItem) => (
              <CartListItem
                cartItem={cartItem}
                handleFreeServiceToast={handleFreeServiceToast}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-item-info">
            <span>Total {cart.cartItems.length} orders</span>
            <span className="cart-item-total-price">
              Total Price ₱ <span>{cart.cartTotalAmount?.toLocaleString()}</span>
            </span>
          </div>
          <div className="cart-controller">
            <Button
              color="WHITE"
              bgColor="GREY600"
              fontWeight="bold"
              onClick={() => {
                handleCartOpen();
                handleClearCart();
              }}
            >
              Cancel
            </Button>
            <Button
              color="WHITE"
              bgColor="MAIN"
              fontWeight="bold"
              onClick={() => {
                const ordersString = cart.cartItems
                .map((item) => `${item.itemName} (Quantity: ${item.cartItemQuantity})`)
                .join(", ");
                
                const totalQuantity = cart.cartItems.reduce(
                  (sum, item) => sum + (item.cartItemQuantity ?? 0),
                  0
                );

                const totalPriceString = cart.cartTotalAmount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });

                console.log(
                  `Order Details:\n"Time Ordered": ${new Date().toLocaleString()},\n"Table": ${id},\n"Orders": [${ordersString}],\n"Total Quantity": ${totalQuantity},\n"Total Price": ₱${totalPriceString}`
                );

                handleClearCart();
                handleCartOpen();
                setToastMessage("Order Complete. Please Wait for a while..");
                setIsActive(true);
              }}
            >
              Order
            </Button>
          </div>
        </div>
      </StyledCart>
    </>
  );
};

export default Cart;
