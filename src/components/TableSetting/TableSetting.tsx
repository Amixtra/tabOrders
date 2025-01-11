import { useEffect, useState } from "react";
import {
  TableSettingContainer,
  TableSettingHeader,
  TableSettingSubmit,
  TableSettingSubmitContainer,
  TableSettingTitle,
  BackgroundVideo,
  TableSettingLogo,
  FixedLogo,
  TableSettingField,
  TableSettingSection,
  GoBackButton,
} from "./TableSetting.style";
import { useLocation, useNavigate } from "react-router";
import ErrorPage from "components/Error/ErrorPage";

const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const TableSetting = () => {
  const [tableId, setTableId] = useState("");
  const [company, setCompany] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const userID = queryParams.get("userID");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID) {
      const fetchCompany = async () => {
        try { 
          const response = await fetch("http://localhost:8080/api/get-company", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID }),
          });
          const data = await response.json();
          if (response.ok) {
            setCompany(data.companyID);
          } else {
            console.error("Error fetching company:", data.error);
          }
        } catch (error) {
          console.error("Error fetching company:", error);
        }
      };
      fetchCompany();
    }
  }, [userID]);

  if (!userID) {
    return <ErrorPage />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTableId(value);
    }
  };

  const handleSubmit = () => {
    if (tableId) {
      navigate(`/table?company=${company}&tableId=${tableId}`);
    } else {
      alert("Please input a valid table number.");
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
      <TableSettingContainer>
        <TableSettingHeader>
          <TableSettingLogo src={logo_path} alt="Logo" />
          <TableSettingTitle>Input Table Number</TableSettingTitle>
        </TableSettingHeader>
        <TableSettingField>
            <TableSettingSection
              type="text"
              maxLength={3}
              value={tableId}
              onChange={handleInputChange}
              placeholder="0"
            />
        </TableSettingField>
        <TableSettingSubmitContainer>
          <TableSettingSubmit onClick={handleSubmit}>Save Table Number</TableSettingSubmit>
        </TableSettingSubmitContainer>
        <GoBackButton onClick={() => navigate("/login")}>Cancel</GoBackButton>
      </TableSettingContainer>
    </>
  );
};

export default TableSetting;