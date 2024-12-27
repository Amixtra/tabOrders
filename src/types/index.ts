export interface CategoryProps {
  categoryId?: number;
  categoryName: string;
  categoryItems?: CategoryItemProps[];
}

export interface CategoryItemProps {
  itemId?: number;
  itemName?: string;
  itemPrice?: number;
  itemSoldOutFlag?: boolean;
  itemImageUrl?: string;
  cartItemQuantity?: number;
}

export interface CartListProps {
  cartItems: CategoryItemProps[];
  cartTotalAmount?: number;
  isCartOpen?: boolean;
  isHistoryOpen?: boolean;
  orderHistory: OrderProps[];
}

export interface OrderItemProps {
  itemId: string;
  itemName: string;
  cartItemQuantity: number;
  itemPrice: number;
}

export interface OrderProps {
  orderId: number;
  items: OrderItemProps[];
  totalAmount: number;
  isHistoryOpen?: boolean;
  date: string;
}
