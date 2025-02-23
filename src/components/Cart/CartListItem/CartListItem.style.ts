import styled from "styled-components";

import PALETTE from "constants/palette";

const StyledCartListItem = styled.li`
  padding-bottom: 1.875vw;
  margin-bottom: 1.875vw;
  border-bottom: 1px solid ${PALETTE.GREY300};

  &:last-child {
    border-bottom: 0;
  }

  & .cart-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    & .product-name {
      max-width: 14.0625vw;
      font-size: 1.71875vw;
      line-height: 2.5vw;
    }
  }
  & .cart-item-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    & .cart-item-counter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }
  }
  .cart-order-number {
    padding-left: 10px;
    padding-right: 10px;
  }
  .cart-item-price-total {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${PALETTE.MAIN};
  }

  @media (max-width: 1080px) {
    .cart-item-header {
      margin-top: 10px;
    }
    .cart-order-number {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export default StyledCartListItem;
