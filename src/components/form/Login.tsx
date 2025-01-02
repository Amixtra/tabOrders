import React, { useState } from "react";
import {
  LoginContainer,
  LoginForgotPassword,
  LoginHeader,
  LoginInput,
  LoginInputImg,
  LoginInputInputs,
  LoginInputs,
  LoginSubmit,
  LoginSubmitContainer,
  LoginTitle,
  BackgroundVideo,
  LoginLogo,
  FixedLogo,
} from "./Login.style";

const user_icon = "/assets/icon/icon_person.png";
const email_icon = "/assets/icon/icon_email.png";
const password_icon = "/assets/icon/icon_password.png";
const logo_path = "/assets/img/logo/tabOrder-logo-light.png"

const Login = () => {
  const [action, setAction] = useState("Login");

  return (
    <>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/assets/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>
      <FixedLogo src={logo_path} alt="Logo" />
      <LoginContainer>
        <LoginHeader>
          <LoginLogo src={logo_path} alt="Logo" />
          <LoginTitle>{action}</LoginTitle>
        </LoginHeader>
        <LoginInputs>
          <LoginInput>
            <LoginInputImg src={user_icon} alt="" />
            <LoginInputInputs type="text" placeholder="Username" />
          </LoginInput>
          { action === "Login" ? null :
            <LoginInput>
              <LoginInputImg src={email_icon} alt="" />
              <LoginInputInputs type="email" placeholder="Email" />
            </LoginInput>
          }
          <LoginInput>
            <LoginInputImg src={password_icon} alt="" />
            <LoginInputInputs type="password" placeholder="Password" />
          </LoginInput>
          { action === "Login" ? null :
            <LoginInput>
              <LoginInputImg src={password_icon} alt="" />
              <LoginInputInputs type="password" placeholder="Confirm Password" />
            </LoginInput>
          }
        </LoginInputs>
        <LoginForgotPassword>
          Forgot Password?
          <span className="forgot-password-span"> Click Here</span>
        </LoginForgotPassword>
        <LoginSubmitContainer>
        <LoginSubmit
          className={action === "Login" ? "submit-disabled" : ""}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </LoginSubmit>
        <LoginSubmit
          className={action === "Sign Up" ? "submit-disabled" : ""}
          onClick={() => setAction("Login")}
        >
          Login
        </LoginSubmit>
        </LoginSubmitContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
