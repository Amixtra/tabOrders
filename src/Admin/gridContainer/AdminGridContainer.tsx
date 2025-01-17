import StyledAdminGridContainer from "./AdminGridContainer.style";

interface Props {
  children?: React.ReactNode;
}

const AdminGridContainer = ({ children }: Props) => {
  return <StyledAdminGridContainer>{children}</StyledAdminGridContainer>;
};

export default AdminGridContainer;