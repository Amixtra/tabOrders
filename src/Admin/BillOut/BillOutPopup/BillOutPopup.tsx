import React, { useState, useEffect, useRef } from "react";
import { StyledModal } from "./BillOutPopup.style";
import { FaCreditCard, FaTimes } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import CashModal from "./CashModal/CashModal";
import axios from "axios";
import { io } from "socket.io-client";

interface BillOutProps {
  isOpen: boolean;
  onClose: () => void;
  userID: string;
  tableNumber: number;
}

const socket = io("https://tab-order-server.vercel.app");

const BillOutPopUp: React.FC<BillOutProps> = ({ isOpen, onClose, userID, tableNumber }) => {
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!isOpen) return null;

  const handlePayment = async (paymentMethod: string) => {
    try {
      const response = await axios.post("https://tab-order-server.vercel.app/api/orders/pay", {
        userID,
        tableNumber,
        paymentType: paymentMethod,
      });
      console.log("Payment processed:", response.data);
      socket.emit("paymentSuccess", { tableNumber });
      onClose();
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  const handleOpenCashModal = () => {
    setIsCashModalOpen(true);
    handlePayment("Cash");
  };

  const handleCloseCashModal = () => {
    setIsCashModalOpen(false);
    onClose();
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
            <button className="payment-button" onClick={() => handlePayment("Debit Card")}>
              <FaCreditCard className="icon" />
              Debit Card
            </button>
            <button className="payment-button" onClick={() => handlePayment("Credit Card")}>
              <FaCreditCard className="icon" />
              Credit Card
            </button>
            <button className="payment-button" onClick={handleOpenCashModal}>
              <TbCurrencyPeso className="icon-peso" />
              Cash
            </button>
            <button className="payment-button" onClick={() => handlePayment("GCash")}>
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
                  d="M145.315 66.564a6 6 0 0 0-10.815 5.2l10.815-5.2ZM134.5 120.235a6 6 0 0 0 10.815 5.201l-10.815-5.201Zm-16.26-68.552a6 6 0 1 0 7.344-9.49l-7.344 9.49Zm7.344 98.124a6 6 0 0 0-7.344-9.49l7.344 9.49ZM84 152c-30.928 0-56-25.072-56-56H16c0 37.555 30.445 68 68 68v-12ZM28 96c0-30.928 25.072-56 56-56V28c-37.555 0-68 30.445-68 68h12Zm106.5-24.235C138.023 79.09 140 87.306 140 96h12c0-10.532-2.399-20.522-6.685-29.436l-10.815 5.2ZM140 96c0 8.694-1.977 16.909-5.5 24.235l10.815 5.201C149.601 116.522 152 106.532 152 96h-12ZM84 40c12.903 0 24.772 4.357 34.24 11.683l7.344-9.49A67.733 67.733 0 0 0 84 28v12Zm34.24 100.317C108.772 147.643 96.903 152 84 152v12a67.733 67.733 0 0 0 41.584-14.193l-7.344-9.49Z"
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
      <CashModal isOpen={isCashModalOpen} onClose={handleCloseCashModal} />
    </>
  );
};

export default BillOutPopUp;
