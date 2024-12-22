import styled from "styled-components";

import PALETTE from "constants/palette";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border-top: 5px solid ${PALETTE.MAIN};
  background-color: transparent;
`;
const StyledCategoryList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0 40px;

  height: 100%;
  padding-right: 155px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const StyledCategoryListItem = styled.li`
  height: 100%;
  flex: 0 0 auto;
  font-size: 20px;
  padding: 26px 12px 14px;
  border-radius: 0 0 10px 10px;
  scroll-snap-align: start;
`;

export { StyledHeader, StyledCategoryList, StyledCategoryListItem };
