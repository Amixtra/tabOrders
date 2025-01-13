import { CartOrderLocales, LanguageCode } from "db/constants";
import {
  CalculationTitleOverlay,
  CalculationTitleWord,
} from "./CalculationTitle.style";

interface CalculationTitleProps {
  selectedLanguage: LanguageCode;
};

const CalculationTitle: React.FC<CalculationTitleProps> = ({selectedLanguage}) => {
  const cartOrderLocale = CartOrderLocales[selectedLanguage];
  return (
    <CalculationTitleOverlay>
      <CalculationTitleWord>{cartOrderLocale.title}</CalculationTitleWord>
    </CalculationTitleOverlay>
  );
};

export default CalculationTitle;
