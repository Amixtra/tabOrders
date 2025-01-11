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

export const CompanyLogo = styled.img`
  display: block;
  margin: 0 auto;
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

export const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background: rgba(0, 0, 0, 0.5);
  padding-bottom: 30px;
  border-radius: 10px;
  z-index: 1;
`;


export const CompanyHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    width: 100%;
    margin-top: 30px;
`;

export const CompanyTitle = styled.div`
    color: white;
    font-size: 48px;
    font-weight: 700;
`;

export const CompanyInputs = styled.div`
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

export const CompanyInput = styled.div`
    display: flex;
    align-items: center;
    margin: auto;
    width: 480px;
    height: 70px;
    background: white;
    border-radius: 6px;
`;

export const CompanyInputImg = styled.img`
    margin: 0px 30px;
`;

export const CompanyInputInputs = styled.input`
    height: 50px;
    width: 400px;
    background: transparent;
    border: none;
    color: black;
    font-size: 16px;
`;

export const CompanyForgotPassword = styled.div`
    padding-left: 62px;
    margin-top: 27px;
    color: white;
    font-size: 18px;

    & .forgot-password-span {
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
        &:hover {
            color: gray;
        }
    }
`;

export const CompanySubmitContainer = styled.div`
    display: flex;
    gap: 30px;
    margin: 60px auto;
`;

export const CompanySubmit = styled.button`
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

export const PasswordToggleIcon = styled.img`
  margin-right: 20px;
  cursor: pointer;
  width: 25px;
  height: 25px;
`;

export const PasswordError = styled.div`
  color: red;
  font-size: 14px;
  margin-left: 62px;
  margin-top: -10px;
`;

export const PasswordHint = styled.div`
  color: orange;
  font-size: 14px;
  margin-left: 62px;
  margin-top: -10px;
`;