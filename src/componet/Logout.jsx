import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const hstoye = useNavigate();
  const handelclick = () => {
    localStorage.clear();
    hstoye("/login");
  };
  return (
    <Butten onClick={handelclick}>
      <BiPowerOff />
    </Butten>
  );
};
const Butten = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #963088;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 1rem;
`;
export default Logout;
