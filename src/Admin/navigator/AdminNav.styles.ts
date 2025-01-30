import styled from "styled-components";
import PALETTE from "constants/palette";

const StyledNav = styled.aside`
  width: 16vw;
  min-width: 220px;
  max-width: 280px;
  padding: 10px;
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

  @media (max-width: 1024px) {
    width: 22vw;
    height: 100vh;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    justify-content: space-around;
  }
`;

export const StyledNavLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  height: auto;
  margin-bottom: 20%;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin-bottom: 0;
  }
`;

export const StyledNavSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 5px;
  }
`;

export const StyledNavSectionButton = styled.button`
  padding: 12px 24px;
  text-align: center;
  background-color: #111;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${PALETTE.MAIN};
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 12px;
  }
`;

export const StyledToggleSection = styled.div`
  display: flex;
  margin-top: 20px;
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

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 0;
  }
`;

export const StyledNavWaiterButton = styled.button`
  padding: 26px 44px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #FF4242;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 18px;
  }
`;

export const StyledNavContent = styled.div`
  display: flex;
  flex-direction: column;
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

export const BottomButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: auto;
`;

export default StyledNav;
