// OrderHistory.tsx
import { useEffect, useState } from "react";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  OrderHistoryOverlay,
  OrderHistoryWrapper,
  OrderHistoryBG,
  MiddleBlock,
} from "./OrderHistory.style";
import OrderHistoryClose from "./OrderHistoryClose/OrderHistoryClose";
import OrderHistoryCounter from "./OrderHistoryCounter/OrderHistoryCounter";
import OrderHistoryTitle from "./OrderHistoryTitle/OrderHistoryTitle";
import { LanguageCode } from "db/constants";

interface OrderHistoryProps {
  setShowOrderHistory: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  setShowOrderHistory,
  selectedLanguage,
}) => {
  const [resetTimer, setResetTimer] = useState(false);
  const orders = [
    {
      itemName: "Carbonara Pasta",
      itemPrice: 300,
      cartItemQuantity: 1,
    },
    {
      itemName: "Tomato Pasta",
      itemPrice: 300,
      cartItemQuantity: 1,
    },
  ];
  
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.itemPrice * (item.cartItemQuantity || 1),
    0
  );

  const handleClose = () => {
    setShowOrderHistory(false);
  };

  const handleUserActivity = () => {
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  return (
    <OrderHistoryOverlay>
      <OrderHistoryWrapper>
        <OrderHistoryTitle selectedLanguage={selectedLanguage} />
        <TableIndicator selectedLanguage={selectedLanguage} />
        <OrderHistoryCounter
          onExpire={handleClose}
          resetTimer={resetTimer}
          selectedLanguage={selectedLanguage}
        />
        <OrderHistoryClose onClose={handleClose} selectedLanguage={selectedLanguage} />

        <OrderHistoryBG>
          <MiddleBlock>
            <div style={{ padding: "1rem" }}>
              {orders.map((item, idx) => {
                const qty = item.cartItemQuantity || 1;
                const lineTotal = item.itemPrice * qty;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #ccc",
                      padding: "0.5rem 0",
                    }}
                  >
                    <span>{item.itemName}</span>
                    <span>{qty} Order</span>
                    <span>₱{item.itemPrice.toFixed(2)}</span>
                    <span>₱{lineTotal.toFixed(2)}</span>
                  </div>
                );
              })}

              {/* 4) Show total price at bottom */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Total Price:
                </span>
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  ₱{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </MiddleBlock>
        </OrderHistoryBG>
      </OrderHistoryWrapper>
    </OrderHistoryOverlay>
  );
};

export default OrderHistory;