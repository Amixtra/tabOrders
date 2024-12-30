import { useSearchParams } from "react-router-dom";
import { StyledRestaurantIndicator, StyledRestaurantName } from "./RestaurantIndicator.style";

const RestaurantIndicator = () => {
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");

  return (
    <StyledRestaurantIndicator>
      <StyledRestaurantName>{company || "Unknown"}</StyledRestaurantName>
    </StyledRestaurantIndicator>
  );
};

export default RestaurantIndicator;
