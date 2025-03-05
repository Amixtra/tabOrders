import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Toast from "components/@share/Toast/Toast";

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
  const [showWaiter, setShowWaiter] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [toastPersistent, setToastPersistent] = useState(true);
  const [isToggleCounterOn, setIsToggleCounterOn] = useState(false);

  useEffect(() => {
    if (company) {
      axios
        .get(`http://43.200.251.48:8080/api/toggles?company=${company}`)
        .then((response) => {
          setIsToggleCounterOn(response.data.isToggleCounterOn);
        })
        .catch((error) => {
          console.error("Error fetching toggles:", error);
        });
    }
  }, [company]);

  const navLocale = NavLocales[selectedLanguage];
  const showToast = (message: string, persistent: boolean = true) => {
    setToastMessage(message);
    setToastPersistent(persistent);
    setIsToastActive(true);
  };

  const handleWaiterOpen = () => {
    setShowWaiter(true);
    setIsOverlayActive(true);
  };

  const handleWaiterClose = () => {
    setShowWaiter(false);
    setIsOverlayActive(false);
  };

  const handleBillOpen = () => {
    setShowBill(true);
    setIsOverlayActive(true);
  };

  const handleBillClose = () => {
    setShowBill(false);
    setIsOverlayActive(false);
  };

  return (
    <>
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
                  backgroundColor:
                    selectedCategory === item.categoryId ? "#ff0000" : "#dfdfdf",
                  color: selectedCategory === item.categoryId ? "#ffffff" : "#000",
                }}
              >
                {item.categoryName}
              </StyledNavSectionButton>
            ))}
        </StyledNavContent>
        <div style={{ marginTop: "auto" }}>
          <StyledNavWaiterButton onClick={handleWaiterOpen}>
            {navLocale.callWaiter}
          </StyledNavWaiterButton>
          {showWaiter && <Waiter setShowWaiter={handleWaiterClose} />}
          <StyledNavBillOutButton onClick={handleBillOpen}>
            {navLocale.billOut}
          </StyledNavBillOutButton>
          <BillOut
            isOpen={showBill}
            onClose={handleBillClose}
            isToggleCounterOn={isToggleCounterOn}
            showToast={showToast}
          />
        </div>
      </StyledNav>
      <Toast
        message={toastMessage}
        isActive={isToastActive}
        setIsActive={setIsToastActive}
        persistent={toastPersistent}
      />
    </>
  );
};

export default Nav;
