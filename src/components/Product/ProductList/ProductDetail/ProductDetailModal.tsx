import React, { useState } from "react";
import { CategoryItemProps } from "types";
import {
  ModalOverlay,
  ModalContent,
  LeftSection,
  RightSection,
  ProductImage,
  TabButtons,
  TabButton,
  TabPanel,
  ProductTitle,
  PriceRow,
  PriceLabel,
  PriceValue,
  AllergyContainer,
  DescriptionContainer,
  ButtonRow,
  CloseButton,
  AddToCartButton,
} from "./ProductDetailModal.style";

interface ProductDetailModalProps {
  item: CategoryItemProps | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CategoryItemProps) => void;
}

const ALLERGY_ICONS: Record<string, string> = {
  Milk: "/assets/icon/icon_milk.png",
  Eggs: "/assets/icon/icon_eggs.png",
  "Tree Nuts": "/assets/icon/icon_tree_nuts.png",
  Peanuts: "/assets/icon/icon_peanuts.png",
  Shellfish: "/assets/icon/icon_shellfish.png",
  Fish: "/assets/icon/icon_fish.png",
  Soybeans: "/assets/icon/icon_soybeans.png",
  "Cereals Containing Gluten": "/assets/icon/icon_cereals_containing_gluten.png",
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedTab, setSelectedTab] = useState<"overview" | "allergies">("overview");

  if (!isOpen || !item) return null;

  const handleTabClick = (tab: "overview" | "allergies") => {
    setSelectedTab(tab);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <LeftSection>
          <ProductTitle>{item.itemName}</ProductTitle>
          <ProductImage src={item.itemImageUrl} alt={item.itemName} />
        </LeftSection>

        <RightSection>
          <TabButtons>
            <TabButton
              onClick={() => handleTabClick("overview")}
              $active={selectedTab === "overview"}
            >
              Overview
            </TabButton>
            <TabButton
              onClick={() => handleTabClick("allergies")}
              $active={selectedTab === "allergies"}
            >
              Allergies
            </TabButton>
          </TabButtons>

          {selectedTab === "overview" && (
            <TabPanel>
              <DescriptionContainer>
                <p>{item.itemDescription || "Product description..."}</p>
              </DescriptionContainer>
            </TabPanel>
          )}
          {selectedTab === "allergies" && (
            <TabPanel>
              <AllergyContainer>
                {item.allergies && item.allergies.length > 0 ? (
                  item.allergies.map((allergy) => {
                    const iconSrc = ALLERGY_ICONS[allergy];
                    return (
                      <div key={allergy} className="allergy-icon">
                        <img src={iconSrc} alt={allergy} />
                        <span>{allergy}</span>
                      </div>
                    );
                  })
                ) : (
                  <p>No known allergens.</p>
                )}
              </AllergyContainer>
            </TabPanel>
          )}

          <PriceRow>
            <PriceLabel>Price:</PriceLabel>
            <PriceValue>₱ {item.itemPrice}</PriceValue>
          </PriceRow>

          <ButtonRow>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <AddToCartButton onClick={() => onAddToCart(item)}>
              Add to Cart
            </AddToCartButton>
          </ButtonRow>
        </RightSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductDetailModal;
