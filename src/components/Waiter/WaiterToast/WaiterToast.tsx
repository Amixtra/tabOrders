import React, { Dispatch, SetStateAction, useEffect } from "react";
import StyledWaiterToast from "./WaiterToast.style";

interface ToastProps {
  message?: string;
  isActive?: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const WaiterToast = ({ message, isActive, setIsActive }: ToastProps) => {
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  });
  return (
    <StyledWaiterToast className={isActive ? "" : "hide"}>{message}</StyledWaiterToast>
  );
};

export default WaiterToast;
