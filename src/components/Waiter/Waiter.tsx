import React, { useEffect, useState } from "react";
import {
  WaiterOverlay,
  WaiterWrapper,
  WaiterBG,
  RightBlock,
  WaiterBottomButton,
  WaiterItemsContainer,
  WaiterItem,
  WaiterListItem,
} from "./Waiter.style";
import WaiterClose from "./WaiterClose/WaiterClose";
import WaiterTitle from "./WaiterTitle/WaiterTitle";
import PALETTE from "constants/palette";
import { DEFAULT_ITEMS } from "db/waiter";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import Toast from "components/@share/Toast/Toast";
import { toggleCartOpen } from "features/cart/cartReducer";
import Button from "components/@share/Button/Button";
import WaiterToast from "./WaiterToast/WaiterToast";
import { useSearchParams } from "react-router-dom";

const icon_increase = "/assets/icon/icon_increase.png";
const icon_decrease = "/assets/icon/icon_decrease.png";

interface WaiterProps {
  setShowWaiter: (value: boolean) => void;
}

interface SelectedItem {
  name: string;
  quantity: number;
}

const MIN_BUTTONS = 13;

const Waiter: React.FC<WaiterProps> = ({ setShowWaiter }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("tableId");
  const [resetTimer, setResetTimer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [items] = useState<string[]>(DEFAULT_ITEMS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  useEffect(() => {
    if (cart.isCartOpen) {
      dispatch(toggleCartOpen());
    }
  }, [dispatch, cart.isCartOpen]);

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
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  const handleItemClick = (item: string) => {
    const existingItem = selectedItems.find((i) => i.name === item);
    if (existingItem) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.name === item ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems((prev) => [...prev, { name: item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.name !== item));
  };

  const handleIncreaseQuantity = (item: string) => {
    setSelectedItems((prev) =>
      prev.map((i) => (i.name === item ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const handleDecreaseQuantity = (item: string) => {
    setSelectedItems((prev) =>
      prev.reduce((acc, i) => {
        if (i.name === item) {
          if (i.quantity > 1) {
            acc.push({ ...i, quantity: i.quantity - 1 });
          }
          // If quantity is 1 remove the yeah~
        } else {
          acc.push(i);
        }
        return acc;
      }, [] as SelectedItem[])
    );
  };

  const paddedItems =
    items.length === 0
      ? new Array(MIN_BUTTONS).fill("")
      : items.length < MIN_BUTTONS
      ? [...items, ...Array(MIN_BUTTONS - items.length).fill("")]
      : items;

  const handleCallWaiter = () => {
    const message =
      selectedItems.length > 0
        ? "Your order has been placed, please wait..."
        : "Called the waiter, please wait a moment...";
    setToastMessage(message);

    if (selectedItems.length > 0) {
      const totalQuantity = selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      console.log(
        `Order Details:\n"Time Ordered": ${new Date().toLocaleString()},\n"Table": ${id},\n"Orders": [${selectedItems.map((item) => `${item.name} (Quantity: ${item.quantity})`).join(", ")}],\n"Total Quantity": ${totalQuantity}"
        `
      );
    } else {
      console.log(`Order Details:\n"Time Ordered": ${new Date().toLocaleString()},\n"Table": ${id},\n"Order": Call Waiter`);
    }
  
    setIsActive(true);
    setSelectedItems([]);
    setTimeout(() => {
      setIsActive(false);
      setShowWaiter(false);
    }, 3000);
  };

  const buttonText = selectedItems.length > 0 ? "Order" : "Just Call Waiter";

  return (
    <>
      <WaiterToast
        message={toastMessage || "Called the waiter, please wait a moment..."}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <WaiterOverlay>
        <WaiterWrapper>
          <WaiterTitle />
          <WaiterClose onClose={handleClose} />
          <WaiterBG>
            <WaiterItemsContainer>
              {paddedItems.map((item, index) => (
                <WaiterItem
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={!item}
                >
                  {item || "Empty"}
                </WaiterItem>
              ))}
            </WaiterItemsContainer>
            <RightBlock>
              <div className="cart-body">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, index) => (
                    <WaiterListItem key={index}>
                      <div className="cart-item-header">
                        <h4 className="product-name">{item.name}</h4>
                        <div className="remove-btn">
                          <Button
                            color="MAIN"
                            outlined
                            rounded
                            onClick={() => handleRemoveItem(item.name)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="cart-item-body">
                        <div className="cart-item-counter">
                          <Button
                            iconBtnCart
                            iconUrl={icon_decrease}
                            onClick={() => handleDecreaseQuantity(item.name)}
                          />
                          <span className="cart-order-number">
                            {item.quantity} Order
                          </span>
                          <Button
                            iconBtnCart
                            iconUrl={icon_increase}
                            onClick={() => handleIncreaseQuantity(item.name)}
                          />
                        </div>
                      </div>
                    </WaiterListItem>
                  ))
                ) : (
                  <p className="empty-sign"> Please select an item </p>
                )}
              </div>
            </RightBlock>
          </WaiterBG>
          <WaiterBottomButton
            style={{ backgroundColor: PALETTE.MAIN }}
            onClick={handleCallWaiter}
          >
            {buttonText}
          </WaiterBottomButton>
        </WaiterWrapper>
      </WaiterOverlay>
    </>
  );
};

export default Waiter;