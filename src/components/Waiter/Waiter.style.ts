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
  object-fit: cover;
  background: url("/assets/img/amixtra-background.jpg") no-repeat center center/cover;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
`;

export const WaiterItemsContainer = styled.div`
  margin-top: 60px;
  width: 70%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0 20px;
`;

export const WaiterItem = styled.button`
  background-color: #ffffff;
  border: 1px solid ${PALETTE.GREY300};
  border-radius: 8px;
  padding: 16px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${PALETTE.GREY200};
    transform: scale(1.05);
  }
`;


export const RightBlock = styled.aside`
  width: 30%;
  padding: 20px;
  background-color: ${PALETTE.GREY100};
  box-shadow: -5px 0 6px rgba(0, 0, 0, 0.55);
  margin-top: 70px;
  border-radius: 16px;
  overflow-y: auto;
  font-size: 18px;
  max-height: 75vh;

  &:last-child {
    border-bottom: 0;
  }
  
  & .cart-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    & .product-name {
      font-size: 16px;
      font-weight: bold;
    }

    & .remove-btn {
      margin-right: 8px;
    }
  }

  & .cart-item-body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .cart-item-counter {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  & .cart-body {
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${PALETTE.GREY400};
      border-radius: 8px;
    }

    & .empty-sign {
      color: ${PALETTE.GREY400};
    }
  }

  .cart-order-number {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export const WaiterListItem = styled.li`
  padding-bottom: 1.875vw;
  margin-bottom: 1.875vw;
  border-bottom: 1px solid ${PALETTE.GREY300};
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