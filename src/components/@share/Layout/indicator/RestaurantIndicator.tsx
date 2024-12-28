import React from "react";
import { useParams } from "react-router";
import { 
    StyledRestaurantIndicator,
    StyledRestaurantName
} from "./RestaurantIndicator.style";

const RestaurantIndicator = () => {
  const { company } = useParams<{ company: string }>();

  return (
    <StyledRestaurantIndicator>
      <StyledRestaurantName>{company || "Unknown"}</StyledRestaurantName>
    </StyledRestaurantIndicator>
  );
};

export default RestaurantIndicator;