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
  padding: 12px 36px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 10px;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 25px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
`;