import { useState, useEffect, useCallback } from "react";
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

const INACTIVITY_TIMEOUT = 90000;

const TablePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  let inactivityTimer: ReturnType<typeof setTimeout>;

  const resetInactivityTimer = useCallback(() => {
    if (!showAd && !isOverlayActive) {
      console.log("Mouse moved! Reset timer.");
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        console.log("Mouse hasn't moved for 90 seconds. Show Ad.");
        setShowAd(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [showAd, isOverlayActive]);

  useEffect(() => {
    const handleMouseActivity = () => resetInactivityTimer();

    window.addEventListener("mousemove", handleMouseActivity);
    window.addEventListener("mousedown", handleMouseActivity);

    inactivityTimer = setTimeout(() => {
      console.log("Mouse hasn't moved for 90 seconds. Show Ad.");
      setShowAd(true);
    }, INACTIVITY_TIMEOUT);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleMouseActivity);
      window.removeEventListener("mousedown", handleMouseActivity);
    };
  }, [resetInactivityTimer]);

  const handleCloseAd = () => {
    console.log("Ad closed.");
    setShowAd(false);
    resetInactivityTimer();
  };

  const handleCloseStartPage = () => {
    console.log("StartPage closed.");
    setShowStartPage(false);
  };

  return (
    <>
      {/* {showStartPage ? (
        <div onClick={handleCloseStartPage}>
          <StartPage />
        </div>
      ) : ( */}
        <>
          <Header>
            <TableIndicator />
            <RestaurantIndicator />
          </Header>
          {/* {showAd && <AdPage onClose={handleCloseAd} />} */}
          <GridContainer>
            <Nav
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
              setIsOverlayActive={setIsOverlayActive}
            />
            <ProductListPage selectedCategory={selectedCategory} />
            <Cart />
          </GridContainer>
          <Footer setIsOverlayActive={setIsOverlayActive} />
        </>
      {/* )} */}
    </>
  );
};

export default TablePage;
