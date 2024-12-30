import { useSearchParams } from "react-router-dom";
import { StyledTableIndicator, StyledTableNumber } from "./TableIndicator.style";

const TableIndicator = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");

  return (
    <StyledTableIndicator>
      <p className="table-description">Table</p>
      <StyledTableNumber>{id || "Unknown"}</StyledTableNumber>
    </StyledTableIndicator>
  );
};

export default TableIndicator;
