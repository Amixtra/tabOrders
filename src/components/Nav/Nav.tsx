import React, { useState } from "react";
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
    `http://43.200.251.48:8080/api/categories?company=${company}&language=${selectedLanguage}`
  );

  // 1) State to handle Waiter
  const [showWaiter, setShowWaiter] = useState(false);
  // 2) State to handle BillOut
  const [showBill, setShowBill] = useState(false);

  const navLocale = NavLocales[selectedLanguage];

  // Waiter open/close
  const handleWaiterOpen = () => {
    setShowWaiter(true);
    setIsOverlayActive(true);
  };
  const handleWaiterClose = () => {
    setShowWaiter(false);
    setIsOverlayActive(false);
  };

  // BillOut open/close
  const handleBillOpen = () => {
    setShowBill(true);
    setIsOverlayActive(true);
  };
  const handleBillClose = () => {
    setShowBill(false);
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

        {/* "All Menu" button */}
        <StyledNavSectionButton
          onClick={() => onCategorySelect(null)}
          style={{
            backgroundColor: selectedCategory === null ? "#ff0000" : "#dfdfdf",
            color: selectedCategory === null ? "#ffffff" : "#000",
          }}
        >
          {navLocale.allMenu}
        </StyledNavSectionButton>

        {/* Category buttons */}
        {data &&
          data.map((item: CategoryProps) => (
            <StyledNavSectionButton
              key={item.categoryId}
              onClick={() => onCategorySelect(item.categoryId)}
              style={{
                backgroundColor:
                  selectedCategory === item.categoryId ? "#ff0000" : "#dfdfdf",
                color: selectedCategory === item.categoryId
                  ? "#ffffff"
                  : "#000",
              }}
            >
              {item.categoryName}
            </StyledNavSectionButton>
          ))}
      </StyledNavContent>

      <div style={{ marginTop: "auto" }}>
        {/* Waiter button */}
        <StyledNavWaiterButton onClick={handleWaiterOpen}>
          {navLocale.callWaiter}
        </StyledNavWaiterButton>
        {showWaiter && <Waiter setShowWaiter={handleWaiterClose} />}

        {/* BillOut button */}
        <StyledNavBillOutButton onClick={handleBillOpen}>
          {navLocale.billOut}
        </StyledNavBillOutButton>

        {/* BillOut Modal */}
        <BillOut isOpen={showBill} onClose={handleBillClose} />
      </div>
    </StyledNav>
  );
};

export default Nav;