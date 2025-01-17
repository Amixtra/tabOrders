import styled from "styled-components";

const StyledAdminGridContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: #222;
  overflow: hidden;

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
`;

export default StyledAdminGridContainer;
