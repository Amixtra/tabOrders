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
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(amountPerPerson);

  return (
    <CalculationOverlay>
      <CalculationWrapper>
        <TableIndicator selectedLanguage={selectedLanguage} />
        <CalculationTitle selectedLanguage={selectedLanguage} />
        <CalculationClose onClose={handleClose} selectedLanguage={selectedLanguage} />
        <CalculationBG>
          <LeftBlock />
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
              {splitCount === 1 ? `${calculationLocale.payAlone}` : `${calculationLocale.perPerson}`}
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
