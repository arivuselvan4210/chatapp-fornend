// import React, { useEffect, useRef, useState } from "react";
// import styled, { keyframes } from "styled-components";
// import Logout from "./Logout";
// import ChatInput from "./ChatInput";
// import { v4 as uuidv4 } from "uuid";

// import axios from "axios";
// import { allmasapi, masapi } from "../utils/Apirouter";

// export const Chatcontainer = ({ currentchat, currentuser, socket }) => {
//   const scrollRef = useRef();
//   const [mas, setmas] = useState([]);
//   const [arriv, setarriv] = useState(null);
//   // console.log(arriv);
//   console.log(mas);
//   useEffect(() => {
//     const allmasfatch = async () => {
//       await axios
//         .post(allmasapi, {
//           to: currentchat._id,
//           from: currentuser._id,
//         })
//         .then((res) => res.data)
//         .then((data) => setmas(data));
//     };
//     allmasfatch();
//   }, [currentchat]);
//   const handelsentmas = async (mag) => {
//     await axios
//       .post(masapi, {
//         massage: mag,
//         from: currentuser._id,
//         to: currentchat._id,
//       })
//       .then((res) => res.data);

//     socket.current.emit("send-mas", {
//       massage: mag,
//       from: currentuser._id,
//       to: currentchat._id,
//     });
//     const mass = [...mas];
//     mas.push({ fromself: true, massage: mag });
//     setmas(mass);
//   };
//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recive", (data) => {
//         console.log(data);
//         setarriv({ fromself: false, massage: data });
//       });
//     }
//   }, []);
//   useEffect(() => {
//     arriv && setmas((prev) => [...prev, arriv]);
//   }, [arriv]);
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [mas]);
//   return (
//     <Container>
//       <ChatHeat>
//         <Userdedails>
//           <img
//             src={`data:image/svg+xml;base64,${currentchat.isAvtharImg}`}
//             alt="avathar"
//           />
//           <h2>{currentchat.username}</h2>
//         </Userdedails>
//         <Logout />
//       </ChatHeat>
//       <Massage>
//         {mas.map((mas) => (
//           <div ref={scrollRef} key={uuidv4()}>
//             <div className={`massage ${mas.fromself ? "senter" : "reciver"}`}>
//               <p>{mas.massage}</p>
//             </div>
//           </div>
//         ))}
//       </Massage>
//       <ChatInput handelsentmas={handelsentmas} />
//     </Container>
//   );
// };
// const Container = styled.div`
//   padding: 1rem;
//   display: grid;
//   grid-template-rows: 10% 78% 12%;
//   overflow: hidden;
// `;
// const ChatHeat = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.2rem;
// `;
// const Userdedails = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   img {
//     height: 3rem;
//   }
//   h2 {
//     color: white;
//   }
// `;
// const Massage = styled.div`
//   padding: 1rem 2rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   overflow: auto;
//   .massage {
//     display: flex;
//     align-items: center;
//     p {
//       max-width: 40%;
//       overflow-wrap: break-word;
//       padding: 1rem;
//       font-size: 1.1rem;
//       border-radius: 1rem;
//       color: #d1d1d1;
//     }
//   }
//   .senter {
//     justify-content: flex-end;
//     p {
//       background-color: #4f04ff21;
//     }
//   }
//   .reciver {
//     justify-content: flex-start;
//     p {
//       background-color: #9900ff20;
//     }
//   }
// `;
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { allmasapi, masapi } from "../utils/Apirouter";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
// import massage from "../../../server/module/massage";

const Chatcontainer = ({ currentchat, currentuser, socket }) => {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const response = await axios.post(allmasapi, {
          to: currentchat._id,
          from: currentuser._id,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAllMessages();
  }, [currentchat, currentuser]);

  const handleSendMessage = async (message) => {
    try {
      await axios.post(masapi, {
        massage: message,
        from: currentuser._id,
        to: currentchat._id,
      });

      socket.current.emit("send-mas", {
        massage: message,
        from: currentuser._id,
        to: currentchat._id,
      });

      const newMessages = [...messages, { fromself: true, massage: message }];
      setMessages(newMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recive", (data) => {
        console.log(data);
        setIncomingMessage({ fromself: false, massage: data });
      });
    }
  }, []);

  useEffect(() => {
    if (incomingMessage) {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }
  }, [incomingMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <ChatHeader>
        <UserDetails>
          <img
            src={`data:image/svg+xml;base64,${currentchat.isAvtharImg}`}
            alt="avatar"
          />
          <h2>{currentchat.username}</h2>
        </UserDetails>
        <Logout />
      </ChatHeader>
      <MessagesContainer>
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div
              className={`message ${message.fromself ? "senter" : "reciver"}`}
            >
              <p>{message.massage}</p>
            </div>
          </div>
        ))}
      </MessagesContainer>
      <ChatInput onSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  img {
    height: 3rem;
  }
  h2 {
    color: white;
  }
`;

const MessagesContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    p {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }
  .senter {
    justify-content: flex-end;
    p {
      background-color: #4f04ff21;
    }
  }

  .reciver {
    justify-content: flex-start;
    p {
      background-color: #9900ff20;
    }
  }
`;

export default Chatcontainer;
