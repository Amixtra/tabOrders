import { CategoryProps, CategoryItemProps } from "types";
import {
  StyledProductListWrapper,
  StyledProductCategoryTitle,
} from "./ProductListPage.style";
import ProductListItem from "../ProductListItem/ProductListItem";
import { addToCart, toggleCartOpen } from "features/cart/cartReducer";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import useFetch from "hooks/useFeth";

const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [data] = useFetch("http://localhost:3001/categories");

  const productData = data!.map((item: CategoryProps) => {
    const categoryTitle = item.categoryName;
    const productList = item.categoryItems!.map((item) => {
      const handleAddToCart = (item: CategoryItemProps) => {
        dispatch(addToCart(item));
        if (!cart.isCartOpen && !item.itemSoldOutFlag) {
          dispatch(toggleCartOpen());
        } else {
          return null;
        }
      };
      const itemName = item.itemName;
      const itemImg = item.itemImageUrl;
      const itemPrice = item.itemPrice;
      const isItemSoldOut = item.itemSoldOutFlag;

      return (
        <ProductListItem
          key={item.itemId}
          itemName={itemName}
          itemImg={itemImg}
          itemPrice={itemPrice}
          isItemSoldOut={isItemSoldOut}
          onClick={() => {
            handleAddToCart(item);
          }}
        ></ProductListItem>
      );
    });

    return (
      <section key={item.categoryId} className="product-list-container">
        <StyledProductCategoryTitle>{categoryTitle}</StyledProductCategoryTitle>
        <ul className="product-list">{productList}</ul>
      </section>
    );
  });

  return <StyledProductListWrapper>{productData}</StyledProductListWrapper>;
};

export default ProductListPage;
