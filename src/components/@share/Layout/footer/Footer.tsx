import { useState } from "react";
import StyledFooter, { Language, StyledModal } from "./Footer.style";
import Button from "components/@share/Button/Button";
import { useAppDispatch } from "features/store/rootReducer";
import { toggleCartOpen } from "features/cart/cartReducer";
import OrderHistory from "components/OrderHistory/OrderHistory";
import Calculation from "components/Calculation/Calculation";
import { languages, FooterLocales, LanguageCode } from "db/constants";
import Toast from "components/@share/Toast/Toast";
import { useAppSelector } from "features/store/rootReducer";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const icon_cart = "/assets/icon/icon_cart.png";
const icon_order_history = "/assets/icon/icon_receipt.png";
const icon_calculator = "/assets/icon/icon_calculator.png";
const icon_globe = "/assets/icon/icon_globe.png";

interface FooterProps {
  setIsOverlayActive: (value: boolean) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (value: LanguageCode) => void;
}

const Footer: React.FC<FooterProps> = ({
  setIsOverlayActive,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);

  const currentLocale = FooterLocales[selectedLanguage];
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");

  const selectedLanguageLabel =
    languages.find((lang) => lang.code === selectedLanguage)?.label || "English";

  const handleCartOpen = () => {
    if (cart.cartItems.length === 0) {
      showToast("Please Add to Cart First");
      return;
    }
    dispatch(toggleCartOpen());
  };

  const handleOverlayClose = () => {
    setShowOrderHistory(false);
    setShowCalculation(false);
    setIsOverlayActive(false);
  };

  const handleLanguageModalOpen = () => {
    setShowLanguageModal(true);
  };

  const handleLanguageSelect = (code: LanguageCode) => {
    setSelectedLanguage(code);
    setIsOverlayActive(false);
    setShowLanguageModal(false);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastActive(true);

    setTimeout(() => {
      setIsToastActive(false);
    }, 1500);
  };

  const handleOrderHistoryOpen = async () => {
    try {
      const response = await axios.get("http://43.200.251.48:8080/api/order-history", {
        params: { 
          userID: '6a7d23fb7bca2806',
          tableNumber: id,
        },
      });

      const data = await response.data;

      if (Array.isArray(data) && data.length === 0) {
        showToast("Please Order First");
        return;
      } else {
        setShowOrderHistory(true);
        setIsOverlayActive(true);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const handleCalculationOpen = () => {
    setShowCalculation(true);
    setIsOverlayActive(true);
  };

  return (
    <>
      <Toast 
        message={toastMessage} 
        isActive={isToastActive} 
        setIsActive={setIsToastActive} 
      />
      <StyledFooter>
        <div className="language-group">
          <Language onClick={handleLanguageModalOpen}>
            <img src={icon_globe} alt="Globe Icon" className="icon" />
            <span className="text">{selectedLanguageLabel}</span>
          </Language>
        </div>
        <div className="button-group">
          <Button
            color="WHITE"
            withIcon
            iconUrl={icon_cart}
            onClick={handleCartOpen}
          >
            {currentLocale.cart}
          </Button>
          <Button
            color="WHITE"
            withIcon
            iconUrl={icon_calculator}
            onClick={handleCalculationOpen}
          >
            {currentLocale.calculate}
          </Button>
          <Button
            color="WHITE"
            withIcon
            iconUrl={icon_order_history}
            onClick={handleOrderHistoryOpen}
          >
            {currentLocale.orderHistory}
          </Button>
        </div>
      </StyledFooter>

      {showLanguageModal && (
        <StyledModal>
          <div className="modal-content">
            <h3>{currentLocale.selectLanguage}</h3>
            <ul>
              {languages.map(({ code, label }) => (
                <li key={code} onClick={() => handleLanguageSelect(code)}>
                  {label}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowLanguageModal(false)}>
              {currentLocale.close}
            </button>
          </div>
        </StyledModal>
      )}

      {showOrderHistory && (
        <OrderHistory setShowOrderHistory={handleOverlayClose} selectedLanguage={selectedLanguage} />
      )}
      {showCalculation && (
        <Calculation setShowCalculation={handleOverlayClose} selectedLanguage={selectedLanguage} />
      )}
    </>
  );
};

export default Footer;
