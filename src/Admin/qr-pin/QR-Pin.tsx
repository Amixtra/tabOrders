import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  InputPinField, 
  InputPinSection, 
  PinSection, 
  QRCode, 
  QRContainer, 
  QRTitle, 
  TimerContainer, 
  TimerText, 
  RefreshIcon 
} from './QR-Pin.style';
import { LuRefreshCw } from "react-icons/lu";

const getTokenData = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    } else {
      console.warn("No token found in localStorage.");
      return null;
    }
};

const generateNewQRValue = () => {
    const tokenData = getTokenData();
    return tokenData 
      ? `http://localhost:3000/tableSetting?userID=${tokenData.userId}&token=${Math.random().toString(36).substr(2, 10)}`
      : "";
};

const QRPin = () => {
  const [qrValue, setQrValue] = useState(generateNewQRValue());
  const [timeLeft, setTimeLeft] = useState(120);
  const [showPin, setShowPin] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [isQRVisible, setIsQRVisible] = useState(false);

  useEffect(() => {
    const decoded = getTokenData();
    if (decoded && decoded.userId) {
      setPinCode(decoded.userId.slice(0, 6));
    }
  }, []);

  useEffect(() => {
    if (!isQRVisible) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          setQrValue(generateNewQRValue());
          setIsQRVisible(false);
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQRVisible]);

  const handleRevealQR = () => {
    setIsQRVisible(true);
  };

  const handleRefresh = () => {
    setQrValue(generateNewQRValue());
    setTimeLeft(120);
    setIsQRVisible(false);
  };

  return (
    <QRContainer>
      <QRTitle>This is your QR Code</QRTitle>
      <QRCode onClick={handleRevealQR} style={{ filter: isQRVisible ? "none" : "blur(5px)", cursor: "pointer" }}>
        <QRCodeSVG 
          value={qrValue} 
          size={320}
          fgColor="#000000"
          level="H"
          style={{ border: "10px solid #ffffff", borderRadius: "20px" }}
        />
      </QRCode>
      {isQRVisible && (
        <TimerContainer>
          <TimerText>New QR Code in: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</TimerText>
          <RefreshIcon onClick={handleRefresh}>
              <LuRefreshCw />
          </RefreshIcon>
        </TimerContainer>
      )}
      <PinSection style={{ marginTop: isQRVisible ? "0px" : "10px" }}>
        <h2>This is your Pin Code</h2>
        <InputPinField>
          {pinCode.split("").map((char, idx) => (
            <InputPinSection
              key={idx}
              type="text"
              value={char}
              readOnly
              className={showPin ? "visible" : "blurred"}
              onClick={() => setShowPin(true)}
            />
          ))}
        </InputPinField>
      </PinSection>
    </QRContainer>
  );
};

export default QRPin;
