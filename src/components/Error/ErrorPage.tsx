import {
  TableSettingContainer,
  TableSettingHeader,
  TableSettingTitle,
  BackgroundVideo,
  TableSettingLogo,
  FixedLogo,
  GoBackButton,
} from "./ErrorPage.style";
import { useNavigate } from "react-router";

const logo_path = "/assets/img/logo/tabOrder-logo-light.png";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <BackgroundVideo />
      <a href="/login">
        <FixedLogo src={logo_path} alt="Logo" />
      </a>
      <TableSettingContainer>
        <TableSettingHeader>
          <TableSettingTitle>Oops! Wrong Page</TableSettingTitle>
        </TableSettingHeader>
        <GoBackButton onClick={() => navigate("/login")}>Go Back to Login Page</GoBackButton>
      </TableSettingContainer>
    </>
  );
};

export default ErrorPage;