// OrderHistoryItems.style.ts
import styled from "styled-components";

export const ItemsContainer = styled.div`
  background: #fff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  /* Optional shadow, if you like */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ccc;

  .item-name {
    flex: 2;
    font-weight: 500;
    /* Adjust if you want bigger text */
  }
  .quantity {
    flex: 1;
    text-align: center;
  }
  .price,
  .subtotal {
    flex: 1;
    text-align: right;
    /* Adjust width, font, etc. here */
  }
`;

export const TotalPriceRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;

  .label {
    margin-right: 1rem;
    font-weight: 600;
  }
  .price {
    color: red;
    font-size: 1.25rem;
    font-weight: 700;
  }
`;
