import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledNav = styled.aside`
  width: 14vw;
  padding: 5px;
  border-top: 5px solid #222;
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

export const StyledNavLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 30%;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const StyledNavSectionButton = styled.button`
  padding: 18px 36px;
  text-align: center;
  background-color: #111;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
`;

export const StyledNavWaiterButton = styled.button`
  padding: 24px 36px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #FF4242;
  }
`;

export const StyledNavContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledNavSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

export const StyledToggleSection = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  align-items: center;
  h4 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${PALETTE.WHITE};
  }
  .on-off-container {
    display: flex;
    gap: 10px;
  }
`;

export const StyledToggleButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${PALETTE.WHITE};
  background-color: ${({ active }) => (active ? PALETTE.MAIN : "#333")};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ active }) => (active ? "#e83441" : "#555")};
  }
`;

export default StyledNav;