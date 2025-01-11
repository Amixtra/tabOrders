import styled from "styled-components";

export const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black;
  z-index: -1;
`;

export const FixedLogo = styled.img`
  position: fixed;
  top: 20px;
  left: 20px;
  width: 200px;
  height: auto;
  z-index: 2;
`;

export const TableSettingLogo = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

export const TableSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding-bottom: 30px;
  border-radius: 10px;
  z-index: 1;
`;


export const TableSettingHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    width: 100%;
    margin-top: 30px;
`;

export const TableSettingTitle = styled.div`
    color: white;
    font-size: 48px;
    font-weight: 700;
`;

export const TableSettingSubmitContainer = styled.div`
    display: flex;
    margin: 60px auto;
`;

export const TableSettingSubmit = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 59px;
    color: black;
    background: white;
    border-radius: 50px;
    font-size: 19px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;

    &:hover {
        background: black;
        color: white;
    }

    &.submit-disabled {
        background: gray;
        color: white;
    }
`;

export const TableSettingField = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > input:nth-child(3) {
      margin-right: 20px;
    }
`;

export const TableSettingSection = styled.input`
    width: 30%;
    height: 150px;
    font-size: 64px;
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
    transition: all 0.1s;

    &:focus {
      border: 2px solid white;
      box-shadow: 0 0 2px 2px white;
    }
`;

export const GoBackButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 59px;
    color: black;
    background: white;
    border-radius: 50px;
    font-size: 19px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
    margin: 50px auto auto auto; // t-r-b-l

    &:hover {
        background: black;
        color: white;
    }
`;