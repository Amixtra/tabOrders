import styled from "styled-components";

export const CalculationOverlay = styled.div`
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

export const CalculationWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

  export const CalculationBG = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: url("/assets/img/amixtra-background.jpg") no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px
`;

export const LeftBlock = styled.div`
  width: calc(70% - 20px);
  height: calc(100% - 120px);
  margin-top: 80px;
  background-color: #F5F5F5;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightBlock = styled.div`
  width: calc(30% - 40px);
  height: calc(100% - 120px);
  margin-top: 80px;
  background-color: #F5F5F5;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;