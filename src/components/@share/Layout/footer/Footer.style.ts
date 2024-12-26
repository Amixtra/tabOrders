import styled from "styled-components";

const StyledFooter = styled.footer`
  width: calc(100% - 14vw);
  height: 60px;
  padding: 0 40px 0 20px;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  bottom: 0;
  left: 14vw;
  
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 0;
`;

export default StyledFooter;
