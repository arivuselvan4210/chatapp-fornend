import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setavatharapi } from "../utils/Apirouter";
import { useNavigate } from "react-router-dom";

const SetAvathar = () => {
  const histr = useNavigate();
  const [avathar, setavathar] = useState([]);
  const [isSlected, setisSlected] = useState(undefined);
  const [loding, setloding] = useState(true);
  const api = "https://api.multiavatar.com/45678945";
  const toste = {
    theme: "dark",
    pauseOnHover: true,
    draggable: true,
    autoClose: 5000,
    position: "bottom-left",
  };
  const setAvthar = async () => {
    if (isSlected === undefined) {
      toast.error("please select avathet", toste);
    } else {
      const usered = await JSON.parse(localStorage.getItem("chatappuser"));
      const { data } = await axios.put(`${setavatharapi}/${usered._id}`, {
        image: avathar[isSlected],
      });
      console.log(data.userone);
      if (data.userone.isAvthar) {
        // localStorage.setItem(("chatappuser", JSON.stringify(data.userone)));
        localStorage.setItem("chatappuser", JSON.stringify(data.userone));
        histr("/");
      }
    }
  };
  useEffect(() => {
    const avathas = async () => {
      try {
        const datad = [];
        for (let i = 0; i < 4; i++) {
          await axios
            .get(`${api}/${Math.round(Math.random() * 1000)}`)
            .then((res) => res.data)
            .then((data) => {
              const buffer = new Buffer(data);
              datad.push(buffer.toString("base64"));
            });
        }
        setavathar(datad);
        setloding(false);
      } catch (error) {
        console.log(error);
      }
    };
    avathas();
  }, []);
  console.log(isSlected);

  return (
    <>
      {loding ? (
        <Container>
          <img src={loader} alt="loadser" />
        </Container>
      ) : (
        <Container>
          <h1>pick an avatar as your profile picture</h1>
          <Avathar>
            {avathar.map((avtha, index) => (
              <div
                key={index}
                className={`avatha ${isSlected === index ? "selected" : ""}`}
              >
                <Img
                  src={`data:image/svg+xml;base64,${avtha}`}
                  alt="avathar"
                  onClick={() => setisSlected(index)}
                />
              </div>
            ))}
          </Avathar>
          <Button onClick={setAvthar}>set as profile pitcher</Button>s
        </Container>
      )}
      <ToastContainer />
    </>
  );
};
const Container = styled.div`
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: white;
    padding: 1rem;
    font-size: 3rem;
  }
`;
const Img = styled.img`
  height: 6rem;
`;
const Avathar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* gap: 1rem; */
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5rem;
    padding: 0.4rem;
    border: 0.4rem solid #131324;
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
`;
const Button = styled.button`
  margin-top: 1rem;
  background-color: inherit;
  font-size: 2rem;
  padding: 1rem 2rem;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem;
  border: 0.1rem solid #4e0eff;
`;
export default SetAvathar;
