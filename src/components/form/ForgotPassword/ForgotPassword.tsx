import { useState } from "react";
import {
  CompanyContainer,
  CompanyHeader,
  CompanyInput,
  CompanyInputImg,
  CompanyInputInputs,
  CompanyInputs,
  CompanySubmit,
  CompanySubmitContainer,
  CompanyTitle,
  BackgroundVideo,
  CompanyLogo,
  FixedLogo,
  GoBackButton,
} from "./ForgotPassword.style";
import { useNavigate } from "react-router-dom";

const email_icon = "/assets/icon/icon_email.png";
const user_icon = "/assets/icon/icon_person.png";
const company_icon = "/assets/icon/icon_company.png";
const details_icon = "/assets/icon/icon_details.png"
const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyFull, setCompanyFull] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!username || !email || !company || !companyFull) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, company, companyFull }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert(data.error || "Failed to send email.");
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/assets/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <a href="/login">
        <FixedLogo src={logo_path} alt="Logo" />
      </a>
      <CompanyContainer>
        <CompanyHeader>
          <CompanyLogo src={logo_path} alt="Logo" />
          <CompanyTitle>Forgot Password?</CompanyTitle>
        </CompanyHeader>
        <CompanyInputs>
          <CompanyInput>
            <CompanyInputImg src={user_icon} alt="" />
            <CompanyInputInputs 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </CompanyInput>
          <CompanyInput>
            <CompanyInputImg src={email_icon} alt="" />
            <CompanyInputInputs 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </CompanyInput>
          <CompanyInput>
            <CompanyInputImg src={company_icon} alt="" />
            <CompanyInputInputs 
              type="text"
              placeholder="Company Name (e.g Amixtra)"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
          </CompanyInput>
          <CompanyInput>
            <CompanyInputImg src={details_icon} alt="" />
            <CompanyInputInputs 
              type="text"
              placeholder="Company Details (e.g Amixtra Davao Branch)"
              value={companyFull}
              onChange={(e) => {
                setCompanyFull(e.target.value);
              }}
            />
          </CompanyInput>
        </CompanyInputs>
        <CompanySubmitContainer>
          <CompanySubmit onClick={handleSubmit}>
            Submit
          </CompanySubmit>
        </CompanySubmitContainer>
        <GoBackButton
            onClick = {() => navigate("/login")} 
          >
            Go Back
      </GoBackButton>
      </CompanyContainer>
    </>
  );
};

export default ForgotPassword;