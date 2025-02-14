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
  height: 100vh;
`;

export const StyledNavLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: auto;
  img {
    max-width: 100%;
    height: auto;
  }
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

  @media (max-width: 1080px) {
    padding: 12px 28px;
    font-size: 16px;
  }
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

  @media (max-width: 1080px) {
    padding: 12px 28px;
    font-size: 16px;
  }
`;

export const StyledNavBillOutButton = styled.button`
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

  @media (max-width: 1080px) {
    padding: 10px 30px;
    font-size: 16px;
  }
`;

export const StyledNavContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export default StyledNav;