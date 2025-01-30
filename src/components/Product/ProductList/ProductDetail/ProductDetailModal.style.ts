import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  display: flex;
  width: 1000px;
  max-width: 90%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
`;

export const LeftSection = styled.div`
  flex: 2;
  background-color: #f9f9f9;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const ProductTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const TabButtons = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 12px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.$active ? "red" : "#ddd")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  font-weight: bold;
  margin-right: 4px;
  border-radius: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

export const TabPanel = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const DescriptionContainer = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

export const PriceLabel = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PriceValue = styled.span`
  font-size: 2.5rem;
  color: red;
  font-weight: bold;
`;

export const AllergyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  .allergy-icon {
    border: 1px solid #ddd;
    padding: 8px 18px;
    display: flex;
    align-items: center;
    margin: 4px 0;
    border-radius: 8px;
    background-color: #fff;
  }

  img {
    width: 42px;
    height: 42px;
    margin-right: 8px;
    object-fit: contain;
  }

  span {
    whit-space: nowrap;
    font-weight: 500;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const CloseButton = styled.button`
  background: #ccc;
  border: none;
  padding: 15px 40px;
  margin-right: 8px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
`;

export const AddToCartButton = styled.button`
  background: red;
  color: #fff;
  border: none;
  font-size: 18px;
  padding: 10px 40px;
  cursor: pointer;
  border-radius: 8px;
`;
