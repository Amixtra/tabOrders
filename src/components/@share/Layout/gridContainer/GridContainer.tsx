import StyledGridContainer from "./GridContainer.style";

interface Props {
  children?: React.ReactNode;
}

const GridContainer = ({ children }: Props) => {
  return <StyledGridContainer>{children}</StyledGridContainer>;
};

export default GridContainer;
