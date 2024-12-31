import styled from "styled-components";

const StyledGridContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/assets/img/default-background.png") no-repeat center center/cover;
  overflow: hidden;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
`;

export default StyledGridContainer;
