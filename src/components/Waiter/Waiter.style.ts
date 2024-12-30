import styled from "styled-components";

export const WaiterOverlay = styled.div`
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

export const WaiterWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const WaiterBG = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background-color: #000;
`;
