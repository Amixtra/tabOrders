import PALETTE from "constants/palette";
import styled from "styled-components";

const StyledNav = styled.nav`
  height: 100%;
  & ul {
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

    & li {
      height: 100%;
      flex: 0 0 auto;
      font-size: 20px;
      padding: 26px 12px 14px;
      border-radius: 0 0 10px 10px;
      scroll-snap-align: start;
      color: ${PALETTE.WHITE};

      &.selected {
        background-color: ${PALETTE.MAIN};
      }
    }
  }
`;

export default StyledNav;
