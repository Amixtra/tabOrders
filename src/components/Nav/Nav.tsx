import React from "react";
import StyledNav, {
  StyledNavContent,
  StyledNavLogo,
  StyledNavSectionButton,
  StyledNavWaiterButton,
} from "./Nav.styles";
import { CategoryProps } from "types";
import useFetch from "hooks/useFeth";

interface NavProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

const Nav: React.FC<NavProps> = ({ onCategorySelect, selectedCategory }) => {
  const [data] = useFetch("http://localhost:3001/categories");

  return (
    <StyledNav>
      <StyledNavContent>
        <StyledNavLogo>Logo</StyledNavLogo>
        <StyledNavSectionButton
          onClick={() => onCategorySelect(null)}
          style={{
            backgroundColor: selectedCategory === null ? "#ff0000" : "#dfdfdf",
            color: selectedCategory === null ? "#ffffff" : "#000",
          }}
        >
          All Menu
        </StyledNavSectionButton>
        {data &&
          data.map((item: CategoryProps) => (
            <StyledNavSectionButton
              key={item.categoryId}
              onClick={() => onCategorySelect(item.categoryId)}
              style={{
                backgroundColor: selectedCategory === item.categoryId ? "#ff0000" : "#dfdfdf",
                color: selectedCategory === item.categoryId ? "#ffffff" : "#000",
              }}
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
