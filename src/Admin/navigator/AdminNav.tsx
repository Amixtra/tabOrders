import { useState, useEffect } from "react";
import StyledNav, {
  StyledNavContent,
  StyledNavLogo,
  StyledNavSectionButton,
  StyledNavWaiterButton,
  StyledNavSectionContainer,
  StyledToggleSection,
  StyledToggleButton,
  BottomButtonsContainer,
} from "./AdminNav.styles";
import { logoSources } from "db/constants";
import { FaSyncAlt } from "react-icons/fa";
import axios from "axios";
import { AdminLogoutButton } from "Admin/Admin.style";
import { useNavigate } from "react-router-dom";
import PALETTE from "constants/palette";

interface ToggleUpdateFields {
  isToggleOrderOn?: boolean;
  isToggleLockOn?: boolean;
  isToggleMuteOn?: boolean;
  isToggleCounterOn?: boolean;
}

interface NavProps {
  setSelectedSection: (section: string) => void;
  selectedSection: string;
}

const Nav: React.FC<NavProps> = ({ setSelectedSection, selectedSection }) => {
  const [isToggleOrderOn, setIsToggleOrderOn] = useState(true);
  const [isToggleLockOn, setIsToggleLockOn] = useState(true);
  const [isToggleMuteOn, setIsToggleMuteOn] = useState(true);
  const [isToggleCounterOn, setIsToggleCounterOn] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

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

  useEffect(() => {
    const decoded = getTokenData();
    if (decoded && decoded.userId) {
      setUserID(decoded.userId);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      const fetchCompany = async () => {
        try { 
          const response = await fetch("http://43.200.251.48:8080/api/get-company", {
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

  useEffect(() => {
    if (company) {
      const getToggles = async () => {
        try {
          const response = await axios.get(
            `http://43.200.251.48:8080/api/toggles?company=${company}`
          );
          const data = response.data;
          setIsToggleOrderOn(data.isToggleOrderOn);
          setIsToggleLockOn(data.isToggleLockOn);
          setIsToggleMuteOn(data.isToggleMuteOn);
          setIsToggleCounterOn(data.isToggleCounterOn);
        } catch (error) {
          console.error("Error fetching toggles:", error);
        }
      };
      getToggles();
    }
  }, [company]);

  const handleToggleOrder = (newValue: boolean) => {
    setIsToggleOrderOn(newValue);
    updateTogglesInDB({ isToggleOrderOn: newValue });
  };

  const handleToggleLock = (newValue: boolean) => {
    setIsToggleLockOn(newValue);
    updateTogglesInDB({ isToggleLockOn: newValue });
  };

  const handleToggleVolume = (newValue: boolean) => {
    setIsToggleMuteOn(newValue);
    updateTogglesInDB({ isToggleMuteOn: newValue });
  };

  const handleToggleCounter = (newValue: boolean) => {
    setIsToggleCounterOn(newValue);
    updateTogglesInDB({ isToggleCounterOn: newValue });
  };

  const updateTogglesInDB = async (updateFields: ToggleUpdateFields) => {
    try {
      await axios.post("http://43.200.251.48:8080/api/toggles", {
        company,
        ...updateFields,
      });
    } catch (error) {
      console.error("Error updating toggles in DB:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <StyledNav>
      <StyledNavContent>
        <StyledNavLogo>
          <img
            src={logoSources.defaultLight}
            alt="TabOrders Logo"
            style={{ width: "70%", borderRadius: "10px" }}
          />
        </StyledNavLogo>
        <StyledNavSectionContainer>
          <StyledNavSectionButton 
            onClick={() => setSelectedSection("qr-pin")}
            style={{ backgroundColor: selectedSection === "qr-pin" ? "red": "#111"}}
          >
            QR & PIN Code
          </StyledNavSectionButton>
          <StyledNavSectionButton 
            onClick={() => setSelectedSection("order")}
            style={{ backgroundColor: selectedSection === "order" ? "red": "#111"}}  
            >
            Orders
          </StyledNavSectionButton>
          <StyledNavSectionButton 
            onClick={() => setSelectedSection("bill-out")}
            style={{ backgroundColor: selectedSection === "bill-out" ? "red": "#111"}}  
            >
            Bill Out
          </StyledNavSectionButton>
          <StyledNavSectionButton
            onClick={() => setSelectedSection("menu-options")}
            style={{ backgroundColor: selectedSection === "menu-options" ? "red": "#111"}}  
          >
            Menu Options
          </StyledNavSectionButton>
          <StyledNavSectionButton
            onClick={() => setSelectedSection("waiter-options")}
            style={{ backgroundColor: selectedSection === "waiter-options" ? "red": "#111"}}  
          >
            Waiter Options
          </StyledNavSectionButton>
        </StyledNavSectionContainer>

        <StyledToggleSection>
          <h4>Order from Tablet</h4>
          <div className="on-off-container">
            <StyledToggleButton
              active={!isToggleOrderOn}
              onClick={() => handleToggleOrder(false)}
            >
              Disable
            </StyledToggleButton>
            <StyledToggleButton
              active={isToggleOrderOn}
              onClick={() => handleToggleOrder(true)}
            >
              Allow
            </StyledToggleButton>
          </div>
        </StyledToggleSection>

        <StyledToggleSection>
          <h4>Lock Tablet</h4>
          <div className="on-off-container">
            <StyledToggleButton
              active={!isToggleLockOn}
              onClick={() => handleToggleLock(false)}
            >
              Lock
            </StyledToggleButton>
            <StyledToggleButton
              active={isToggleLockOn}
              onClick={() => handleToggleLock(true)}
            >
              Unlock
            </StyledToggleButton>
          </div>
        </StyledToggleSection>

        <StyledToggleSection>
          <h4>Volume</h4>
          <div className="on-off-container">
            <StyledToggleButton
              active={!isToggleMuteOn}
              onClick={() => handleToggleVolume(false)}
            >
              Mute
            </StyledToggleButton>
            <StyledToggleButton
              active={isToggleMuteOn}
              onClick={() => handleToggleVolume(true)}
            >
              Unmute
            </StyledToggleButton>
          </div>
        </StyledToggleSection>
        
        <StyledToggleSection>
          <h4>Payment Option</h4>
          <div className="on-off-container">
            <StyledToggleButton
              active={!isToggleCounterOn}
              onClick={() => handleToggleCounter(false)}
            >
              Table
            </StyledToggleButton>
            <StyledToggleButton
              active={isToggleCounterOn}
              onClick={() => handleToggleCounter(true)}
            >
              Counter
            </StyledToggleButton>
          </div>
        </StyledToggleSection>
      </StyledNavContent>
      <BottomButtonsContainer>
        <StyledNavWaiterButton onClick={handleRefresh}>
          Refresh <FaSyncAlt style={{ marginLeft: "5px", fontSize: "16px" }} />
        </StyledNavWaiterButton>
        <AdminLogoutButton onClick={handleLogoutClick}>
          Logout
        </AdminLogoutButton>
      </BottomButtonsContainer>
      {showLogoutModal && (
        <div 
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
        >
          <div 
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <h2 style={{ fontSize: "30px", fontWeight: "900"}}>Confirm Logout</h2>
            <p style={{ fontSize: "25px", marginTop: "10px"}}>Do you really wish to logout?</p>
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={handleCancelLogout}
                style={{ 
                  padding: "24px 36px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: `${PALETTE.GREY400}`,
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "900",
                  color: `${PALETTE.WHITE}`
                }}
              >
                No
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  marginLeft: "1rem",
                  padding: "24px 36px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundColor: `${PALETTE.MAIN}`,
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "900",
                  color: `${PALETTE.WHITE}`
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </StyledNav>
  );
};

export default Nav;
