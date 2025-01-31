import styled from "styled-components";

export const OrderHistoryOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5); /* optional overlay dim */
`;

export const OrderHistoryWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const OrderTitleBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222; /* dark background for top bar */
  padding: 0 1rem;
  box-sizing: border-box;

  .title-left {
    display: flex;
    flex-direction: column;
  }

  .order-label {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .order-time {
    color: #ccc;
    margin-top: 10px;
    font-size: 1rem;
  }

  .title-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const OrderHistoryContainer = styled.div`
  margin-top: 80px; /* so items sit below the top bar */
  width: 100%;
  height: calc(100% - 80px);
  background-color: #0a0a0a; /* match the second screenshot’s dark style */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
`;

export const OrderList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #333;
  color: #fff;

  .item-name {
    font-size: 1.2rem;
    font-weight: 500;
  }
  .item-qty {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

export const OrderSummary = styled.div`
  width: 100%;
  padding: 1rem;
  border-top: 1px solid #333;
`;

export const OrderSummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;

  .label {
    font-size: 2.5rem;
  }

  .value {
    font-size: 3.5rem;
    color: red;
  }
`;

