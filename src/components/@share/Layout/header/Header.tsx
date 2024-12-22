import React from "react";

import { StyledHeader } from "./Header.style";

interface HeaderProps {
  children?: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  return <StyledHeader>{children}</StyledHeader>;
};

export default Header;
