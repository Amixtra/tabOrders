import PALETTE from "constants/palette";
import styled from "styled-components";

export const StartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const StartWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StartPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const StartLogo = styled.img`
  width: 20%;
  height: 20%;
  object-fit: cover;
  display: block;
`;

export const Logo = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StartDescription = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
`;