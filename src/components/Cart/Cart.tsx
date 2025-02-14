import { useEffect, useState } from "react";

import StyledCart from "./Cart.styles";
import CartListItem from "./CartListItem/CartListItem";
import Button from "components/@share/Button/Button";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import { clearCart, getTotal, toggleCartOpen } from "features/cart/cartReducer";
import Toast from "components/@share/Toast/Toast";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import { 
  CartOrderLocales, 
  CartOrderPopupLocales, 
  LanguageCode 
} from "db/constants";
import { 
  BackgroundOverlay, 
  OrderPopupDiv, 
  PopupButtons, 
  PopupContent, 
  TotalPrice 
} from "./CartPop.styles";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { customAlphabet } from 'nanoid';

export const OrderPopup: React.FC<{
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number; }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3
          dangerouslySetInnerHTML={{ __html: cartOrderPopupLocale.title }}
        />
        
        {cartItems.map((item, idx) => (
          <p key={idx}>
            <span>{item.itemName ?? "No name"}</span>
            <span>
              {item.cartItemQuantity ?? 0} {item.cartItemQuantity === 1 ? cartOrderPopupLocale.order : cartOrderPopupLocale.orders }
            </span>
            <span>₱{item.itemPrice ?? 1}.00</span>
            <span>
              ₱{
                (
                  (item.itemPrice ?? 0) *
                  (item.cartItemQuantity ?? 1)
                ).toFixed(2)
              }
            </span>
          </p>
        ))}
      </PopupContent>
      <TotalPrice>
        <p>{cartOrderPopupLocale.total}:</p>
        <p>₱{totalPrice}</p>
      </TotalPrice>
      <PopupButtons>
        <Button color="WHITE" bgColor="GREY600" onClick={onCancel}>
          {cartOrderPopupLocale.cancel}
        </Button>
        <Button color="WHITE" bgColor="MAIN" onClick={onConfirm}>
          {cartOrderPopupLocale.confirm}
        </Button>
      </PopupButtons>
    </OrderPopupDiv>
  );
};

export const AdminOrderPopup: React.FC<{
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number; }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
  orderNumber: string;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage, orderNumber }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3
          dangerouslySetInnerHTML={{ __html: `${cartOrderPopupLocale.admin} ${orderNumber}` }}
        />
        
        {cartItems.map((item, idx) => (
          <p key={idx}>
            <span>{item.itemName ?? "No name"}</span>
            <span>
              {item.cartItemQuantity ?? 0} {item.cartItemQuantity === 1 ? cartOrderPopupLocale.order : cartOrderPopupLocale.orders }
            </span>
            <span>₱{item.itemPrice ?? 1}.00</span>
            <span>
              ₱{
                (
                  (item.itemPrice ?? 0) *
                  (item.cartItemQuantity ?? 1)
                ).toFixed(2)
              }
            </span>
          </p>
        ))}
      </PopupContent>
      <TotalPrice>
        <p>{cartOrderPopupLocale.total}:</p>
        <p>₱{totalPrice}</p>
      </TotalPrice>
      <PopupButtons>
        <Button color="WHITE" bgColor="GREY600" onClick={onCancel}>
          {cartOrderPopupLocale.cancel}
        </Button>
        <Button color="WHITE" bgColor="MAIN" onClick={onConfirm}>
          {cartOrderPopupLocale.confirm}
        </Button>
      </PopupButtons>
    </OrderPopupDiv>
  );
};

interface CartProps {
  selectedLanguage: LanguageCode;
}

const Cart: React.FC<CartProps> = ({ selectedLanguage }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const cartOrderLocale = CartOrderLocales[selectedLanguage];
  const cart = useAppSelector((state) => state.cart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company")
  const table = queryParams.get("tableId")
  const order = "Order"
  const unconfirmed = "Unconfirmed"
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const [isActive, setIsActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOrderClick = () => {
    setIsPopupOpen(true);
  };

  const numericNanoid = customAlphabet('0123456789', 16);
  function generateNumericID() {
    return numericNanoid();
  }

  const handleConfirmOrder = async () => {
    try {
      const userIdResponse = await axios.post("http://43.200.251.48:8080/api/get-userID", {
        companyID: company,
      });

      const userID = userIdResponse.data.userID;
      const items = cart.cartItems.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        cartItemQuantity: item.cartItemQuantity,
      }));

      await axios.post("http://43.200.251.48:8080/api/orders", {
        userID,
        items,
        totalPrice: cart.cartTotalAmount,
        tableNumber: table,
        orderNumber: generateNumericID(),
        orderType: order,
        confirmStatus: unconfirmed
      });

      handleClearCart();
      setToastMessage(`${cartOrderLocale.toastOrderComplete}`);
      setIsActive(true);
      setIsPopupOpen(false);
      handleCartOpen();
    } catch (error) {
      console.error("Error saving order:", error);
      setToastMessage("Failed to save order!");
      setIsActive(true);
      setIsPopupOpen(false);
    }
  };

  const handleCancelPopup = () => {
    setIsPopupOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  const handleFreeServiceToast = () => {
    setToastMessage(`${cartOrderLocale.freeService}`);
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

      {isPopupOpen && <BackgroundOverlay />}

      {isPopupOpen && (
        <OrderPopup
          selectedLanguage={selectedLanguage}
          cartItems={cart.cartItems.map(item => ({
            itemName: item.itemName ?? "Untitled item",
            itemPrice: item.itemPrice ?? 0,
            cartItemQuantity: item.cartItemQuantity ?? 1,
          }))}
          totalPrice={
            cart.cartTotalAmount?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0.00"
          }
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelPopup}
        />
      )}

      <StyledCart className={cart.isCartOpen ? "" : "hide"}>
        <div className="cart-header">
          <TableIndicator selectedLanguage={selectedLanguage} />
          <h3 className="cart-title">{cartOrderLocale.title}</h3>
        </div>

        <div className="cart-body">
          {cart.cartItems.length === 0 ? (
            <p className="empty-sign">{cartOrderLocale.empty}</p>
          ) : (
            cart.cartItems.map((cartItem) => (
              <CartListItem
                selectedLanguage={selectedLanguage}
                cartItem={cartItem}
                handleFreeServiceToast={handleFreeServiceToast}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-item-info">
            <span className="cart-item-total-price">
              {cartOrderLocale.totalPrice}{" "}
              <span>{cart.cartTotalAmount?.toLocaleString()}</span>
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
              {cartOrderLocale.cancel}
            </Button>
            <Button
              color="WHITE"
              bgColor="MAIN"
              fontWeight="bold"
              onClick={handleOrderClick}
            >
              {cartOrderLocale.order}
            </Button>
          </div>
        </div>
      </StyledCart>
    </>
  );
};

export default Cart;
