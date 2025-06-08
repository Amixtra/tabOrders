import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  CalculationOverlay,
  CalculationWrapper,
  CalculationBG,
  LeftBlock,
  RightBlock,
  RightBlockLines,
} from "../../Calculation/Calculation.style";
import CalculationClose from "../../Calculation/CalculationClose/CalculationClose";
import CalculationTitle from "./KKBTitle/KKBTitle";
import Button from "components/@share/Button/Button";
import axios from "axios";
import { LanguageCode } from "db/constants";

const icon_increase = "/assets/icon/icon_increase.png";
const icon_edit = "/assets/icon/icon_edit.png";

// Component Props
interface KKBProps {
  onClose: () => void;
  selectedLanguage: LanguageCode;
}

// New interface for user objects with a stable id
interface User {
  id: string;
  name: string;
}

interface OverrideMap {
  [key: string]: boolean;
}

const KKB: React.FC<KKBProps> = ({ onClose, selectedLanguage }) => {
  const [splitCount, setSplitCount] = useState(1);
  const [history, setHistory] = useState<any[]>([]);
  const [searchParams] = useSearchParams();

  const tableId = searchParams.get("tableId");
  const company = searchParams.get("company");

  // Compute a table-specific key (you can adjust this to include company if needed)
  const localStorageKey = `users_${tableId || "default"}`;

  // Use an array of objects for users
  const [users, setUsers] = useState<User[]>([{ id: "user1", name: "User 1" }]);

  const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);
  const [editingUserValue, setEditingUserValue] = useState<string>("");

  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState<OverrideMap>({});

  // Fetch order history from the server
  const fetchOrders = async () => {
    try {
      const userIdResponse = await axios.post("http://18.143.91.202:8080/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await axios.get("http://18.143.91.202:8080/api/orders", {
        params: { userID: userid },
      });
      const tableNumber = parseInt(tableId || "0", 10);
      const filteredHistory = response.data
        .filter((order: any) => order.tableNumber === tableNumber)
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      setHistory(filteredHistory);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tableId, company]);

  // Load users from localStorage when tableId changes
  useEffect(() => {
    const storedUsers = localStorage.getItem(localStorageKey);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers([{ id: "user1", name: "User 1" }]);
    }
  }, [localStorageKey]);

  // Persist users to localStorage whenever the list changes (or tableId changes)
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(users));
  }, [users, localStorageKey]);

  // Add a new user with a unique id
  const handleAddUser = () => {
    const newUserNumber = users.length + 1;
    const newUser: User = { id: `user${newUserNumber}`, name: `User ${newUserNumber}` };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleRemoveUser = () => {
    setUsers((prev) => (prev.length > 1 ? prev.slice(0, prev.length - 1) : prev));
  };

  // Save user renaming changes
  const handleSaveUser = (index: number) => {
    if (editingUserValue.trim() !== "") {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers[index] = { ...newUsers[index], name: editingUserValue };
        return newUsers;
      });
    }
    setEditingUserIndex(null);
  };

  // Toggle the override value for an order item
  const toggleSelectedItem = (key: string, defaultValue: boolean) => {
    setSelectedOrderItems((prev) => ({
      ...prev,
      [key]: prev.hasOwnProperty(key) ? !prev[key] : !defaultValue,
    }));
  };

  // Confirm assignment: iterate over orders and update assignments
  const handleConfirm = async () => {
    if (selectedUserIndex === null) return;
    const newAssignments: {
      orderId: string;
      itemIndex: number;
      assignedUser: string | null;
    }[] = [];

    history.forEach((order) => {
      order.items.forEach((item: any, idx: number) => {
        for (let i = 0; i < item.cartItemQuantity; i++) {
          const key = `${order._id}-${idx}-${i}`;
          const defaultValue = item.assignedUser ? true : false;
          const currentValue = selectedOrderItems.hasOwnProperty(key)
            ? selectedOrderItems[key]
            : defaultValue;
          if (currentValue !== defaultValue) {
            // Use the user's id instead of the name when assigning
            newAssignments.push({
              orderId: order._id,
              itemIndex: idx,
              assignedUser: currentValue ? users[selectedUserIndex].id : null,
            });
          }
        }
      });
    });

    try {
      await axios.patch("http://18.143.91.202:8080/api/orders/assign-items", {
        assignments: newAssignments,
      });
      await fetchOrders();
      setSelectedOrderItems({});
      setSelectedUserIndex(null);
    } catch (error) {
      console.error("Error assigning items:", error);
    }
  };

  const totalAll = history.reduce((sum, order) => sum + order.totalPrice, 0);
  const amountPerPerson = totalAll > 0 ? Math.floor(totalAll / splitCount) : 0;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amountPerPerson);

  // Define colors for user buttons and highlighting
  const userButtonColors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFFFCC", "#CCFFFF"];

  return (
    <CalculationOverlay>
      <CalculationWrapper>
        <TableIndicator selectedLanguage={selectedLanguage} />
        <CalculationTitle />
        <CalculationClose onClose={onClose} selectedLanguage={selectedLanguage} />

        <CalculationBG>
          {/* Left Block: Order List */}
          <LeftBlock>
            <div
              style={{
                width: "90%",
                height: "90%",
                overflowY: "auto",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {history.length > 0 ? (
                history.map((order) => (
                  <div
                    key={order._id}
                    style={{
                      marginBottom: "20px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Orders {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                    {order.items.map((item: any, idx: number) =>
                      Array.from({ length: item.cartItemQuantity }).map((_, i) => {
                        const key = `${order._id}-${idx}-${i}`;
                        const defaultValue = item.assignedUser ? true : false;
                        const isChecked = selectedOrderItems.hasOwnProperty(key)
                          ? selectedOrderItems[key]
                          : defaultValue;
                        const preAssigned = !!item.assignedUser;
                        const assignedUserId = preAssigned ? item.assignedUser : "";
                        const assignedUserIndex = preAssigned
                          ? users.findIndex((u) => u.id === assignedUserId)
                          : -1;
                        const borderStyle =
                          preAssigned && assignedUserIndex !== -1
                            ? {
                                border: `2px solid ${userButtonColors[assignedUserIndex]}`,
                                backgroundColor: `${userButtonColors[assignedUserIndex]}`,
                                borderRadius: "4px",
                                padding: "4px",
                              }
                            : {};
                        return (
                          <div
                            key={key}
                            style={{
                              marginTop: "10px",
                              fontSize: "20px",
                              display: "flex",
                              alignItems: "center",
                              ...borderStyle,
                            }}
                          >
                            {selectedUserIndex !== null && (
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelectedItem(key, defaultValue)}
                                style={{ marginRight: "10px" }}
                              />
                            )}
                            <span>{item.itemName}</span>
                          </div>
                        );
                      })
                    )}
                    <div style={{ color: "#666", fontSize: "15px", marginTop: "10px" }}>
                      Total{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "PHP",
                        minimumFractionDigits: 2,
                      }).format(order.totalPrice)}
                    </div>
                  </div>
                ))
              ) : (
                <div>No orders found</div>
              )}
            </div>
          </LeftBlock>

          {/* Right Block: User List and Controls */}
          <RightBlock style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              Users
            </h3>
            <div
              style={{
                borderBottom: "1px solid #ccc",
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
            {users.map((user, index) => (
              <div
                key={user.id}
                onClick={() => {
                  if (editingUserIndex !== index) {
                    setSelectedUserIndex(index === selectedUserIndex ? null : index);
                    setSelectedOrderItems({});
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px",
                  width: "50%",
                  height: "35px",
                  borderRadius: "10px",
                  backgroundColor: userButtonColors[index % userButtonColors.length],
                  padding: "0 10px",
                  cursor: "pointer",
                  border: selectedUserIndex === index ? "2px solid black" : "none",
                }}
              >
                {editingUserIndex === index ? (
                  <input
                    type="text"
                    value={editingUserValue}
                    onChange={(e) => setEditingUserValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveUser(index);
                    }}
                    onBlur={() => handleSaveUser(index)}
                    autoFocus
                    style={{
                      flex: 1,
                      border: "none",
                      borderRadius: "10px",
                      padding: "5px",
                    }}
                  />
                ) : (
                  <>
                    <span style={{ flex: 1, paddingLeft: '20px'}}>{user.name}</span>
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingUserIndex(index);
                        setEditingUserValue(user.name);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                    >
                      <img src={icon_edit} alt="Edit" style={{ width: "16px", height: "16px" }} />
                    </button> */}
                  </>
                )}
              </div>
            ))}
            <RightBlockLines>
              <Button KKBBtnUser onClick={handleRemoveUser} style={{ margin: "5px" }}>
                Remove User
              </Button>
              <Button KKBBtnUser onClick={handleAddUser} style={{ margin: "5px" }}>
                Add User
              </Button>
            </RightBlockLines>
            {selectedUserIndex !== null && Object.keys(selectedOrderItems).length > 0 && (
              <Button KKBBtnUser onClick={handleConfirm} style={{ marginTop: "20px" }}>
                Confirm Selection
              </Button>
            )}
            {!(selectedUserIndex !== null && Object.keys(selectedOrderItems).length > 0) && (
              <Button iconBtnKKB iconUrl={icon_increase} style={{ marginTop: "20px" }}>
                Confirm
              </Button>
            )}
          </RightBlock>
        </CalculationBG>
      </CalculationWrapper>
    </CalculationOverlay>
  );
};

export default KKB;
