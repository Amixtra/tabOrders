import React, { useEffect, useState } from "react";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import {
  CalculationOverlay,
  CalculationWrapper,
  CalculationBG,
} from "./Calculation.style";
import CalculationClose from "./CalculationClose/CalculationClose";
import CalculationCounter from "./CalculationCounter/CalculationCounter";
import CalculationTitle from "./CalculationTitle/CalculationTitle";

interface CalculationProps {
  setShowCalculation: (value: boolean) => void;
}

const Calculation: React.FC<CalculationProps> = ({ setShowCalculation }) => {
  const [resetTimer, setResetTimer] = useState(false);

  const handleClose = () => {
    setShowCalculation(false);
  };

  const handleUserActivity = () => {
    setResetTimer(false);
    setTimeout(() => setResetTimer(false), 0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
    };
  }, []);

  return (
    <CalculationOverlay>
      <CalculationWrapper>
        <TableIndicator />
        <CalculationTitle />
        <CalculationCounter onExpire={handleClose} resetTimer={resetTimer} /> 
        <CalculationClose onClose={handleClose} />
        <CalculationBG />
      </CalculationWrapper>
    </CalculationOverlay>
  );
};

export default Calculation;
