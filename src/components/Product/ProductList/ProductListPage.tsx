import React from "react";
import { CategoryProps, CategoryItemProps } from "types";
import {
  StyledProductListWrapper,
  StyledProductCategoryTitle,
} from "./ProductListPage.style";
import ProductListItem from "../ProductListItem/ProductListItem";
import { addToCart, toggleCartOpen } from "features/cart/cartReducer";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import useFetch from "hooks/useFeth";
import { useLocation } from "react-router-dom";
import { LanguageCode } from "db/constants";

interface ProductListPageProps {
  selectedCategory: number | null;
  selectedLanguage: LanguageCode,
}

const ProductListPage: React.FC<ProductListPageProps> = ({ selectedCategory, selectedLanguage }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");
  const [data] = useFetch(
    `http://localhost:8080/api/categories?company=${company}&language=${selectedLanguage}`
  );

  const filteredCategories = data?.filter((category: CategoryProps) =>
    selectedCategory === null ? true : category.categoryId === selectedCategory
  );

  const productData = filteredCategories?.map((item: CategoryProps) => {
    const categoryTitle = item.categoryName;
    const productList = item.categoryItems!.map((item) => {
      const handleAddToCart = (item: CategoryItemProps) => {
        dispatch(addToCart(item));
        if (!cart.isCartOpen && !item.itemSoldOutFlag) {
          dispatch(toggleCartOpen());
        }
      };

      return (
        <ProductListItem
          itemName={item.itemName}
          itemImg={item.itemImageUrl}
          itemPrice={item.itemPrice}
          isItemSoldOut={item.itemSoldOutFlag}
          onClick={() => handleAddToCart(item)}
        />
      );
    });

    return (
      <section
        id={`category-${item.categoryId}`}
        key={item.categoryId}
        className="product-list-container"
      >
        <StyledProductCategoryTitle>{categoryTitle}</StyledProductCategoryTitle>
        <ul className="product-list">{productList}</ul>
      </section>
    );
  });

  return <StyledProductListWrapper>{productData}</StyledProductListWrapper>;
};

export default ProductListPage;