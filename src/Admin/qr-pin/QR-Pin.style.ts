import styled from "styled-components";

export const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export const QRTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: white;
  font-weight: 900;
`;

export const QRCode = styled.div`
  margin-bottom: 10px;
`;

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TimerText = styled.p`
  font-size: 18px;
  color: red;
  font-weight: bold;
  margin-right: 10px;
`;

export const RefreshIcon = styled.span`
  font-size: 22px;
  margin-top: 4px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

export const PinSection = styled.div`
  h2 {
    font-size: 26px;
    font-weight: 900;
    color: white;
  }
`;

export const InputPinField = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputPinSection = styled.input`
    width: 60px;
    height: 70px;
    font-size: 36px;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    margin-top: 30px;
    margin-left: 4px;
    margin-right: 4px;
    border: 2px solid white;
    background: black;
    font-weight: bold;
    color: white;
    outline: none;
    transition: all 0.3s ease-in-out;
    user-select: none; /* Prevent selection */

    &.blurred {
      filter: blur(8px); /* Default blur effect */
      cursor: pointer; /* Show pointer to indicate clickability */
    }

    &.visible {
      filter: none; /* Remove blur when clicked */
    }

    &:focus {
      border: 2px solid white;
      box-shadow: 0 0 2px 2px white;
    }
`;
