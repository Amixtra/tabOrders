import styled from "styled-components";
import PALETTE from "constants/palette";

export const WaiterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WaiterWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
`;

export const WaiterHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  padding: 16px;
`;

export const WaiterBG = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
`;

export const WaiterItemsContainer = styled.div`
  margin-top: 80px;
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const WaiterItem = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
`;

export const RightBlock = styled.div`
  margin-top: 80px;
  width: 30%;
  background-color: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

export const WaiterBottomButton = styled.button`
  height: 60px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 16px;
  margin-left: 20px;
  margin-right: 20px;
`;
