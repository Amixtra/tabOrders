import { useRef, useState } from "react";
import {
  InputPinContainer,
  InputPinHeader,
  InputPinSubmit,
  InputPinSubmitContainer,
  InputPinTitle,
  BackgroundVideo,
  InputPinLogo,
  FixedLogo,
  InputPinField,
  InputPinSection,
  GoBackButton,
} from "./InputPin.style";
import { useNavigate } from "react-router";

const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const InputPin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setErrorMessage(null);
    const { value } = e.target;
    e.target.value = value ? value[0] : "";
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    [...pasteData].forEach((char, i) => {
      const inputIndex = index + i;
      if (inputIndex < 6 && inputRefs.current[inputIndex]) {
        inputRefs.current[inputIndex]!.value = char;
      }
    });
    const lastIndex = Math.min(index + pasteData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async () => {
    const pinDigits = inputRefs.current.map((el) => el?.value).join("");
    if (pinDigits.length !== 6) {
      setErrorMessage("Please enter a 6-digit PIN code.");
      return;
    }

    try {
      const response = await fetch("https://tab-order-server.vercel.app/api/check-userid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinDigits }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/tableSetting?userID=${data.userID}`);
      } else {
        setErrorMessage(data.error || "Unable to verify PIN. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/assets/video/background.mp4" type="video/mp4" />
      </BackgroundVideo>
      <a href="/login">
        <FixedLogo src={logo_path} alt="Logo" />
      </a>
      <InputPinContainer>
        <InputPinHeader>
          <InputPinLogo src={logo_path} alt="Logo" />
          <InputPinTitle>Input Pin Code</InputPinTitle>
        </InputPinHeader>
        <InputPinField>
          {[...Array(6)].map((_, idx) => (
            <InputPinSection
              key={idx}
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[idx] = el)}
              onChange={(e) => handleChange(e, idx)}
              onKeyUp={(e) => handleKeyUp(e, idx)}
              onPaste={(e) => handleOnPaste(e, idx)}
            />
          ))}
        </InputPinField>
        {errorMessage && (
          <div style={{ margin: "auto", color: "red", marginTop: "20px" }}>
            {errorMessage}
          </div>
        )}
        <InputPinSubmitContainer>
          <InputPinSubmit onClick={handleSubmit}>Submit</InputPinSubmit>
        </InputPinSubmitContainer>
        <GoBackButton onClick={() => navigate("/login")}>Go Back</GoBackButton>
      </InputPinContainer>
    </>
  );
};

export default InputPin;
