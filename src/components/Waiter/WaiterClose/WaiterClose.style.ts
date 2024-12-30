import PALETTE from "constants/palette";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

export const StyledCloseIcon = styled(IoIosClose)`
  color: ${PALETTE.WHITE};
  font-size: 42px;
`;

const WaiterCloseOverlay = styled.div`
  position: fixed;
  right: 180px;
  width: 135px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const WaiterCloseWord = styled.p`
  text-align: center;
  font-size: 32px;
  color: ${PALETTE.WHITE};
  margin: 0;
`;

export { WaiterCloseOverlay, WaiterCloseWord };
