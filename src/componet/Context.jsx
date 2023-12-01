import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useState } from "react";
const Context = ({ alluser, currentuser, changechat }) => {
  const [currentselc, setcurrentselc] = useState(undefined);
  const handelset = (context, index) => {
    setcurrentselc(index);
    changechat(context);
  };
  return (
    <Container>
      <Brand>
        <img src={logo} alt="logo" />
        <h1>snaapy</h1>
      </Brand>
      <Contexts>
        {alluser.map((context, index) => (
          <div
            key={index}
            className={currentselc === index ? "selected" : ""}
            onClick={() => handelset(context, index)}
          >
            <img
              src={`data:image/svg+xml;base64,${context.isAvtharImg}`}
              alt="avathar"
            />
            <h1>{context.username}</h1>
          </div>
        ))}
      </Contexts>
      <User>
        <img
          src={`data:image/svg+xml;base64,${currentuser.isAvtharImg}`}
          alt="avathar"
        />
        <h1>{currentuser.username}</h1>
      </User>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  background-color: #080420;
  overflow: hidden;
`;
const Brand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  img {
    height: 3rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
`;
const Contexts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  gap: 1rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  div {
    display: flex;

    gap: 1rem;

    align-items: center;
    width: 90%;
    padding: 0.4rem;
    gap: 1rem;
    border-radius: 0.4rem;
    background-color: #ffffff34;
    cursor: pointer;
  }
  h1 {
    color: white;
    overflow: hidden;
  }

  img {
    height: 2rem;
  }
  .selected {
    background-color: #9a86f3;
  }
`;
const User = styled.div`
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  h1 {
    color: white;
  }

  img {
    height: 2rem;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export default Context;
