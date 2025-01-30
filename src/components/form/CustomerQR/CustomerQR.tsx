import { useEffect, useState } from "react";
import {
  CustomerContainer,
  CustomerHeader,
  CustomerTitle,
  BackgroundVideo,
  CustomerLogo,
  FixedLogo,
  CustomerPinButton,
  GoBackButton,
} from "./CustomerQR.style";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router";

const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const CustomerQR = () => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => setQrCodeData(decodedText),
        (error) => setErrorMessage("Unable to scan the QR Code. Please try again.")
      )
      .catch((err) => console.error("QR Code Scan Error:", err));

    return () => {
      html5QrCode.stop().catch((err) => console.error("Stop failed:", err));
    };
  }, []);

  useEffect(() => {
    if (qrCodeData) {
      try {
        const url = new URL(qrCodeData);
        if (url.hostname === "localhost" && url.port === "3000" && url.pathname === "/tableSetting") {
          window.location.href = url.href;
        } else {
          setErrorMessage("tabOrders couldn't access external website.");
          setQrCodeData(null);
        }
      } catch (e) {
        setErrorMessage("tabOrders couldn't access external website.");
        setQrCodeData(null);
      }
    }
  }, [qrCodeData, navigate]);

  return (
    <>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/assets/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <a href="/login">
        <FixedLogo src={logo_path} alt="Logo" />
      </a>
      <CustomerContainer>
        <CustomerHeader>
          <CustomerLogo src={logo_path} alt="Logo" />
          <CustomerTitle>Scan QR Code</CustomerTitle>
        </CustomerHeader>
        <div
          style={{
            margin: "auto",
            marginTop: "40px",
            marginBottom: "20px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid #ccc",
          }}
        >
          <div id="reader" style={{ width: "100%", height: "300px" }}></div>
        </div>
      {errorMessage && (
        <div style={{ margin: "auto", color: "red", marginBottom: "20px" }}>
          {errorMessage}
        </div>
      )}
        <CustomerPinButton
          onClick={() => navigate("/login?input-pin", { state: { fromButton: true } })}
        >
              Input Pin Code
        </CustomerPinButton>
        <GoBackButton
              onClick = {() => navigate("/login")} 
            >
              Go Back
        </GoBackButton>
      </CustomerContainer>
    </>
  );
};

export default CustomerQR;
