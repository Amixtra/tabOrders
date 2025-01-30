import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "./Company.style";
import axios from "axios";

const company_icon = "/assets/icon/icon_company.png";
const details_icon = "/assets/icon/icon_details.png"
const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const Company = () => {
  const { state } = useLocation();
  const { username } = state || {};
  const [company, setCompany] = useState("");
  const [companyFull, setCompanyFull] = useState("");
  const [companyAvailable, setCompanyAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleFinishSetUp = async () => {
    if (companyAvailable === null) {
        alert("Please check the Company Availability first.");
        return;
    }
    if (!company) {
      alert("Please enter a company name.");
      return;
    }

    if (!companyFull) {
      alert("Please enter your company's full details");
      return;
    }
  
    try {
      await axios.post("http://localhost:8080/api/company", { username, company, companyFull });
      alert("User setup Complete!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error Registering company. Please try Again.");
    }
  };

  const checkCompany = async () => {
    if (!company || !companyFull) {
      alert("Please enter both the Company Name and Full Details.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/api/check-company", {
        company,
        companyFull,
      });
      const { exists } = response.data;
      setCompanyAvailable(!exists);
    } catch (error) {
      console.error("Error checking company:", error);
      alert("Error checking company. Please try again.");
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
          <CompanyTitle>Set Up Company</CompanyTitle>
        </CompanyHeader>
        <CompanyInputs>
          <CompanyInput>
            <CompanyInputImg src={company_icon} alt="" />
            <CompanyInputInputs 
              type="text"
              placeholder="Company Name (e.g Amixtra)"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setCompanyAvailable(null); 
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
                setCompanyAvailable(null); 
              }}
            />
            <button
                style={{
                    marginRight: "20px",
                    cursor: companyAvailable === null ? "pointer" : "not-allowed",
                    height: "25px",
                    borderRadius: "16px",
                    color: "white",
                    backgroundColor: companyAvailable === null ? "black" : companyAvailable ? "green" : "red",
                }}
                onClick={checkCompany}
                >
                Check
            </button>
          </CompanyInput>
          {companyAvailable === true && (
            <div style={{ color: "green", marginTop: "-10px", marginLeft: "62px" }}>
                Company is Available
            </div>
            )}
            {companyAvailable === false && (
            <div style={{ color: "red", marginTop: "-10px", marginLeft: "62px" }}>
                Company is Already Taken
            </div>
          )}
        </CompanyInputs>
        <CompanySubmitContainer>
          <CompanySubmit onClick={handleFinishSetUp}>
            Finish Sign Up
          </CompanySubmit>
        </CompanySubmitContainer>
      </CompanyContainer>
    </>
  );
};

export default Company;