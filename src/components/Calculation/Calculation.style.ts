import PALETTE from "constants/palette";
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

export const RightBlock = styled.aside`
  width: calc(30% - 40px);
  height: calc(100% - 120px);
  margin-top: 80px;
  background-color: #F5F5F5;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RightBlockLine = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.875vw 0;
  margin: 1.875vw 0;
  border-bottom: 1px solid ${PALETTE.GREY300};
  border-top: 1px solid ${PALETTE.GREY300};

  .split-pay-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .split-pay-counter {
      display: flex;
      align-items: center;
      gap: 8px;

      .split-pay-number {
        font-size: 64px;
        padding: 0 32px;
      }
    }
  }
`;