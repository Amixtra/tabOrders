import React, { useState } from "react";
import useFetch from "hooks/useFeth";
import StyledNav, {
  StyledNavContent,
  StyledNavLogo,
  StyledNavSectionButton,
  StyledNavWaiterButton,
} from "./Nav.styles";
import logoSources from "db/logo";
import { CategoryProps } from "types";
import Waiter from "components/Waiter/Waiter";

interface NavProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
  setIsOverlayActive: (value: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ onCategorySelect, selectedCategory, setIsOverlayActive }) => {
  const [data] = useFetch("http://localhost:3001/categories");
  const [showWaiter, setShowWaiter] = useState(false);

  const handleWaiterOpen = () => {
    setShowWaiter(true);
    setIsOverlayActive(true);
  };

  const handleWaiterClose = () => {
    setShowWaiter(false);
    setIsOverlayActive(false);
  };

  return (
    <StyledNav>
      <StyledNavContent>
        <StyledNavLogo>
          <img src={logoSources.default} alt="TabOrder Logo" style={{ width: "100%", borderRadius: "10px" }} />
        </StyledNavLogo>
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
      <StyledNavWaiterButton onClick={handleWaiterOpen}>Call Waiter</StyledNavWaiterButton>
      {showWaiter && <Waiter setShowWaiter={handleWaiterClose} />}
    </StyledNav>
  );
};

export default Nav;
