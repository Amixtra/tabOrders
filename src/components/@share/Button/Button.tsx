import StyledButton, { ButtonProps } from "./Button.styles";

const Button = ({
  children,
  onClick,
  color,
  bgColor,
  outlined,
  rounded,
  fontWeight,
  size,
  withIcon,
  iconUrl,
  iconBtn,
  iconBtnCart,
  textBtn,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      outlined={outlined}
      rounded={rounded}
      fontWeight={fontWeight}
      size={size}
      withIcon={withIcon}
      iconUrl={iconUrl}
      iconBtn={iconBtn}
      iconBtnCart={iconBtnCart}
      textBtn={textBtn}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
