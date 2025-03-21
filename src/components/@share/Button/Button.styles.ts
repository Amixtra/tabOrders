import styled, { css, CSSProperties } from "styled-components";

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  color?: string;
  bgColor?: string;
  outlined?: boolean;
  rounded?: boolean;
  fontWeight?: string | number;
  size?: string;
  withIcon?: boolean;
  iconUrl?: string;
  iconBtn?: boolean;
  iconBtnCart?: boolean;
  iconBtnCalculation?: boolean;
  iconBtnKKB?: boolean;
  KKBBtnUser?: boolean;
  textBtn?: boolean;
  style?: CSSProperties;
}

const buttonTypes = css<ButtonProps>`
  /* outlined */
  ${({ theme, color, outlined }) => {
    const selectedColor = theme[color!];
    return (
      outlined &&
      css`
        border: 2px solid ${selectedColor};
      `
    );
  }}

  /* rounded */
  ${(props) =>
    props.rounded &&
    css`
      border-radius: 10px;
    `}
  
  /* withIcon */
  ${(props) =>
    props.withIcon &&
    css`
      display: flex;
      align-items: center;

      &:before {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        background: url("${props.iconUrl}") no-repeat 0 center/cover;
      }
    `}

  /* iconBtn */
  ${(props) =>
    props.iconBtn &&
    css`
      display: block;
      width: 3.125vw;
      height: 3.125vw;
      background: url("${props.iconUrl}") no-repeat 0 center/cover; ;
    `}
  
  /* iconBtnCart */
  ${(props) => 
    props.iconBtnCart &&
    css`
      display: block;
      width: 6.125vw;
      height: 4.2vw;
      background: url("${props.iconUrl}") no-repeat 0 center/cover; 
      
      @media (max-width: 1080px) {
        width: 5.2vw;
        height: 3.5vw;
      };
    `}

  /* iconBtnCalculation */
  ${(props) => 
    props.iconBtnCalculation &&
    css`
      display: block;
      width: 6.125vw;
      height: 4.2vw;
      background: url("${props.iconUrl}") no-repeat 0 center/cover; ;
    `}

   /* iconBtnKKB */
  ${(props) => 
    props.iconBtnKKB &&
    css`
      display: block;
      width: 20vw;
      margin-top: 4vw;
      height: 6vw;
      border-radius: 20px;
      background: red;
      color: white;
      font-size: 3vw;

      @media (max-height: 600px) {
        margin-top: 2vw;
      };
    `}

  ${(props) => 
    props.KKBBtnUser &&
    css`
      display: block;
      width: 15vw;
      height: 5vw;
      border-radius: 20px;
      background: red;
      color: white;
      font-size: 1.6vw;
      margin-left: 10px;
      margin-right: 10px;

      @media (max-height: 600px) {
        margin-top: 2vw;
      };
    `}

    /* textBtn */
  ${(props) =>
    props.textBtn &&
    css`
      background: transparent;
    `}
`;

const colorStyles = css<ButtonProps>`
  /* color, bgColor */
  ${({ theme, color, bgColor }) => {
    const selectedColor = theme[color!];
    const selectedBgColor = theme[bgColor!];
    return css`
      color: ${selectedColor};
      background-color: ${selectedBgColor};
    `;
  }}
`;

const buttonStyles = css<ButtonProps>`
  /* fontWeight */
  ${(props) => {
    const fontWeight = props.fontWeight;
    return css`
      font-weight: ${fontWeight};
    `;
  }}
`;

const StyledButton = styled.button`
  background-color: transparent;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  transition: 0.2s;

  ${buttonStyles}
  ${colorStyles}
  ${buttonTypes}
`;

export default StyledButton;
