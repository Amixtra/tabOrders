import React, { useState } from "react";
import Header from "components/@share/Layout/header/Header";
import GridContainer from "components/@share/Layout/gridContainer/GridContainer";
import Footer from "components/@share/Layout/footer/Footer";
import ProductListPage from "components/Product/ProductList/ProductListPage";
import Cart from "components/Cart/Cart";
import TableIndicator from "components/@share/Layout/indicator/TableIndicator";
import RestaurantIndicator from "components/@share/Layout/indicator/RestaurantIndicator";
import Nav from "components/Nav/Nav";
import AdPage from "components/@share/Layout/ad/Ad";

const TablePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <>
      <Header>
        <TableIndicator />
        <RestaurantIndicator />
      </Header>
      {/* <AdPage /> */}
      <GridContainer>
        <Nav onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
        <ProductListPage selectedCategory={selectedCategory} />
        <Cart />
      </GridContainer>
      <Footer />
    </>
  );
};

export default TablePage;
