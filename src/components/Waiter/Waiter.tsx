import React, { useEffect, useState } from "react";
import {
  WaiterOverlay,
  WaiterWrapper,
  WaiterBG,
  RightBlock,
  WaiterBottomButton,
  WaiterItemsContainer,
  WaiterItem,
} from "./Waiter.style";
import WaiterClose from "./WaiterClose/WaiterClose";
import WaiterTitle from "./WaiterTitle/WaiterTitle";
import PALETTE from "constants/palette";
import { DEFAULT_ITEMS } from "db/waiter";
import WaiterCounter from "./WaiterCounter/WaiterCounter";

interface WaiterProps {
  setShowWaiter: (value: boolean) => void;
}

const MIN_BUTTONS = 13;

const Waiter: React.FC<WaiterProps> = ({ setShowWaiter }) => {
  const [resetTimer, setResetTimer] = useState(false);
  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS);

  const handleClose = () => {
    setShowWaiter(false);
  };

  const handleUserActivity = () => {
    setResetTimer(true);
    setTimeout(() => setResetTimer(false), 0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    return () => {
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
    }
  }, []);

  const paddedItems = 
    items.length === 0
      ? new Array(MIN_BUTTONS).fill("")
      : items.length < MIN_BUTTONS
      ? [...items, ...Array(MIN_BUTTONS - items.length).fill("")]
      : items;

  return (
    <WaiterOverlay>
      <WaiterWrapper>
        <WaiterTitle />
        {/* <WaiterCounter onExpire={handleClose} resetTimer={resetTimer} /> */}
        <WaiterClose onClose={handleClose} />
        <WaiterBG>
          <WaiterItemsContainer>
            {paddedItems.map((item, index) => (
              <WaiterItem key={index}>{item}</WaiterItem>
            ))}
          </WaiterItemsContainer>
          <RightBlock>Please select the item you want to request</RightBlock>
        </WaiterBG>
          <WaiterBottomButton style={{ backgroundColor: PALETTE.MAIN }}>
            Just Call Waiter
          </WaiterBottomButton>
      </WaiterWrapper>
    </WaiterOverlay>
  );
};

export default Waiter;
