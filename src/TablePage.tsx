import Header from "components/@share/Layout/header/Header";
import GridContainer from "components/@share/Layout/gridContainer/GridContainer";
import Footer from "components/@share/Layout/footer/Footer";
import ProductListPage from "components/Product/ProductList/ProductListPage";
import Cart from "components/Cart/Cart";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import Nav from "components/Nav/Nav";

const TablePage = () => {
  return (
    <>
      <Header>
        <Nav />
        <TableIndicator />
      </Header>

      <GridContainer>
        <ProductListPage />
        <Cart />
      </GridContainer>
      <Footer />
    </>
  );
};

export default TablePage;
