import StyledNav, { StyledNavContent, StyledNavLogo, StyledNavSectionButton, StyledNavWaiterButton } from "./Nav.styles";
import { CategoryProps } from "types";
import useFetch from "hooks/useFeth";

const Nav = () => {
  const [data] = useFetch("http://localhost:3001/categories");

  const handleScrollToCategory = (categoryName: string) => {
    const element = document.getElementById(categoryName);
    if (element) {
      const headerHeight = 80;
      const offset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <StyledNav>
      <StyledNavContent>
        <StyledNavLogo>TEST</StyledNavLogo>
        {data &&
          data.map((item: CategoryProps) => (
            <StyledNavSectionButton 
              key={item.categoryId}
              onClick={() => handleScrollToCategory(item.categoryName)}
            >
              {item.categoryName}
            </StyledNavSectionButton>
          ))}
          </StyledNavContent>
      <StyledNavWaiterButton>Call Waiter</StyledNavWaiterButton>
    </StyledNav>
  );
};

export default Nav;
