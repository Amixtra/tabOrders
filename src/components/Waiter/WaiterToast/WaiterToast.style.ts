import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledWaiterToast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  width: 62.5vw;
  height: 15.625vw;
  border-radius: 10px;
  background-color: ${PALETTE.MAIN};
  color: ${PALETTE.WHITE};
  font-size: 2.625vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &.hide {
    display: none;
  }
`;

export default StyledWaiterToast;
