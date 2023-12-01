import React, { useState } from "react";
import styled from "styled-components";
import Emojis from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ onSendMessage }) => {
  const [emoji, setemoji] = useState(false);
  const [mas, setmas] = useState("");
  const emojipicer = () => {
    setemoji(!emoji);
  };
  const handelemojiclick = (e) => {
    let mass = mas + e.emoji;

    setmas(mass);
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    onSendMessage(mas);
    setmas("");
  };
  return (
    <Container>
      <Emoji>
        <div className="emoji">
          <BsEmojiSmileFill onClick={emojipicer} />
          {emoji && <Emojis onEmojiClick={handelemojiclick} />}
        </div>
      </Emoji>
      <Form onSubmit={handelsubmit}>
        <Input
          placeholder="Enter Your Msg"
          value={mas}
          onChange={(e) => setmas(e.target.value)}
        />
        <Button type="submit">
          <IoMdSend />
        </Button>
      </Form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.2rem;
  gap: 1rem;
`;
const Emoji = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  color: white;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .EmojiPickerReact {
      position: absolute;
      top: -460px;
    }
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  border-radius: 2rem;
  background-color: #11404e;
`;
const Input = styled.input`
  width: 90%;
  height: 60%;
  padding-left: 1rem;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.5rem;
  color: white;
  &::selection {
    background-color: #9186f3;
  }
`;
const Button = styled.button`
  padding: 0.3rem 2rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #9186f3;
  height: 100%;

  svg {
    font-size: 2rem;
    color: white;
  }
`;

export default ChatInput;
