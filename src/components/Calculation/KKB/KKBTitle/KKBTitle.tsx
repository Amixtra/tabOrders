import { CalculationLocales, LanguageCode } from "db/constants";
import {
  CalculationTitleOverlay,
  CalculationTitleWord,
} from "./KKBTitle.style";

const CalculationTitle = () => {
  return (
    <CalculationTitleOverlay>
      <CalculationTitleWord>Kanyang Kanyang Bayad (KKB)</CalculationTitleWord>
    </CalculationTitleOverlay>
  );
};

export default CalculationTitle;
