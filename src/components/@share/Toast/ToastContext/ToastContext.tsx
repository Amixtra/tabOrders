import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ToastContextValue {
  message: string;
  freezeScreen: boolean;
  showToast: (msg: string, freeze?: boolean) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextValue>({
  message: "",
  freezeScreen: false,
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [freezeScreen, setFreezeScreen] = useState(false);

  const showToast = (msg: string, freeze = false) => {
    console.log("showToast called:", msg, freeze);
    setMessage(msg);
    setFreezeScreen(freeze);
  };

  const hideToast = () => {
    console.log("hideToast called");
    setMessage("");
    setFreezeScreen(false);
  };

  useEffect(() => {
    console.log("Toast message state changed:", message);
  }, [message]);

  return (
    <ToastContext.Provider value={{ message, freezeScreen, showToast, hideToast }}>
      {children}

      {message && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
          {freezeScreen && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9998,
                pointerEvents: "auto",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              zIndex: 9999,
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            <p>{message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
