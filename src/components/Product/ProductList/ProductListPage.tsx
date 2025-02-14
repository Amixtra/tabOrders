import { useEffect, useState } from "react";
import { CategoryProps, CategoryItemProps } from "types";
import {
  StyledProductListWrapper,
  StyledProductCategoryTitle,
} from "./ProductListPage.style";
import ProductListItem from "../ProductListItem/ProductListItem";
import { addToCart, toggleCartOpen } from "features/cart/cartReducer";
import { useAppDispatch, useAppSelector } from "features/store/rootReducer";
import { useLocation } from "react-router-dom";
import { LanguageCode } from "db/constants";
import Toast from "components/@share/Toast/Toast";
import axios from "axios";
import ProductDetailModal from "./ProductDetail/ProductDetailModal";

interface ProductListPageProps {
  selectedCategory: number | null;
  selectedLanguage: LanguageCode;
}

const ProductListPage: React.FC<ProductListPageProps> = ({
  selectedCategory,
  selectedLanguage,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get("company");

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [isOrderFromTabletAllowed, setIsOrderFromTabletAllowed] = useState(true);

  // For controlling the modal
  const [selectedItem, setSelectedItem] = useState<CategoryItemProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch toggles (for enabling/disabling ordering)
  useEffect(() => {
    const fetchToggles = async () => {
      try {
        const response = await axios.get(
          `http://43.200.251.48:8080/api/toggles?company=${company}`
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

  // Fetch categories (poll every 5s)
  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `http://43.200.251.48:8080/api/categories?company=${company}&language=${selectedLanguage}`
        );
        if (isMounted) setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    const interval = setInterval(fetchCategories, 5000);

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [company, selectedLanguage]);

  // Filter categories based on user's selection
  const filteredCategories = categories.filter((cat) =>
    selectedCategory === null ? true : cat.categoryId === selectedCategory
  );

  // This function is called from the modal's "Add to Cart" button
  const handleAddToCart = (item: CategoryItemProps) => {
    if (!isOrderFromTabletAllowed) {
      setToastMessage("Sorry, ordering is disabled by the Administrator.");
      setIsToastActive(true);
      return;
    }

    dispatch(addToCart(item));
    if (!cart.isCartOpen && !item.itemSoldOutFlag) {
      dispatch(toggleCartOpen());
    }

    // Close the modal
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Called when user clicks on a product
  const openDetailModal = (item: CategoryItemProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const productData = filteredCategories.map((cat) => {
    const productList = cat.categoryItems?.map((item) => {
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
          onClick={() => {
            if (!item.itemSoldOutFlag) {
              openDetailModal(item)}
            }
          } 
        />
      );
    });

    return (
      <section
        id={`category-${cat.categoryId}`}
        key={cat.categoryId}
        className="product-list-container"
      >
        <StyledProductCategoryTitle>
          {cat.categoryName}
        </StyledProductCategoryTitle>
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

      {/* Render the modal */}
      <ProductDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductListPage;
