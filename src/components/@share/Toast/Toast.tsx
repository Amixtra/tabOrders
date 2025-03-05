import { Dispatch, SetStateAction, useEffect } from "react";
import StyledToast from "./Toast.style";

interface ToastProps {
  message?: string;
  isActive?: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  persistent?: boolean;
}

const Toast = ({ message, isActive, setIsActive, persistent = false }: ToastProps) => {
  useEffect(() => {
    if (isActive && !persistent) {
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, persistent, setIsActive]);
  
  return (
    <StyledToast className={isActive ? "" : "hide"}>
      {message}
    </StyledToast>
  );
};

export default Toast;
