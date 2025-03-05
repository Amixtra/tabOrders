import styled from "styled-components";

const StyledFooter = styled.footer`
  width: calc(100% - 14vw);
  height: 60px;
  padding: 0 40px 0 20px;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  bottom: 0;
  left: 14vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;

  .language-group {
    display: flex;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

`;

export const Language = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 50px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  gap: 12px;
  cursor: pointer;

  .icon {
    width: 20px;
    height: 20px;
  }

  .text {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
`;

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 50px;
    width: 600px;
    text-align: center;
  }

  h3 {
    margin-bottom: 32px;
    font-size: 32px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
      padding: 20px;
      border: 4px solid #ccc;
      font-size: 20px;
      border-radius: 8px;
      margin-bottom: 10px;
      background-color: #f9f9f9;
      transition: background-color 0.2s;

      &:hover {
        background-color: #eaeaea;
      }
    }
  }

  button {
    margin-top: 16px;
    padding: 18px 80px;
    background: #333;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 21px;

    &:hover {
      background: #555;
    }
  }
`;

export default StyledFooter;