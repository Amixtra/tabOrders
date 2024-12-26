import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledProductListWrapper = styled.main`
  margin-top: 80px;
  padding: 0px 0px 140px;
  height: 100vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  & .product-list-container {
    margin-bottom: 20px;

    & .product-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }
`;

const StyledProductCategoryTitle = styled.h2`
  border-left: 4px solid ${PALETTE.MAIN};
  color: ${PALETTE.WHITE};
  font-size: 30px;
  font-weight: bold;
  padding-left: 20px;
  margin: 20px 0;
`;

const StyledProductListItem = styled.li`
  min-height: 250px;
  max-height: 334px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;

export {
  StyledProductListWrapper,
  StyledProductCategoryTitle,
  StyledProductListItem,
};
