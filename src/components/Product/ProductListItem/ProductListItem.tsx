import { StyledProductListItem } from "./ProductListItem.style";
import videoSources from "db/ad";

interface Props {
  itemName?: string;
  itemImg?: string;
  itemPrice?: any;
  isItemSoldOut?: boolean;
  categoryId?: number;
  onClick?: () => void;
}

const ProductListItem = ({
  itemName,
  itemImg,
  itemPrice,
  isItemSoldOut,
  categoryId,
  onClick,
}: Props) => {
  if (categoryId === 1) {
    return (
      <video autoPlay muted loop>
        <source src="/" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <StyledProductListItem onClick={onClick}>
      {isItemSoldOut ? <div className="soldout-cover"></div> : null}
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
