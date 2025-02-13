import React from 'react';
import { StyledModal } from './BillOut.style';
import { 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaMobileAlt 
} from 'react-icons/fa'; 

const BillOut = () => {
  return (
    <StyledModal>
      <div className="modal-content">
        <h2>Select Payment Method</h2>
        <div className="button-group">
          {/* Debit Card */}
          <button className="payment-button">
            <FaCreditCard className="icon" />
            Debit Card
          </button>

          {/* Credit Card */}
          <button className="payment-button">
            <FaCreditCard className="icon" />
            Credit Card
          </button>

          {/* Cash */}
          <button className="payment-button">
            <FaMoneyBillWave className="icon" />
            Cash
          </button>

          {/* GCash */}
          <button className="payment-button">
            <FaMobileAlt className="icon" />
            GCash
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default BillOut;
