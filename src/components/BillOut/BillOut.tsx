import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { StyledModal } from "./BillOut.style";
import { FaCreditCard, FaTimes } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import CashModal from "./CashModal/CashModal";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://43.200.251.48:8080");

interface BillOutProps {
  isOpen: boolean;
  onClose: () => void;
  isToggleCounterOn: boolean;
  showToast: (msg: string, persistent?: boolean) => void;
}

const BillOut: React.FC<BillOutProps> = ({
  isOpen,
  onClose,
  isToggleCounterOn,
  showToast,
}) => {
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");
  const company = searchParams.get("company");
  const isMounted = useRef(true);
  const [isScreenLocked, setIsScreenLocked] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!isOpen) return null;

  const handleOpenCashModal = () => {
    setIsCashModalOpen(true);
  };

  const handleCloseCashModal = () => {
    setIsCashModalOpen(false);
    onClose();
  };

  const handleNonCashPayment = async (paymentType: string, cashAmount?: number) => {
    try {
      const userIdResponse = await axios.post(
        "http://43.200.251.48:8080/api/get-userID",
        { companyID: company }
      );
      if (!isMounted.current) return;
      const userID = userIdResponse.data.userID;
      const tableNumber = id;
      const response = await axios.get(
        "http://43.200.251.48:8080/api/order-history",
        { params: { userID, tableNumber } }
      );
      if (!isMounted.current) return;
      const data = response.data;
      if (Array.isArray(data) && data.length === 0) {
        showToast("No Order Placed. Please Order First!", false);
      } else {
        if (isToggleCounterOn) {
          showToast("Please Proceed to the Counter for Payment.");
        } else {
          showToast("Please Wait for the Waiter for Payment.");
        }
        setIsScreenLocked(true);
      }
    } catch (error) {
      if (isMounted.current) {
        showToast("Error fetching order history");
      }
    }
    onClose();
    socket.emit("customerBillOut", { tableId: id, company, paymentType, cashAmount });
  };

  const handleNonCashClick = (type: string) => {
    handleNonCashPayment(type);
  };

  const handleCashPayment = (cashAmount: number) => {
    handleNonCashPayment("Cash", cashAmount);
  };

  return (
    <>
      <StyledModal>
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2>Select Payment Method</h2>
          <div className="button-group">
            <button className="payment-button" onClick={() => handleNonCashClick("Debit Card")}>
              <FaCreditCard className="icon" />
              Debit Card
            </button>
            <button className="payment-button" onClick={() => handleNonCashClick("Credit Card")}>
              <FaCreditCard className="icon" />
              Credit Card
            </button>
            <button className="payment-button" onClick={handleOpenCashModal}>
              <TbCurrencyPeso className="icon-peso" />
              Cash
            </button>
            <button className="payment-button" onClick={() => handleNonCashClick("GCash")}>
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="12"
                  d="M84 96h36c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36c9.941 0 18.941 4.03 25.456 10.544"
                />
                <path
                  fill="#000000"
                  d="M145.315 66.564a6 6 0 0 0-10.815 5.2l10.815-5.2ZM134.5 120.235a6 6 0 0 0 10.815 5.201l-10.815-5.201Zm-16.26-68.552a6 6 0 1 0 7.344-9.49l-7.344 9.49Zm7.344 98.124a6 6 0 0 0-7.344-9.49l7.344 9.49ZM84 152c-30.928 0-56-25.072-56-56H16c0 37.555 30.445 68 68 68v-12ZM28 96c0-30.928 25.072-56 56-56V28c-37.555 0-68 30.445-68 68h12Zm106.5-24.235C138.023 79.09 140 87.306 140 96h12c0-10.532-2.399-20.522-6.685-29.436l-10.815 5.2ZM140 96c0 8.694-1.977 16.909-5.5 24.235l10.815 5.201C149.601 116.522 152 106.532 152 96h-12ZM84 40c12.903 0 24.772 4.357 34.24 11.683l7.344-9.49A67.733 67.733 0 0 0 84 28v12Zm34.24 100.317C108.772 147.643 96.903 152 84 152v-12a67.733 67.733 0 0 0 41.584-14.193l-7.344-9.49Z"
                />
                <path
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="12"
                  d="M161.549 58.776C166.965 70.04 170 82.666 170 96c0 13.334-3.035 25.96-8.451 37.223"
                />
              </svg>
              GCash
            </button>
          </div>
        </div>
      </StyledModal>
      <CashModal
        isOpen={isCashModalOpen}
        onClose={handleCloseCashModal}
        onSubmitCash={handleCashPayment}
      />
      {isScreenLocked && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 10000,
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
    </>
  );
};

export default BillOut;
