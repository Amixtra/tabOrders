import React from "react";
import { useParams } from "react-router";
import {
  StyledTableIndicator,
  StyledTableNumber,
} from "./TableIndicator.style";

const TableIndicator = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <StyledTableIndicator>
      <p className="table-description">Table</p>
      <StyledTableNumber>{id || "Unknown"}</StyledTableNumber>
    </StyledTableIndicator>
  );
};

export default TableIndicator;