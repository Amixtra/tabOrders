export interface CategoryProps {
  categoryId: number;
  categoryName: string;
  categoryItems?: CategoryItemProps[];
}

export interface CategoryItemProps {
  itemId?: number;
  itemName: string;
  itemPrice?: number;
  itemSoldOutFlag?: boolean;
  itemNewFlag?: boolean;
  itemHotFlag?: boolean;
  itemPauseFlag?: boolean;
  itemImageUrl?: string;
  allergies?: string;
  cartItemQuantity: number;
}

export interface CartListProps {
  cartItems: CategoryItemProps[];
  cartTotalAmount?: number;
  isCartOpen?: boolean;
  isHistoryOpen?: boolean;
}