import { useState } from "react";
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

const icon_increase = "/assets/icon/icon_increase.png";
const icon_decrease = "/assets/icon/icon_decrease.png";
const icon_decrease_light = "/assets/icon/icon_decrease_light.png";

interface CalculationProps {
  setShowCalculation: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const Calculation: React.FC<CalculationProps> = ({ setShowCalculation, selectedLanguage }) => {
  const [splitCount, setSplitCount] = useState(1);
  const calculationLocale = CalculationLocales[selectedLanguage];

  // Example total bill in PHP
  const totalBill = 90;

  const handleClose = () => {
    setShowCalculation(false);
  };

  const handleIncrease = () => {
    setSplitCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (splitCount > 1) setSplitCount((prev) => prev - 1);
  };

  const amountPerPerson = Math.floor(totalBill / splitCount);
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amountPerPerson);

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
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Order 20:00:53
                </div>
                <div style={{ margin: "4px 0", fontSize: "16px" }}>
                  Ricotta Salad
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  ₱7,000 / 1 pc / Total ₱7,000
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Order 20:00:32
                </div>
                <div style={{ margin: "4px 0", fontSize: "16px" }}>
                  Cajun Chicken Salad
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  ₱5,500 / 1 pc / Total ₱5,500
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Order 19:57:55
                </div>
                <div style={{ margin: "4px 0", fontSize: "16px" }}>
                  Pepperoni Pizza
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  ₱14,000 / 1 pc / Total ₱14,000
                </div>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Order 17:11:44
                </div>
                <div style={{ margin: "4px 0", fontSize: "16px" }}>
                  Seasoned Chicken
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  ₱20,000 / 1 pc / Total ₱20,000
                </div>
              </div>
            </div>
          </LeftBlock>
          <RightBlock>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "40px",
                fontSize: "40px",
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
                  <Button
                    iconBtnCalculation
                    iconUrl={icon_increase}
                    onClick={handleIncrease}
                  />
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
                marginTop: "30px",
                fontSize: "50px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {formattedAmount}
            </p>
          </RightBlock>
        </CalculationBG>
      </CalculationWrapper>
    </CalculationOverlay>
  );
};

export default Calculation;
