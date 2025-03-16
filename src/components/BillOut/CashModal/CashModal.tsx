import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NumericFormat } from "react-number-format";

interface CashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCash: (cashValue: number) => void;
}

const CashModal: React.FC<CashModalProps> = ({ isOpen, onClose, onSubmitCash }) => {
  const [cashValue, setCashValue] = useState<number>(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmitCash(cashValue);
    onClose();
  };

  return (
    <Overlay>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Enter Cash Amount</h2>
        <NumericFormat
          value={cashValue === 0 ? "" : cashValue}
          onValueChange={(values) => {
            const { floatValue } = values;
            setCashValue(floatValue || 0);
          }}
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          allowLeadingZeros={false}
          prefix="₱ "
          placeholder="₱ 0.00"
          className="cash-input"
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Overlay>
  );
};

export default CashModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .modal-content {
    position: relative;
    background: #fff;
    padding: 2.5rem;
    border-radius: 8px;
    text-align: center;
    width: 90vw;
    max-width: 700px;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
  }

  .cash-input {
    font-size: 2.25rem;
    padding: 0.5rem;
    width: 100%;
    height: 100px;
    margin-bottom: 1.5rem;
    text-align: center;
    border-radius: 8px;
  }

  .submit-button {
    font-size: 2.25rem;
    padding: 1.5rem 2rem;
    border-radius: 8px;
    cursor: pointer;
  }
`;
