import {
  StyledCloseIcon,
  CalculationCloseOverlay,
  CalculationCloseWord,
} from "./CalculationClose.style";
import { CartOrderLocales, LanguageCode } from "db/constants";

interface CalculationCloseProps {
  onClose: () => void;
  selectedLanguage: LanguageCode;
}

const CalculationClose: React.FC<CalculationCloseProps> = ({ onClose, selectedLanguage }) => {
  const cartOrderLocale = CartOrderLocales[selectedLanguage];
  return (
    <CalculationCloseOverlay onClick={onClose}>
      <StyledCloseIcon />
      <CalculationCloseWord>{cartOrderLocale.cancel}</CalculationCloseWord>
    </CalculationCloseOverlay>
  );
};

export default CalculationClose;
