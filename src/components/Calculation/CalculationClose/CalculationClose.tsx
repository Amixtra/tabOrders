import React from "react";
import {
  StyledCloseIcon,
  CalculationCloseOverlay,
  CalculationCloseWord,
} from "./CalculationClose.style";

interface CalculationCloseProps {
  onClose: () => void;
}

const CalculationClose: React.FC<CalculationCloseProps> = ({ onClose }) => {
  return (
    <CalculationCloseOverlay onClick={onClose}>
      <StyledCloseIcon />
      <CalculationCloseWord>Close</CalculationCloseWord>
    </CalculationCloseOverlay>
  );
};

export default CalculationClose;
