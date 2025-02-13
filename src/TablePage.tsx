import { useState, useEffect, useCallback, useRef } from "react";
import Header from "components/@share/Layout/header/Header";
import GridContainer from "components/@share/Layout/gridContainer/GridContainer";
import Footer from "components/@share/Layout/footer/Footer";
import ProductListPage from "components/Product/ProductList/ProductListPage";
import Cart from "components/Cart/Cart";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import RestaurantIndicator from "components/@share/Layout/indicator/RestaurantIndicator";
import Nav from "components/Nav/Nav";
import AdPage from "components/@share/Layout/ad/Ad";
import StartPage from "components/@share/Layout/start/Start";
import { useLocation } from "react-router";
import ErrorPage from "components/Error/ErrorPage";
import { LanguageCode } from "db/constants";
import axios from "axios";

const INACTIVITY_TIMEOUT = 90000;

const TablePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("en");
  const [isUnLockFromTabletOn, setIsUnLockFromTabletOn] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (!showAd && !isOverlayActive) {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      inactivityTimer.current = setTimeout(() => {
        setShowAd(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [showAd, isOverlayActive]);

  useEffect(() => {
    const fetchToggles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/toggles?company=${company}`
        );
        const data = response.data;
        setIsUnLockFromTabletOn(data.isToggleLockOn);
      } catch (error) {
        console.error("Error fetching toggles from DB:", error);
      }
    };

    fetchToggles();

    const interval = setInterval(fetchToggles, 10_000);
    return () => clearInterval(interval);
  }, [company]);

  useEffect(() => {
    const handleMouseActivity = () => resetInactivityTimer();

    window.addEventListener("mousemove", handleMouseActivity);
    window.addEventListener("mousedown", handleMouseActivity);

    inactivityTimer.current = setTimeout(() => {
      setShowAd(true);
    }, INACTIVITY_TIMEOUT);

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      window.removeEventListener("mousemove", handleMouseActivity);
      window.removeEventListener("mousedown", handleMouseActivity);
    };
  }, [resetInactivityTimer]);

  if (!company) {
    return <ErrorPage />;
  }

  // const handleCloseAd = () => {
  //   setShowAd(false);
  //   resetInactivityTimer();
  // };

  const handleCloseStartPage = () => {
    setShowStartPage(false);
  };

  return (
    <>
      {isUnLockFromTabletOn === false && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            pointerEvents: "all",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "24px",
          }}
        >
          Screen Locked
        </div>
      )}
      {showStartPage ? (
        <div onClick={handleCloseStartPage}>
          <StartPage />
        </div>
      ) : (
        <>
          <Header>
            <TableIndicator 
              selectedLanguage={selectedLanguage}
            />
            <RestaurantIndicator />
          </Header>
          {/* {showAd && 
            <AdPage 
              onClose={handleCloseAd} 
              selectedLanguage={selectedLanguage}
            />
          } */}
          <GridContainer>
            <Nav
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
              setIsOverlayActive={setIsOverlayActive}
              selectedLanguage={selectedLanguage}
            />
            <ProductListPage selectedCategory={selectedCategory} selectedLanguage={selectedLanguage} />
            <Cart 
              selectedLanguage={selectedLanguage}
            />
          </GridContainer>
          <Footer
            setIsOverlayActive={setIsOverlayActive}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </>
      )}
    </>
  );
};

export default TablePage;
