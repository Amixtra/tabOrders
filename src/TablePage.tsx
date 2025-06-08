import React, { useState, useEffect, useCallback, useRef } from "react";
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
import Toast from "components/@share/Toast/Toast";
import { io } from "socket.io-client";

type OrderType = {
  orderNumber: string;
  userID: string;
  orderType: string;
  tableNumber: number;
  createdAt: string;
  confirmStatus: string;
  totalPrice: number;
  items: any[];
};

const INACTIVITY_TIMEOUT = 300000;

const socket = io("http://18.143.91.202:8080");

const TablePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showAd, setShowAd] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("en");
  const [isUnLockFromTabletOn, setIsUnLockFromTabletOn] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isToastActive, setIsToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [previousConfirmations, setPreviousConfirmations] = useState<string[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");
  const tableId = queryParams.get("tableId");
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (!isOverlayActive) {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
      inactivityTimer.current = setTimeout(() => {
        setShowAd(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [isOverlayActive]);

  const fetchTableOrders = useCallback(async () => {
    try {
      if (!company || !tableId) return;
      const userIdResponse = await axios.post("http://18.143.91.202:8080/api/get-userID", {
        companyID: company,
      });
      const userid = userIdResponse.data.userID;
      const response = await axios.get("http://18.143.91.202:8080/api/orders", {
        params: { userID: userid },
      });
      const tableNumber = parseInt(tableId || "0", 10);
      const filteredHistory = response.data.filter((order: OrderType) => order.tableNumber === tableNumber);
      setOrders((prev) => {
        const updated = filteredHistory as OrderType[];
        if (initialLoad) {
          const alreadyConfirmed = updated.filter((o) => o.confirmStatus === "Confirmed").map((o) => o.orderNumber);
          setPreviousConfirmations(alreadyConfirmed);
          setInitialLoad(false);
        } else {
          const newlyConfirmed = updated.filter(
            (ord) => ord.confirmStatus === "Confirmed" && !previousConfirmations.includes(ord.orderNumber)
          );
          if (newlyConfirmed.length > 0) {
            setToastMessage("Order has been Confirmed!");
            setIsToastActive(true);
            setPreviousConfirmations((p) => [...p, ...newlyConfirmed.map((n) => n.orderNumber)]);
          }
        }
        return updated;
      });
    } catch (error) {
      console.error("Error fetching table orders:", error);
    }
  }, [company, tableId, previousConfirmations, initialLoad]);

  useEffect(() => {
    const fetchToggles = async () => {
      try {
        if (!company) return;
        const r = await axios.get(`http://18.143.91.202:8080/api/toggles?company=${company}`);
        setIsUnLockFromTabletOn(r.data.isToggleLockOn);
      } catch (error) {
        console.error("Error fetching toggles:", error);
      }
    };
    fetchToggles();
    const i = setInterval(fetchToggles, 10000);
    return () => clearInterval(i);
  }, [company]);

  useEffect(() => {
    if (showStartPage) return;
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
  }, [resetInactivityTimer, showStartPage]);

  useEffect(() => {
    if (showStartPage) return;
    fetchTableOrders();
    const intervalId = setInterval(fetchTableOrders, 5000);
    return () => clearInterval(intervalId);
  }, [showStartPage, fetchTableOrders]);

  useEffect(() => {
    socket.on("paymentSuccess", (data: { tableNumber: number }) => {
      const currentTableNumber = parseInt(tableId || "0", 10);
      if (data.tableNumber === currentTableNumber) {
        window.location.reload();
      }
    });

    return () => {
      socket.off("paymentSuccess");
    };
  }, [tableId]);

  if (!company) return <ErrorPage />;

  const handleCloseAd = () => {
    setShowAd(false);
    setTimeout(() => setShowAd(false), 0);
    resetInactivityTimer();
  };

  const handleCloseStartPage = () => {
    setShowStartPage(false);
    resetInactivityTimer();
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
            <TableIndicator selectedLanguage={selectedLanguage} />
            <RestaurantIndicator />
          </Header>
          {showAd && <AdPage onClose={handleCloseAd} selectedLanguage={selectedLanguage} />}
          <GridContainer>
            <Nav
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
              setIsOverlayActive={setIsOverlayActive}
              selectedLanguage={selectedLanguage}
            />
            <ProductListPage selectedCategory={selectedCategory} selectedLanguage={selectedLanguage} />
            <Cart selectedLanguage={selectedLanguage} />
          </GridContainer>
          <Footer
            setIsOverlayActive={setIsOverlayActive}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </>
      )}
      <Toast message={toastMessage} isActive={isToastActive} setIsActive={setIsToastActive} />
    </>
  );
};

export default TablePage;
