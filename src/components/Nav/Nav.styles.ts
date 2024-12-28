import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledNav = styled.aside`
  width: 14vw;
  padding: 5px;
  border-top: 5px solid ${PALETTE.MAIN};
  box-shadow: -5px 0 6px rgba(0, 0, 0, 0.55);
  position: relative;
  z-index: 1;
  transition: width 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

export const StyledNavLogo = styled.button`
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
`;

export const StyledNavSectionButton = styled.button`
  padding: 12px 36px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
  width: 100%;
`;

export const StyledNavWaiterButton = styled.button`
  padding: 24px 36px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
`;

export const StyledNavContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default StyledNav;
