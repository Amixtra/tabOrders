import { StyledProductListItem } from "./ProductListItem.style";

interface Props {
  itemName?: string;
  itemImg?: string;
  itemPrice?: number;
  isItemSoldOut?: boolean;
  onClick?: () => void;
}

const ProductListItem = ({
  itemName,
  itemImg,
  itemPrice,
  isItemSoldOut,
  onClick,
}: Props) => {
  return (
    <StyledProductListItem onClick={onClick}>
      {isItemSoldOut ? <div className="soldout-cover"></div> : null}
      <div className="product-img">
        <img src={itemImg} alt={itemName} />
      </div>
      <div className="product-info">
        <p className="product-name">{itemName}</p>
        <p>₱ {itemPrice!.toLocaleString()}</p>
      </div>
    </StyledProductListItem>
  );
};

export default ProductListItem;
