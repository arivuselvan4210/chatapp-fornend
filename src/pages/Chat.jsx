import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { alluserapi, host } from "../utils/Apirouter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Context from "../componet/Context";
import { Welcome } from "../componet/Welcome";
import Chatcontainer from "../componet/Chatcontainer";
import { io } from "socket.io-client";
const Chat = () => {
  const histor = useNavigate();
  const [alluser, setalluser] = useState([]);
  const [currentuser, setcurrentuser] = useState({});
  const [currentchat, setcurrentchat] = useState(undefined);
  const handelchangechat = (chat) => {
    setcurrentchat(chat);
  };
  // console.log(currentchat);
  const socket = useRef();
  useEffect(() => {
    const alluserfatch = async () => {
      const locl = await JSON.parse(localStorage.getItem("chatappuser"));
      setcurrentuser(locl);
      if (locl) {
        await axios
          .get(`${alluserapi}/${locl._id}`)
          .then((res) => res.data)
          .then((data) => setalluser(data));
      } else {
        histor("/login");
      }
    };
    alluserfatch();
  }, []);
  useEffect(() => {
    socket.current = io(host);
    socket.current.emit("add-user", currentuser._id);
  }, [currentuser]);

  return (
    <Container>
      <Chatcon>
        <Context
          currentuser={currentuser}
          alluser={alluser}
          changechat={handelchangechat}
        />
        {currentchat === undefined ? (
          <Welcome currentuser={currentuser} />
        ) : (
          <Chatcontainer
            currentchat={currentchat}
            currentuser={currentuser}
            socket={socket}
          />
        )}
      </Chatcon>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
`;
const Chatcon = styled.div`
  display: grid;
  height: 85vh;
  width: 85vw;
  grid-template-columns: 25% 75%;
  background-color: #00000076;
`;
export default Chat;
