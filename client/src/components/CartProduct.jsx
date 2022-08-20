import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import DeleteIcon from "@material-ui/icons/Delete";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const CartProduct = ({ data, handleDelete }) => {
  return (
    <Product>
      <ProductDetail>
        <Image src={data.img} />
        <Details>
          <ProductId>
            <b>Product ID:</b> {data.id}
          </ProductId>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductPrice>{data.price}</ProductPrice>
      </PriceDetail>
      <PriceDetail>
        <DeleteIcon onClick={(e) => handleDelete(data._id)} />
      </PriceDetail>
    </Product>
  );
};

export default CartProduct;
