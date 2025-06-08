// WaiterPage.tsx (React)
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
} from "components/OrderHistory/OrderHistory.style";

import OrderHistoryClose from "components/OrderHistory/OrderHistoryClose/OrderHistoryClose";
import OrderHistoryCounter from "components/OrderHistory/OrderHistoryCounter/OrderHistoryCounter";

import { LanguageCode } from "db/constants";

interface HistoryItem {
  _id: string;
  userID: string;
  lastOrderedAt: string;
  totalPrice: number;
  items: {
    itemName: string;
    itemPrice: number;
    cartItemQuantity: number;
    confirmation?: boolean;
    menuStatus?: string;
    _id?: string;
  }[];
}

interface OrderHistoryProps {
  setShowOrderHistory: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

interface OrderItemRowProps {
  item: HistoryItem["items"][number];
  onCheckboxChange: (checked: boolean) => void;
}

const OrderItemRow: React.FC<OrderItemRowProps> = ({ item, onCheckboxChange }) => {
  const [checked, setChecked] = useState<boolean>(item.confirmation ?? false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onCheckboxChange(e.target.checked);
  };

  return (
    <OrderItem
      style={{
        color: checked ? "green" : "red",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={{ marginRight: "8px" }}
      />
      <span className="item-name">{item.itemName}</span>
      <span className="item-qty" style={{ marginLeft: "auto" }}>
        x {item.cartItemQuantity}
      </span>
    </OrderItem>
  );
};

const WaiterPage: React.FC<OrderHistoryProps> = ({
  setShowOrderHistory,
  selectedLanguage,
}) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");
  const company = searchParams.get("company");

  const [localOrderData, setLocalOrderData] = useState<HistoryItem[]>([]);
  const [resetTimer, setResetTimer] = useState(false);

  const fetchHistory = async () => {
    try {
      const userIdResponse = await axios.post(
        "http://18.143.91.202:8080/api/get-userID",
        { companyID: company }
      );
      const userid = userIdResponse.data.userID;

      const response = await axios.get("http://18.143.91.202:8080/api/order-history", {
        params: { userID: userid, tableNumber: id },
      });

      // Merge duplicates
      const mergedDocs = response.data.map((doc: HistoryItem) => {
        const mergedItems = doc.items.reduce((acc: HistoryItem["items"], item) => {
          const currentItem = {
            ...item,
            confirmation: item.confirmation ?? false,
            menuStatus: item.menuStatus ?? "onProgress",
          };
          const found = acc.find((i) => i.itemName === currentItem.itemName);
          if (found) {
            found.cartItemQuantity += currentItem.cartItemQuantity;
          } else {
            acc.push(currentItem);
          }
          return acc;
        }, [] as HistoryItem["items"]);

        return {
          ...doc,
          items: mergedItems,
        };
      });

      setLocalOrderData(mergedDocs);
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

  const handleConfirm = async (docId: string, items: HistoryItem["items"]) => {
    console.log("Confirm docId:", docId);
    console.log("Items sent:", JSON.stringify(items, null, 2));
    try {
      await axios.patch(
        `http://18.143.91.202:8080/api/order-history/${docId}/confirm`,
        { items }
      );
      fetchHistory();
    } catch (error) {
      console.error("Error confirming items:", error);
    }
  };

  const handleCancel = async (docId: string, items: HistoryItem["items"]) => {
    console.log("Cancel docId:", docId);
    console.log("Items sent:", JSON.stringify(items, null, 2));
    try {
      await axios.patch(
        `http://18.143.91.202:8080/api/order-history/${docId}/cancel`,
        { items }
      );
      fetchHistory();
    } catch (error) {
      console.error("Error canceling items:", error);
    }
  };

  const onItemCheckboxChange = (
    docIndex: number,
    itemIndex: number,
    checked: boolean
  ) => {
    const newData = [...localOrderData];

    const docToUpdate = { ...newData[docIndex] };
    const updatedItems = [...docToUpdate.items];

    updatedItems[itemIndex].confirmation = checked;
    updatedItems[itemIndex].menuStatus = checked ? "served" : "onProgress";

    docToUpdate.items = updatedItems;
    newData[docIndex] = docToUpdate;

    setLocalOrderData(newData);
  };

  return (
    <OrderHistoryOverlay>
      {localOrderData.map((doc, docIndex) => (
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

          <OrderHistoryContainer>
            <OrderList>
              {doc.items.map((item, itemIndex) => (
                <OrderItemRow
                  key={`${doc._id}-${item.itemName}-${itemIndex}`}
                  item={item}
                  onCheckboxChange={(checked) =>
                    onItemCheckboxChange(docIndex, itemIndex, checked)
                  }
                />
              ))}
            </OrderList>

            <OrderSummary>
              <OrderSummaryRow>
                <span className="label">Total Amount</span>
                <span className="value">₱ {doc.totalPrice}</span>
              </OrderSummaryRow>
            </OrderSummary>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "16px" }}>
              <button onClick={() => handleConfirm(doc._id, doc.items)}>
                Confirm
              </button>
              <button onClick={() => handleCancel(doc._id, doc.items)}>
                Cancel
              </button>
            </div>
          </OrderHistoryContainer>
        </OrderHistoryWrapper>
      ))}
    </OrderHistoryOverlay>
  );
};

export default WaiterPage;
