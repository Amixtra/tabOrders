import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledTableIndicator = styled.div`
  position: fixed;
  top: 0;
  right: 20px;

  width: 135px;
  height: 80px;
  background-color: ${PALETTE.MAIN};
  padding: 0px 12px 12px;
  text-align: center;
  border-radius: 0 0 10px 10px;

  & .table-description {
    font-size: 14px;
    margin-top: 5px;
    color: ${PALETTE.WHITE};
  }
`;
const StyledTableNumber = styled.p`
  font-size: 52px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
`;

export { StyledTableIndicator, StyledTableNumber };
