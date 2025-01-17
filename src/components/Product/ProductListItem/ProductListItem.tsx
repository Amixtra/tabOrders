import { StyledProductListItem } from "./ProductListItem.style";

interface Props {
  itemName?: string;
  itemImg?: string;
  itemPrice?: any;
  isItemSoldOut?: boolean;
  isItemNew?: boolean;
  categoryId?: number;
  onClick?: () => void;
}

const ProductListItem = ({
  itemName,
  itemImg,
  itemPrice,
  isItemSoldOut,
  isItemNew,
  onClick,
}: Props) => {
  return (
    <StyledProductListItem onClick={onClick}>
      {isItemSoldOut ? <div className="soldout-cover"></div> : null}
      {isItemNew ? <div className="new-cover"></div> : null}
      <div className="product-img">
        <img src={itemImg} alt={itemName} />
      </div>
      <div className="product-info">
        <p className="product-name">{itemName}</p>
        <p>{itemPrice ? `₱ ${itemPrice.toLocaleString()}.00` : "Free"}</p>
      </div>
    </StyledProductListItem>
  );
};

export default ProductListItem;
