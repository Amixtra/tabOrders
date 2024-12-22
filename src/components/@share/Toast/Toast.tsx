import React, { Dispatch, SetStateAction, useEffect } from "react";
import StyledToast from "./Toast.style";

interface ToastProps {
  message?: string;
  isActive?: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Toast = ({ message, isActive, setIsActive }: ToastProps) => {
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  });
  return (
    <StyledToast className={isActive ? "" : "hide"}>{message}</StyledToast>
  );
};

export default Toast;
