import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CartProduct from "../components/CartProduct";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 400px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("user/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
        setTotal(
          "$ " +
            res.data.reduce((a, val) => {
              return a + Number(val.price.substring(1));
            }, 0)
        );
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("user/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: id,
        },
      })
      .then((res) => {
        const reducedList = cartItems.filter((val) => val._id != id);
        setCartItems(reducedList);
        setTotal(
          "$ " +
            reducedList.reduce((a, val) => {
              return a + Number(val.price.substring(1));
            }, 0)
        );
      });
  };

  const placeOrder = () => {
    axios
      .put(
        "user/placeorder",
        {
          items: cartItems,
          price: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Order successful");
      });
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartItems?.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopTexts></TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cartItems?.map((val, index) => (
              <CartProduct data={val} key={index} handleDelete={handleDelete} />
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={placeOrder}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
