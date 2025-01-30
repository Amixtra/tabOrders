import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledCart = styled.aside`
  width: 24vw;
  padding: 0 20px 0;
  border-top: 5px solid ${PALETTE.MAIN};
  background-color: ${PALETTE.GREY100};
  box-shadow: -5px 0 6px rgba(0, 0, 0, 0.55);
  position: relative;
  z-index: 1;
  transition: width 0.2s;
  overflow: hidden;

  &.hide {
    width: 0;
    margin-right: -40px;
  }

  & .cart-header {
    padding-top: 3.125vw;
    margin-bottom: 1.5625vw;

    & .cart-title {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  & .cart-body {
    overflow-y: scroll;
    height: 74.6vh;

    &::-webkit-scrollbar {
      display: none;
    }

    & .empty-sign {
      color: ${PALETTE.GREY400};
    }

    @media (max-width: 1080px) {
      & .empty-sign {
        margin-top: 15px;
      }
    }
  }

  & .cart-footer {
    position: absolute;
    bottom: 80px;
    right: 0;
    z-index: 2;
    width: 100%;
    height: 9.375vw;
    background-color: ${PALETTE.WHITE};
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-rows: repeat(2, 1fr);

    & .cart-item-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-size: 20px;

      & .cart-item-total-price {
        color: ${PALETTE.MAIN};
        font-weight: bold;
        & span {
          font-size: 18px;
        }
      }
    }

    & .cart-controller {
      display: grid;
      grid-template-columns: 8.28125vw auto;
      align-content: stretch;
      font-weight: bold;
    }
  }

  @media (max-width: 1080px) {
    width: 26vw;
  }
}
`;

export default StyledCart;