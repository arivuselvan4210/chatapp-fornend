import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rigisterapi } from "../utils/Apirouter";
import axios from "axios";

const FromeCon = styled.div`
  height: 100vh;
  width: 100wh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .rendom {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h2 {
      color: wheat;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border-radius: 0.4rem;
      border: 0.1rem solid #4e0eff;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        font-weight: bold;
        margin-left: 3px;
      }
    }
  }
`;
const Rigister = () => {
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const tosti = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const history = useNavigate();
  const handelsubmit = async (e) => {
    e.preventDefault();

    handelvaldition();

    if (handelvaldition()) {
      const { username, email, password, confirmpassword } = values;
      await axios
        .post(rigisterapi, {
          username,
          email,
          password,
          confirmpassword,
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          if (data.status === false) {
            toast.error(data.mas, tosti);
          }
          if (data.status === true) {
            localStorage.setItem("chatappuser", JSON.stringify(data.userd));
            history("/setavathar");
          }
        });
    }
  };
  const handelvaldition = () => {
    const { username, email, password, confirmpassword } = values;
    if (password !== confirmpassword) {
      toast.error("passwor and confirm password should be same", tosti);
      return false;
    } else if (username.length <= 3) {
      toast.error("username morethen three letter", tosti);
      return false;
    } else if (email.length <= 3) {
      toast.error("email morethen three letter", tosti);
      return false;
    } else if (password.length <= 8) {
      toast.error("password morethen 8 letter", tosti);
      return false;
    } else if (email === "") {
      toast.error("enter the email", tosti);
      return false;
    } else {
      return true;
    }
  };

  const hamdelChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <FromeCon>
        <form onSubmit={handelsubmit}>
          <div className="rendom">
            <img src={logo} alt="logo" />
            <h2>snappy</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={hamdelChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={hamdelChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={hamdelChange}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmpassword"
            onChange={hamdelChange}
          />
          <button type="submit">Create user</button>
          <span>
            already have an account?<Link to="/login">login</Link>
          </span>
        </form>
      </FromeCon>
      <ToastContainer />
    </div>
  );
};

export default Rigister;
