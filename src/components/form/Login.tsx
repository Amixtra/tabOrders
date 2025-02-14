import { useState, useEffect } from "react";
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
  PasswordError,
  PasswordHint,
  PasswordToggleIcon,
  CustomerContainer,
  CustomerQRButton,
} from "./Login.style";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Company from "./Company/Company";
import CustomerQR from "./CustomerQR/CustomerQR";
import InputPin from "./InputPin/InputPin";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

const user_icon = "/assets/icon/icon_person.png";
const email_icon = "/assets/icon/icon_email.png";
const password_icon = "/assets/icon/icon_password.png";
const logo_path = "/assets/img/logo/tabOrder-logo-light.png";
const eye_open_icon = "/assets/icon/eye_open_icon.png";
const eye_closed_icon = "/assets/icon/eye_close_icon.png";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [isTypingConfirmPassword, setIsTypingConfirmPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const hasCompany = searchParams.has("company");
  const hasCustomer = searchParams.has("customer-qr");
  const hasInputPin = searchParams.has("input-pin");
  const hasForgotten = searchParams.has("forgot-password");

  const fromButton = location.state?.fromButton === true;

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError(false);
    setShowPasswordHint(false);
    setIsTypingConfirmPassword(false);
  };
  
  useEffect(() => {
    resetForm();
  }, [action]);

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
  
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < exp * 1000;
    } catch (e) {
      console.error("Invalid token:", e);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenValid(token)) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (hasCustomer && fromButton) {
    return <CustomerQR />;
  };

  if (hasCompany && fromButton) {
    return <Company />;
  };

  if (hasInputPin && fromButton) {
    return <InputPin />;
  }

  if (hasForgotten && fromButton) {
    return <ForgotPassword />;
  }


  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^*(),._-])[^\s<>[\];&'"]{8,}$/;

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    if (usernameAvailable === null) {
      alert("Please check the Username Availability first.");
      return;
    }
  
    if (usernameAvailable === false) {
      alert("The chosen username is unavailable. Please select a different one.");
      return;
    }
  
    try {
      const emailCheckResponse = await axios.post("http://43.200.251.48:8080/api/check-email", { email });
      const { exists: emailExists } = emailCheckResponse.data;
      setEmailAvailable(!emailExists);
  
      if (emailExists) {
        return;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("Error checking email. Please try again.");
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
  
    try {
      await axios.post("http://43.200.251.48:8080/api/signup", {
        username,
        email,
        password,
      });
      navigate("/login?company", { state: { username, email, fromButton: true } });
    } catch (error) {
      console.error(error);
      alert("Error Registering user. Please try Again.");
    }
  };
    
  const checkUsername = async () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }
  
    setIsCheckingUsername(true);
    try {
      const response = await axios.post("http://43.200.251.48:8080/api/check-username", { username });
      const { exists } = response.data;
      setUsernameAvailable(!exists);
    } catch (error) {
      console.error(error);
      alert("Error checking username.");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setShowPasswordHint(!passwordRegex.test(value));
    if (action === "Sign Up" && confirmPassword !== value) {
      setPasswordError(isTypingConfirmPassword);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTypingConfirmPassword(true);
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError(password !== value);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both usernmae and password.");
      return;
    }
    try {
      const response = await axios.post("http://43.200.251.48:8080/api/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data?.error || error.message);
        alert(error.response?.data?.error || "Login failed. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
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
      <LoginContainer>
        <LoginHeader>
          <LoginLogo src={logo_path} alt="Logo" />
          <LoginTitle>{action}</LoginTitle>
        </LoginHeader>
        <LoginInputs>
          <LoginInput>
            <LoginInputImg src={user_icon} alt="" />
            <LoginInputInputs 
              type="text"
              placeholder="Username" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setUsernameAvailable(null);
              }}
            />
            {action === "Login" ? null :
            <button
              style={{
                marginRight: "20px",
                cursor: usernameAvailable === true ? "not-allowed" : "pointer",
                height: "25px",
                borderRadius: "16px",
                color: "white",
                backgroundColor: usernameAvailable === true ? "gray" : "black",
              }}
              onClick={checkUsername}
              disabled={isCheckingUsername || usernameAvailable === true}
            >
              Check
            </button>
            
            }
          </LoginInput>
          {usernameAvailable === true && 
          <div 
            style={{ 
              color: "green",
              marginLeft: "62px",
              marginTop: "-10px"
          }}>
            Username Available
          </div>}
          {usernameAvailable === false && 
          <div 
            style={{
               color: "red",
               marginLeft: "62px",
               marginTop: "-10px"
          }}>
            Username Already Exists
          </div>}
          {action === "Login" ? null :
            <LoginInput>
            <LoginInputImg src={email_icon} alt="" />
            <LoginInputInputs
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailAvailable(null);
              }}
            />
          </LoginInput>}
          {emailAvailable === true && (
            <div
              style={{
                color: "green",
                marginLeft: "62px",
                marginTop: "-10px",
              }}
            >
              Email Available
            </div>
          )}
          {emailAvailable === false && (
            <div
              style={{
                color: "red",
                marginLeft: "62px",
                marginTop: "-10px",
              }}
            >
              Email Already Registered
            </div>)}
          <LoginInput>
            <LoginInputImg src={password_icon} alt="" />
            <LoginInputInputs
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <PasswordToggleIcon
              src={showPassword ? eye_open_icon : eye_closed_icon}
              alt="Toggle Password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </LoginInput>
          {action === "Sign Up" && showPasswordHint && (
            <PasswordHint>
              Password must be at least 8 characters, include a number, a special character, 
              and exclude {"<"}, {">"}, [, ], ;, &, ', or ".
            </PasswordHint>
          )}
          {action === "Login" ? null : (
            <>
              <LoginInput>
                <LoginInputImg src={password_icon} alt="" />
                <LoginInputInputs
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <PasswordToggleIcon
                  src={showConfirmPassword ? eye_open_icon : eye_closed_icon}
                  alt="Toggle Password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </LoginInput>
              {passwordError && isTypingConfirmPassword && (
                <PasswordError>Password Does Not Match</PasswordError>
              )}
            </>
          )}
        </LoginInputs>
        {action === "Sign Up" ? null :
        <LoginForgotPassword>
          Forgot Password?
          <span>&nbsp;</span>
          <span 
            className="forgot-password-span"
            onClick={() => navigate("/login?forgot-password", { state: { fromButton: true } })}
          > 
          Click Here
          </span>
        </LoginForgotPassword>
        }
        <LoginSubmitContainer>
          {action === "Sign Up" ? (
            <LoginSubmit onClick={handleSignUp}>Sign Up</LoginSubmit>
          ) : (
            <LoginSubmit className={"submit-disabled"} onClick={() => setAction("Sign Up")}>Sign Up</LoginSubmit>
          )}
          {action === "Login" ? (
            <LoginSubmit onClick={handleLogin}>Login</LoginSubmit>
          ) : (
            <LoginSubmit className={"submit-disabled"} onClick={() => setAction("Login")}>Login</LoginSubmit>
          )}
        </LoginSubmitContainer>
        <CustomerContainer>
          <CustomerQRButton
            onClick = {() => navigate("/login?customer-qr", { state: { fromButton: true } })} 
          >
            QR Scan
          </CustomerQRButton>
        </CustomerContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
