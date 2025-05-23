// Waiter.tsx
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
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
import { toggleCartOpen } from "features/cart/cartReducer";
import Button from "components/@share/Button/Button";
import WaiterToast from "./WaiterToast/WaiterToast";
import { useSearchParams } from "react-router-dom";

// Create a socket connection. (For production, consider reusing a shared socket instance.)
const socket = io("http://43.200.251.48:8080");

interface SelectedItem {
  name: string;
  quantity: number;
}

const MIN_BUTTONS = 13;

const Waiter: React.FC<{ setShowWaiter: (value: boolean) => void }> = ({ setShowWaiter }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [searchParams] = useSearchParams();
  const tableId = searchParams.get("tableId") || "Unknown";
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

  const handleItemClick = (item: string) => {
    const existingItem = selectedItems.find((i) => i.name === item);
    if (existingItem) {
      setSelectedItems((prev) => {
        const filtered = prev.filter((i) => i.name !== item);
        return [{ name: item, quantity: existingItem.quantity + 1 }, ...filtered];
      });
    } else {
      setSelectedItems((prev) => [{ name: item, quantity: 1 }, ...prev]);
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
      socket.emit("customerCallWaiter", {
        tableId,
        orders: selectedItems,
        time: new Date().toISOString(),
      });
    } else {
      socket.emit("customerCallWaiter", {
        tableId,
        order: "Call Waiter",
        time: new Date().toISOString(),
      });
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
                            iconUrl="/assets/icon/icon_decrease.png"
                            onClick={() => handleDecreaseQuantity(item.name)}
                          />
                          <span className="cart-order-number">
                            {item.quantity} Order
                          </span>
                          <Button
                            iconBtnCart
                            iconUrl="/assets/icon/icon_increase.png"
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