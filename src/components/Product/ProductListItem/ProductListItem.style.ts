import styled from "styled-components";
import PALETTE from "./../../../constants/palette";

const StyledProductListItem = styled.li`
  min-height: 250px;
  max-height: 334px;
  display: grid;
  grid-template-rows: 12.5vw auto;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  color: ${PALETTE.WHITE};

  box-shadow: 0 0 20px rgba(0, 174, 255, 0.7), 
              0 0 20px rgba(0, 174, 255, 0.5), 
              0 0 20px rgba(0, 174, 255, 0.3);

  & .product-img {
    width: 100%;
    height: 12.5vw;
    min-height: 160px;
    max-height: 212px;
    overflow: hidden;
    text-align: center;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .bottom-box {
    width: 100%;
    height: 30px;
    background-color: rgba(255, 223, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: black;
    position: relative;
    top: 0;
  }

  & .soldout-cover {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6) url("/assets/icon/icon_soldout.png") no-repeat
      center 0%/100%;
    position: absolute;
    top: 10;
    left: 0;
  }

  & .new-cover {
    width: 100%;
    height: 100%;
    background: url("/assets/icon/icon_new.png") no-repeat 
      center 0%/100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  & .product-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding-top: 10px;
    padding-bottom: 10px;

    & .product-name {
      font-size: 1.25vw;
    }
  }
`;

export { StyledProductListItem };
