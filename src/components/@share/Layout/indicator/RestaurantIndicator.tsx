import { useSearchParams } from "react-router-dom";
import { StyledRestaurantIndicator, StyledRestaurantName } from "./RestaurantIndicator.style";
import { useEffect, useState } from "react";

const RestaurantIndicator = () => {
  const [searchParams] = useSearchParams();
  const [company, setCompany] = useState("");
  const companyName = searchParams.get("company");

  useEffect(() => {
    if (companyName) {
      const fetchCompany = async () => {
        try {
          const response = await fetch ("http://43.200.251.48:8080/api/decrypt-company", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ company: companyName }),
          });
          const data = await response.json();
          if (response.ok) {
            setCompany(data.company);
          } else {
            console.error("Error fetching company:", data.error);
          }
        } catch (error) {
          console.error("Error fetching company:", error);
        }
      };
      fetchCompany();
    }
  }, [companyName]);

  return (
    <StyledRestaurantIndicator>
      <StyledRestaurantName>{company || "Unknown"}</StyledRestaurantName>
    </StyledRestaurantIndicator>
  );
};

export default RestaurantIndicator;