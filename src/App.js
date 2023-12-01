import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Rigister from "./pages/Rigister";
import Chat from "./pages/Chat";
import SetAvathar from "./pages/SetAvathar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/rigister" element={<Rigister />} />
        <Route path="/setavathar" element={<SetAvathar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
