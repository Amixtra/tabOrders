import styled from "styled-components";

const WaiterCounterOverlay = styled.div`
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
`;

const WaiterCounterWord = styled.p`
  text-align: center;
  font-size: 24px;
  color: red;
  font-weight: 900;
  margin: 0;
`;

export { WaiterCounterOverlay, WaiterCounterWord };
