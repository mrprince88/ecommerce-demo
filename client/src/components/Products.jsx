import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios.get("/product").then((res) => setProducts(res.data));
  }, []);

  return (
    <Container>
      {products?.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
