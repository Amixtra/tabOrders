import { CalculationLocales, LanguageCode } from "db/constants";
import {
  CalculationTitleOverlay,
  CalculationTitleWord,
} from "./CalculationTitle.style";

interface CalculationTitleProps {
  selectedLanguage: LanguageCode;
};

const CalculationTitle: React.FC<CalculationTitleProps> = ({selectedLanguage}) => {
  const calculationLocale = CalculationLocales[selectedLanguage];
  return (
    <CalculationTitleOverlay>
      <CalculationTitleWord>{calculationLocale.title}</CalculationTitleWord>
    </CalculationTitleOverlay>
  );
};

export default CalculationTitle;
