import React from "react";

import {
  StyledTableIndicator,
  StyledTableNumber,
} from "./TableIndicator.style";

const TableIndicator = () => {
  return (
    <StyledTableIndicator>
      <p className="table-description">Table No.</p>
      <StyledTableNumber>test</StyledTableNumber>
    </StyledTableIndicator>
  );
};

export default TableIndicator;
