import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #e2e2e2;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.button`
  margin: 5px 0px;
  font-size: 12px;
  background: transparent;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.clear();
          // console.log("token", res.data.accessToken);
          localStorage.setItem("token", res.data.accessToken);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">LOGIN</Button>
          <Link>FORGOT PASSWORD</Link>
          <Link onClick={() => navigate("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
