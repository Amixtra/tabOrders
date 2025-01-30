import styled from "styled-components";

const OrderHistoryCounterOverlay = styled.div`
  position: fixed;
  top: 40px;
  left: 70%;
  transform: translate(-50%, -50%);
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 8px;

  @media (max-width: 1080px) {
    top: auto;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: auto;
    padding: 12px;
  }
`;

const OrderHistoryCounterWord = styled.p`
  text-align: center;
  font-size: 24px;
  color: red;
  font-weight: 900;
  margin: 0;

  @media (max-width: 1080px) {
    font-size: 20px;
  }
`;

export { OrderHistoryCounterOverlay, OrderHistoryCounterWord };
