import styled from "styled-components";

export const OrderPopupDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  width: 70%;
  height: 70%;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PopupContent = styled.div`
  flex: 1;
  overflow-y: auto;

  padding: 0 20px;

  h3 {
    text-align: center;
    font-size: 1.8rem;
    color: red;
    margin-bottom: 40px;

    strong {
        font-weight: bold;
    }
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-top: 30px;
    font-size: 30px;
  }

  p span {
    flex: 1;
    text-align: center;
    
    strong {
        font-weight: bold;
    }
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between; 
  gap: 10px;
  margin-bottom: 20px;

  p {
    font-size: 30px;
  }

  p:first-child {
    color: grey
  }

  p:last-child {
    color: red;
    font-weight: bold;
    font-size: 50px;
  }
`;

export const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between; 
  gap: 10px;

  button {
    border-radius: 8px;
    padding: 20px 24px;
    font-size: 1rem;
    font-weight: bold;
  }

  button:first-child {
    flex: 3;
    background-color: grey;
    color: white;
  }

  button:last-child {
    flex: 7;
    background-color: red;
    color: white;
  }
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 1000;
`;
