import PALETTE from "constants/palette";
import styled from "styled-components";

export const StyledRestaurantIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 14vw;

  padding: 0px 12px 12px;
  text-align: center;
  background-color: ${PALETTE.MAIN};
  border-radius: 0 0 10px 10px;
  
  margin-bottom: 20px;

  & .table-description {
    font-size: 14px;
    margin-top: 5px;
    color: ${PALETTE.WHITE};
  }
`;

export const StyledRestaurantName = styled.p`
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  font-weight: 900;
  color: ${PALETTE.WHITE};
  text-transform: uppercase;
`;