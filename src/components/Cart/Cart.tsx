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
  LanguageCode,
} from "db/constants";
import {
  BackgroundOverlay,
  OrderPopupDiv,
  PopupButtons,
  PopupContent,
  TotalPrice,
} from "./CartPop.styles";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { customAlphabet } from "nanoid";

// Helper: Aggregates duplicates by itemName.
function aggregateCartItems(
  items: {
    itemName?: string;
    cartItemQuantity?: number;
    itemPrice?: number;
  }[]
) {
  const map: Record<
    string,
    { itemName: string; cartItemQuantity: number; itemPrice: number }
  > = {};

  for (const item of items) {
    const name = item.itemName || "No name";
    if (!map[name]) {
      map[name] = {
        itemName: name,
        itemPrice: item.itemPrice || 0,
        cartItemQuantity: item.cartItemQuantity || 0,
      };
    } else {
      map[name].cartItemQuantity += item.cartItemQuantity || 0;
    }
  }
  return Object.values(map);
}

// New Helper: Groups items by assignedUser and then aggregates by itemName.
function aggregateCartItemsByUser(
  items: {
    itemName?: string;
    cartItemQuantity?: number;
    itemPrice?: number;
    assignedUser?: string;
  }[]
) {
  // Group items by user (or "Unassigned" if no assignedUser)
  const breakdown: Record<
    string,
    Record<
      string,
      { itemName: string; cartItemQuantity: number; itemPrice: number }
    >
  > = {};

  items.forEach((item) => {
    const userKey = item.assignedUser || "Unassigned";
    if (!breakdown[userKey]) {
      breakdown[userKey] = {};
    }
    const name = item.itemName || "No name";
    if (!breakdown[userKey][name]) {
      breakdown[userKey][name] = {
        itemName: name,
        itemPrice: item.itemPrice || 0,
        cartItemQuantity: item.cartItemQuantity || 0,
      };
    } else {
      breakdown[userKey][name].cartItemQuantity += item.cartItemQuantity || 0;
    }
  });

  // Build the final result with an array of items and a total per user.
  const result: Record<string, { items: any[]; total: number }> = {};
  for (const user in breakdown) {
    const itemsArr = Object.values(breakdown[user]);
    const total = itemsArr.reduce(
      (sum, item) => sum + item.itemPrice * item.cartItemQuantity,
      0
    );
    result[user] = { items: itemsArr, total };
  }
  return result;
}

export const OrderPopup: React.FC<{
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];
  const aggregated = aggregateCartItems(cartItems);

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3 dangerouslySetInnerHTML={{ __html: cartOrderPopupLocale.title }} />
        {aggregated.map((item, idx) => (
          <p key={idx}>
            <span>{item.itemName}</span>
            <span>
              {item.cartItemQuantity}{" "}
              {item.cartItemQuantity === 1
                ? cartOrderPopupLocale.order
                : cartOrderPopupLocale.orders}
            </span>
            <span>₱{item.itemPrice}.00</span>
            <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
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
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
  orderNumber: string;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage, orderNumber }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];
  const aggregated = aggregateCartItems(cartItems);

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3
          dangerouslySetInnerHTML={{
            __html: `${cartOrderPopupLocale.admin} ${orderNumber}`,
          }}
        />
        {aggregated.map((item, idx) => (
          <p key={idx}>
            <span>{item.itemName}</span>
            <span>
              {item.cartItemQuantity}{" "}
              {item.cartItemQuantity === 1
                ? cartOrderPopupLocale.order
                : cartOrderPopupLocale.orders}
            </span>
            <span>₱{item.itemPrice}.00</span>
            <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
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

export const BillOutOrderPopup: React.FC<{
  cartItems: {
    itemName?: string;
    cartItemQuantity?: number;
    itemPrice?: number;
    assignedUser?: string;
  }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
  orderNumber: string;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage, orderNumber }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];
  // Check if any item has an assignedUser property.
  const hasUserAssignment = cartItems.some((item) => item.assignedUser);

  let content;
  if (hasUserAssignment) {
    // Group by assigned user if available.
    const breakdownByUser = aggregateCartItemsByUser(cartItems);
    content = (
      <>
        {Object.keys(breakdownByUser).map((user, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4
              style={{
                marginBottom: "10px",
                fontSize: "36px"
              }}
            >{user} - Orders</h4>
            {breakdownByUser[user].items.map((item, i) => (
              <p key={i}
                style={{
                  marginBottom: "30px",
                }}
              >
                <span>{item.itemName}</span>
                <span>
                  {item.cartItemQuantity}{" "}
                  {item.cartItemQuantity === 1
                    ? cartOrderPopupLocale.order
                    : cartOrderPopupLocale.orders}
                </span>
                <span>₱{item.itemPrice}.00</span>
                <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
              </p>
            ))}
            <strong
              style={{
                fontSize: "36px"
              }}
            >Total: ₱{breakdownByUser[user].total.toFixed(2)}</strong>
          </div>
        ))}
      </>
    );
  } else {
    // Fallback to simple aggregation.
    const aggregated = aggregateCartItems(cartItems);
    content = aggregated.map((item, idx) => (
      <p key={idx}>
        <span>{item.itemName}</span>
        <span>
          {item.cartItemQuantity}{" "}
          {item.cartItemQuantity === 1
            ? cartOrderPopupLocale.order
            : cartOrderPopupLocale.orders}
        </span>
        <span>₱{item.itemPrice}.00</span>
        <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
      </p>
    ));
  }

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3 dangerouslySetInnerHTML={{ __html: `${orderNumber}` }} />
        {content}
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
          Bill Out
        </Button>
      </PopupButtons>
    </OrderPopupDiv>
  );
};

export const BillOutCustomerPopup: React.FC<{
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
  orderNumber: string;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage, orderNumber }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];
  const aggregated = aggregateCartItems(cartItems);

  return (
    <BackgroundOverlay>
      <OrderPopupDiv>
        <PopupContent>
          <h3 dangerouslySetInnerHTML={{ __html: `${orderNumber}` }} />
          {aggregated.map((item, idx) => (
            <p key={idx}>
              <span>{item.itemName}</span>
              <span>
                {item.cartItemQuantity}{" "}
                {item.cartItemQuantity === 1
                  ? cartOrderPopupLocale.order
                  : cartOrderPopupLocale.orders}
              </span>
              <span>₱{item.itemPrice}.00</span>
              <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
            </p>
          ))}
        </PopupContent>
        <TotalPrice>
          <p>{cartOrderPopupLocale.total}:</p>
          <p>₱{totalPrice}</p>
        </TotalPrice>
        <PopupButtons>
          <Button color="WHITE" bgColor="GREY600" onClick={onCancel}>
            Close
          </Button>
          <Button color="WHITE" bgColor="MAIN" onClick={onConfirm}>
            Go to Bill Out Page
          </Button>
        </PopupButtons>
      </OrderPopupDiv>
    </BackgroundOverlay>
  );
};

interface WaiterCallPopupProps {
  isOpen: boolean;
  tableId: string;
  orders?: { name: string; quantity: number }[]; 
  onAcknowledge: () => void;
  onDismiss: () => void;
}

export const WaiterCallPopup: React.FC<WaiterCallPopupProps> = ({
  isOpen,
  tableId,
  orders,
  onAcknowledge,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <BackgroundOverlay>
      <OrderPopupDiv>
        <PopupContent>
          <h3>Table {tableId} has requested a waiter.</h3>
          {orders?.map((order, index) => (
            <p key={index}>
              <span>{order.name}</span>
              <span>
                {order.quantity}{" "}
                {order.quantity === 1
                  ? "Order"
                  : "Orders"}
              </span>
            </p>
          ))}
        </PopupContent>
        <PopupButtons>
          <Button color="WHITE" bgColor="GREY600" onClick={onDismiss}>
            Dismiss
          </Button>
          <Button color="WHITE" bgColor="MAIN" onClick={onAcknowledge}>
            Confirm
          </Button>
        </PopupButtons>
      </OrderPopupDiv>
    </BackgroundOverlay>
  );
};

export const BillOutPaidPopup: React.FC<{
  cartItems: { itemName?: string; cartItemQuantity?: number; itemPrice?: number }[];
  totalPrice: string;
  onConfirm: () => void;
  onCancel: () => void;
  selectedLanguage: LanguageCode;
  orderNumber: string;
}> = ({ cartItems, totalPrice, onConfirm, onCancel, selectedLanguage, orderNumber }) => {
  const cartOrderPopupLocale = CartOrderPopupLocales[selectedLanguage];
  const aggregated = aggregateCartItems(cartItems);

  return (
    <OrderPopupDiv>
      <PopupContent>
        <h3 dangerouslySetInnerHTML={{ __html: `${orderNumber}` }} />
        {aggregated.map((item, idx) => (
          <p key={idx}>
            <span>{item.itemName}</span>
            <span>
              {item.cartItemQuantity}{" "}
              {item.cartItemQuantity === 1
                ? cartOrderPopupLocale.order
                : cartOrderPopupLocale.orders}
            </span>
            <span>₱{item.itemPrice}.00</span>
            <span>₱{(item.itemPrice * item.cartItemQuantity).toFixed(2)}</span>
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
  const company = queryParams.get("company");
  const table = queryParams.get("tableId");
  const order = "Order";
  const unconfirmed = "Unconfirmed";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const [isActive, setIsActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOrderClick = () => {
    setIsPopupOpen(true);
  };

  const numericNanoid = customAlphabet("0123456789", 16);
  function generateNumericID() {
    return numericNanoid();
  }

  const handleConfirmOrder = async () => {
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });

      const userID = userIdResponse.data.userID;
      const items = cart.cartItems.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        cartItemQuantity: item.cartItemQuantity,
      }));

      await axios.post("https://tab-order-server.vercel.app/api/orders", {
        userID,
        items,
        totalPrice: cart.cartTotalAmount,
        tableNumber: table,
        orderNumber: generateNumericID(),
        orderType: order,
        confirmStatus: unconfirmed,
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
          cartItems={cart.cartItems.map((item) => ({
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
                key={cartItem.itemName}
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
