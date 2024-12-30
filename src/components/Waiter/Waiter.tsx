import React from "react";
import {
  WaiterOverlay,
  WaiterWrapper,
  WaiterBG,
} from "./Waiter.style";
import WaiterClose from "./WaiterClose/WaiterClose";
import WaiterTitle from "./WaiterTitle/WaiterTitle";

interface WaiterProps {
  setShowWaiter: (value: boolean) => void;
}

const Waiter: React.FC<WaiterProps> = ({ setShowWaiter }) => {
  const handleClose = () => {
    setShowWaiter(false);
  };

  return (
    <WaiterOverlay>
      <WaiterWrapper>
        <WaiterTitle />
        <WaiterClose onClose={handleClose} />
        <WaiterBG />
      </WaiterWrapper>
    </WaiterOverlay>
  );
};

export default Waiter;
