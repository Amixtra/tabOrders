import styled from "styled-components";

const StyledGridContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url("assets/img/background.png") no-repeat center center/cover;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr auto;
`;

export default StyledGridContainer;
