import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WaiterPage from './WaiterPage';
import { LanguageCode } from 'db/constants';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #000;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Logo = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const PinContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const PinInput = styled.input`
  width: 45px;
  height: 45px;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 4px;
  margin: 0 4px;
  text-align: center;
  font-size: 1.25rem;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #ff0000;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
`;

const SubmitButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #ccc;
  }
`;

const GoBackButton = styled.button`
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #222;
  }
`;

interface WaiterPageProps {
  onClose: () => void;
  selectedLanguage: LanguageCode;
}

const WaiterPagePin: React.FC<WaiterPageProps> = ({ onClose, selectedLanguage }) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [proceedToWaiterPage, setproceedToWaiterPage] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (value: string, index: number) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly) {
      const newPin = [...pin];
      newPin[index] = value.slice(-1);
      setPin(newPin);
      
      if (digitsOnly && index < pin.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      const newPin = [...pin];
      newPin[index] = '';
      setPin(newPin);
    }
  };

  const handleSubmit = async () => {
    const enteredPin = pin.join('');
    try {
      const response = await axios.post(
        "http://43.200.251.48:8080/api/staff/check-staff-pin",
        { pin: enteredPin }
      );
  
      if (response.data && response.data.success) {
        setproceedToWaiterPage(true);
      } else {
        alert("Invalid staff PIN. Please try again.");
      }
    } catch (error) {
      console.error("Error checking staff PIN:", error);
      alert("Error checking staff PIN. Please try again.");
    }
  };

  const handleOverlayClose = () => {
    setproceedToWaiterPage(false);
    onClose();
  }

  if (proceedToWaiterPage) {
    return <WaiterPage
      setShowOrderHistory={handleOverlayClose}
      selectedLanguage={selectedLanguage}
    />;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <Logo>Waiter Page</Logo>
        <Title>Input Pin Code</Title>
        <PinContainer>
          {pin.map((digit, idx) => (
            <PinInput
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(e.target.value, idx)}
              ref={(el) => (inputRefs.current[idx] = el)}
            />
          ))}
        </PinContainer>
        <ButtonRow>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          <GoBackButton onClick={onClose}>Go Back</GoBackButton>
        </ButtonRow>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WaiterPagePin;
