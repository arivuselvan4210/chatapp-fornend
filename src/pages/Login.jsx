import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginapi } from "../utils/Apirouter";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: #00000076;
  padding: 2rem 3rem;
  border-radius: 2rem;
`;
const Input = styled.input`
  background-color: inherit;
  width: 100%;
  border: none;
  font-size: 1rem;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
`;
const Butten = styled.button`
  background-color: #4e0eff;
  color: white;
  text-transform: uppercase;
  padding: 1rem 2rem;
  font-size: 1rem;
  width: 100%;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
`;
const Span = styled.span`
  color: white;
  text-transform: uppercase;
  a {
    text-decoration: none;
  }
`;

const Logo = styled.img`
  height: 5rem;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  margin: 1rem auto;
`;
const Brand = styled.h2`
  color: white;
  text-transform: uppercase;
`;
const Login = () => {
  const history = useNavigate();
  const tost = {
    position: "bottom-left",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [valus, setvalus] = useState({
    username: "",
    password: "",
  });

  const handelchange = (e) => {
    setvalus({ ...valus, [e.target.name]: e.target.value });
  };
  const handelsubmit = async (e) => {
    const { username, password } = valus;

    e.preventDefault();
    handelval();
    if (handelval()) {
      const { data } = await axios.post(loginapi, {
        username,
        password,
      });
      if (data.status === false) {
        return toast.error(data.msg, tost);
      } else {
        localStorage.setItem("chatappuser", JSON.stringify(data.usercheck));
        history("/");
      }
    }
  };
  const handelval = () => {
    const { username, password } = valus;
    if (username === "") {
      toast.error("please enter username", tost);
      return false;
    } else if (password === "") {
      toast("please enter password", tost);
      return false;
    } else {
      return true;
    }
  };
  return (
    <Container>
      <Form onSubmit={handelsubmit}>
        <Main>
          <Logo src={logo} alt="logo" />
          <Brand>snappy</Brand>
        </Main>
        <Input
          placeholder="UserName"
          type="text"
          name="username"
          onChange={handelchange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={handelchange}
        />
        <Butten type="submit">LogIn</Butten>
        <Span>
          Aleredy create accont?
          <Link to={"/rigister"}>Rigister</Link>
        </Span>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Login;
