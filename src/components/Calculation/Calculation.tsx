import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  CalculationOverlay,
  CalculationWrapper,
  CalculationBG,
  LeftBlock,
  RightBlock,
  RightBlockLine,
} from "./Calculation.style";
import CalculationClose from "./CalculationClose/CalculationClose";
import CalculationTitle from "./CalculationTitle/CalculationTitle";
import Button from "components/@share/Button/Button";
import { CalculationLocales, LanguageCode } from "db/constants";
import axios from "axios";
import KKB from "./KKB/KKB";

const icon_increase = "/assets/icon/icon_increase.png";
const icon_decrease = "/assets/icon/icon_decrease.png";
const icon_decrease_light = "/assets/icon/icon_decrease_light.png";

interface HistoryItem {
  _id: string;
  userID: string;
  createdAt: string;
  totalPrice: number;
  items: {
    itemName: string;
    itemPrice: number;
    cartItemQuantity: number;
  }[];
}

interface CalculationProps {
  setShowCalculation: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const Calculation: React.FC<CalculationProps> = ({ setShowCalculation, selectedLanguage }) => {
  const [splitCount, setSplitCount] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showKKB, setShowKKB] = useState(false);
  const calculationLocale = CalculationLocales[selectedLanguage];
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");
  const company = searchParams.get("company");

  const handleClose = () => {
    setShowCalculation(false);
  };

  const handleIncrease = () => {
    setSplitCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (splitCount > 1) setSplitCount((prev) => prev - 1);
  };

  const fetchHistory = async () => {
    try {
      const userIdResponse = await axios.post("https://tab-order-server.vercel.app/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await axios.get("https://tab-order-server.vercel.app/api/orders", {
        params: { userID: userid },
      });
      const tableNumber = parseInt(id || "0", 10);
      // Filter and sort orders so that the latest comes first
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
    fetchHistory();
  }, []);

  const totalAll = history.reduce((sum, order) => sum + order.totalPrice, 0);

  const amountPerPerson = totalAll > 0 ? Math.floor(totalAll / splitCount) : 0;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amountPerPerson);

  const handleKKBClick = () => {
    setShowKKB(true);
  };

  const handleCloseOverlay = () => {
    setShowKKB(false);
  };

  return (
    <CalculationOverlay>
      <CalculationWrapper>
        <TableIndicator selectedLanguage={selectedLanguage} />
        <CalculationTitle selectedLanguage={selectedLanguage} />
        <CalculationClose onClose={handleClose} selectedLanguage={selectedLanguage} />
        <CalculationBG>
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
                    <div style={{ margin: "4px 0", fontSize: "16px" }}>
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} style={{ marginTop: "5px" }}>
                          {item.itemName} (x{item.cartItemQuantity})
                        </div>
                      ))}
                    </div>
                    <div style={{ color: "#666", fontSize: "15px", marginTop: "5px" }}>
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
          <RightBlock>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {calculationLocale.splitPay}
            </h3>
            <RightBlockLine>
              <div className="split-pay-body">
                <div className="split-pay-counter">
                  <Button
                    iconBtnCalculation
                    iconUrl={splitCount === 1 ? icon_decrease_light : icon_decrease}
                    onClick={handleDecrease}
                  />
                  <span className="split-pay-number">{splitCount}</span>
                  <Button iconBtnCalculation iconUrl={icon_increase} onClick={handleIncrease} />
                </div>
              </div>
            </RightBlockLine>
            <p
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "gray",
              }}
            >
              {splitCount === 1 ? calculationLocale.payAlone : calculationLocale.perPerson}
            </p>
            <p
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "35px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {formattedAmount}
            </p>
            <Button iconBtnKKB iconUrl={icon_increase} onClick={handleKKBClick}>
              KKB
            </Button>
          </RightBlock>
        </CalculationBG>
      </CalculationWrapper>
      {showKKB && (
        <KKB
          onClose={handleCloseOverlay}
          selectedLanguage={selectedLanguage}
        />
      )}
    </CalculationOverlay>
  );
};

export default Calculation;
