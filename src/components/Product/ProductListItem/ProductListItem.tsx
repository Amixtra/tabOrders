import { StyledProductListItem } from "./ProductListItem.style";
import {
  LanguageCode, 
  PopularStringsLocales
} from "db/constants";

interface Props {
  itemName?: string;
  itemImg?: string;
  itemPrice?: any;
  isItemSoldOut?: boolean;
  isItemNew?: boolean;
  isItemHot?: boolean;
  isItemPause?: boolean;
  allergies?: string;
  categoryId?: number;
  onClick?: () => void;
  selectedLanguage: LanguageCode;
}

const ProductListItem = ({
  itemName,
  itemImg,
  itemPrice,
  isItemSoldOut,
  isItemNew,
  isItemPause,
  isItemHot,
  onClick,
  selectedLanguage
}: Props) => {
  const popularStringLocale = PopularStringsLocales[selectedLanguage];
  if (isItemPause) return null;

  return (
    <StyledProductListItem 
      onClick={onClick}
      style={{
        boxShadow: isItemHot 
          ? "0 0 20px rgba(255, 223, 0, 0.7), 0 0 20px rgba(255, 223, 0, 0.5), 0 0 20px rgba(255, 223, 0, 0.3)"
          : "none"
      }}
    >
      {isItemSoldOut && <div className="soldout-cover"></div>}
      {isItemNew && <div className="new-cover"></div>}

      <div className="product-img">
        <img src={itemImg ? itemImg : "/assets/img/no-image.jpg"} alt={itemName} />
      </div>

      {isItemHot && <div className="bottom-box">🔥 {popularStringLocale.popular}</div>}

      <div className="product-info">
        <p className="product-name">{itemName}</p>
        <p>{itemPrice ? `₱ ${itemPrice.toLocaleString()}.00` : "Free"}</p>
      </div>
    </StyledProductListItem>
  );
};

export default ProductListItem;
