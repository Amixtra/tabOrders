import { useState } from "react";
import useFetch from "hooks/useFeth";
import StyledNav, {
  StyledNavBillOutButton,
  StyledNavContent,
  StyledNavLogo,
  StyledNavSectionButton,
  StyledNavWaiterButton,
} from "./Nav.styles";
import { logoSources } from "db/constants";
import { CategoryProps } from "types";
import Waiter from "components/Waiter/Waiter";
import BillOut from "components/BillOut/BillOut";
import { LanguageCode, NavLocales } from "db/constants";
import { useLocation } from "react-router-dom";

interface NavProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
  setIsOverlayActive: (value: boolean) => void;
  selectedLanguage: LanguageCode;
}

const Nav: React.FC<NavProps> = ({
  onCategorySelect,
  selectedCategory,
  setIsOverlayActive,
  selectedLanguage,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");
  const [data] = useFetch(
    `http://localhost:8080/api/categories?company=${company}&language=${selectedLanguage}`
  );
  const [showWaiter, setShowWaiter] = useState(false);
  const [showBill, setShowBill] = useState(false);

  const navLocale = NavLocales[selectedLanguage];

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
          <img
            src={logoSources.defaultLight}
            alt="TabOrders Logo"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </StyledNavLogo>
        <StyledNavSectionButton
          onClick={() => onCategorySelect(null)}
          style={{
            backgroundColor: selectedCategory === null ? "#ff0000" : "#dfdfdf",
            color: selectedCategory === null ? "#ffffff" : "#000",
          }}
        >
          {navLocale.allMenu}
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
      <StyledNavBillOutButton onClick={() => setShowBill(true)}>
        Bill Out
      </StyledNavBillOutButton>
      <StyledNavWaiterButton onClick={handleWaiterOpen}>
        {navLocale.callWaiter}
      </StyledNavWaiterButton>
      {showWaiter && <Waiter setShowWaiter={handleWaiterClose} />}
      {showBill && <BillOut />}
    </StyledNav>
  );
};

export default Nav;
