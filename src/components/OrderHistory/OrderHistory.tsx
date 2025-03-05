import { useEffect, useState } from "react";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  OrderHistoryOverlay,
  OrderHistoryWrapper,
  OrderHistoryContainer,
  OrderList,
  OrderItem,
  OrderTitleBar,
  OrderSummary,
  OrderSummaryRow,
} from "./OrderHistory.style";
import OrderHistoryClose from "./OrderHistoryClose/OrderHistoryClose";
import OrderHistoryCounter from "./OrderHistoryCounter/OrderHistoryCounter";
import { LanguageCode } from "db/constants";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

interface HistoryItem {
  _id: string;
  userID: string;
  lastOrderedAt: string;
  totalPrice: number;
  items: {
    itemName: string;
    itemPrice: number;
    cartItemQuantity: number;
  }[];
}

interface OrderHistoryProps {
  setShowOrderHistory: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  setShowOrderHistory,
  selectedLanguage,
}) => {
  const [resetTimer, setResetTimer] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");
  const company = searchParams.get("company");

  const fetchHistory = async () => {
    try {
      const userIdResponse = await axios.post("http://43.200.251.48:8080/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;

      const response = await axios.get("http://43.200.251.48:8080/api/order-history", {
        params: { userID: userid, tableNumber: id },
      });
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
      {history.map((doc) => {
        const groupedItems = doc.items.reduce((acc, item) => {
          const found = acc.find((i) => i.itemName === item.itemName);
          if (found) {
            found.cartItemQuantity += item.cartItemQuantity;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, [] as HistoryItem["items"]);

        return (
          <OrderHistoryWrapper key={doc._id}>
            <OrderTitleBar>
              <div className="title-left">
                <span className="order-label">Last Ordered</span>
                <span className="order-time">
                  {new Date(doc.lastOrderedAt).toLocaleString("en-PH", {
                    timeZone: "Asia/Manila",
                  })}
                </span>
              </div>
              <div className="title-right">
                <TableIndicator selectedLanguage={selectedLanguage} />
                <OrderHistoryClose onClose={handleClose} selectedLanguage={selectedLanguage} />
              </div>
            </OrderTitleBar>

            <OrderHistoryCounter
              onExpire={handleClose}
              resetTimer={resetTimer}
              selectedLanguage={selectedLanguage}
            />

            <OrderHistoryContainer>
              <OrderList>
                {groupedItems.map((item, idx) => (
                  <OrderItem key={idx}>
                    <span className="item-name">{item.itemName}</span>
                    <span className="item-qty">x {item.cartItemQuantity}</span>
                  </OrderItem>
                ))}
              </OrderList>
              <OrderSummary>
                <OrderSummaryRow>
                  <span className="label">Total Amount</span>
                  <span className="value">₱ {doc.totalPrice}</span>
                </OrderSummaryRow>
              </OrderSummary>
            </OrderHistoryContainer>
          </OrderHistoryWrapper>
        );
      })}
    </OrderHistoryOverlay>
  );
};

export default OrderHistory;
