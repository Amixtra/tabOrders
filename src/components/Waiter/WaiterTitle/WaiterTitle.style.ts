import PALETTE from "constants/palette";
import styled from "styled-components";

const WaiterTitleOverlay = styled.div`
  position: fixed;
  left: 20px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const WaiterTitleWord = styled.p`
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  margin: 0;
`;

export { WaiterTitleOverlay, WaiterTitleWord };
