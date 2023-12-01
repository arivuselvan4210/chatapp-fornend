import React from "react";
import robot from "../assets/robot.gif";
import styled from "styled-components";

export const Welcome = ({ currentuser }) => {
  return (
    <Container>
      <img src={robot} alt="robot" />
      <h2>
        welcome<span>{currentuser.username}</span>
      </h2>
      <h3>please select chat to Start Massaging</h3>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    height: 15rem;
  }
  h2 {
    color: white;
    span {
      margin-left: 1rem;
      color: #4e00ff;
    }
  }
  h3 {
    color: white;
  }
`;
