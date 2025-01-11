import { useSearchParams } from "react-router-dom";
import { StyledTableIndicator, StyledTableNumber } from "./TableIndicator.style";
import { LanguageCode, TableIndicatorLocales } from "db/constants";

interface TableIndicatorProps {
  selectedLanguage: LanguageCode;
};

const TableIndicator: React.FC<TableIndicatorProps> = ({
  selectedLanguage
}) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");

  const tableLocale = TableIndicatorLocales[selectedLanguage]

  return (
    <StyledTableIndicator>
      <p className="table-description">{tableLocale.table}</p>
      <StyledTableNumber>{id || "Unknown"}</StyledTableNumber>
    </StyledTableIndicator>
  );
};

export default TableIndicator;
