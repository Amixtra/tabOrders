import StyledNav, { StyledNavLogo, StyledNavSectionButton, StyledNavWaiterButton } from "./Nav.styles";
import { CategoryProps } from "types";
import useFetch from "hooks/useFeth";

const Nav = () => {
  const [data] = useFetch("http://localhost:3001/categories");

  return (
    <StyledNav>
      <StyledNavLogo>TEST</StyledNavLogo>
      {data &&
        data.map((item: CategoryProps) => (
          <StyledNavSectionButton key={item.categoryId}>
            {item.categoryName}
          </StyledNavSectionButton>
        ))}
      <StyledNavWaiterButton>Call Waiter</StyledNavWaiterButton>
    </StyledNav>
  );
};

export default Nav;
