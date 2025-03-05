import PALETTE from "constants/palette";
import styled from "styled-components";

export const AdOverlay = styled.div`
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

export const AdWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

export const AdVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

export const AdCloseButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: ${PALETTE.WHITE};
  padding: 20px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const AdCloseWord = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 32px;
  font-weight: 900;
  color: #000;
`;

export const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdLogo = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  display: block;
`;

export const IconWrapper = styled.div`
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdDescription = styled.div`
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