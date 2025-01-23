import React, { useEffect, useState } from "react";
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
import Toast from "components/@share/Toast/Toast";
import axios from "axios";

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

  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);

  const [isOrderFromTabletAllowed, setIsOrderFromTabletAllowed] = useState(true);

  useEffect(() => {
    const fetchToggles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/toggles?company=${company}`
        );
        const data = response.data;
        setIsOrderFromTabletAllowed(data.isToggleOrderOn);
      } catch (error) {
        console.error("Error fetching toggles from DB:", error);
      }
    };

    fetchToggles();

    const interval = setInterval(fetchToggles, 10_000);
    return () => clearInterval(interval);
  }, [company]);

  const filteredCategories = data?.filter((category: CategoryProps) =>
    selectedCategory === null ? true : category.categoryId === selectedCategory
  );

  const productData = filteredCategories?.map((item: CategoryProps) => {
    const categoryTitle = item.categoryName;
    const productList = item.categoryItems!.map((item) => {
      const handleAddToCart = (item: CategoryItemProps) => {
        if (!isOrderFromTabletAllowed) {
          setToastMessage("Sorry, Disabled Order by Administrator..");
          setIsToastActive(true);
          return;
        }
        dispatch(addToCart(item));
        if (!cart.isCartOpen && !item.itemSoldOutFlag) {
          dispatch(toggleCartOpen());
        }
      };

      return (
        <ProductListItem
          key={item.itemId}
          itemName={item.itemName}
          itemImg={item.itemImageUrl}
          itemPrice={item.itemPrice}
          isItemSoldOut={item.itemSoldOutFlag}
          isItemNew={item.itemNewFlag}
          isItemHot={item.itemHotFlag}
          isItemPause={item.itemPauseFlag}
          allergies={item.allergies}
          selectedLanguage={selectedLanguage}
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

  return (
    <>
      <Toast
        message={toastMessage}
        isActive={isToastActive}
        setIsActive={setIsToastActive}
      />
      <StyledProductListWrapper>{productData}</StyledProductListWrapper>
    </>
  );
};

export default ProductListPage;