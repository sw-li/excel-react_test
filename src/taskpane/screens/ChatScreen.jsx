/* global setTimeout */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

const Root = styled(Container)({
  padding: "32px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  textAlign: "center",
});

const Header = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#333",
});

const ChatWindow = styled(Paper)({
  marginTop: "32px",
  marginBottom: "32px",
  padding: "16px",
  height: "400px",
  overflowY: "scroll",
  backgroundColor: "#fff",
});

const Message = styled(Box)({
  padding: "8px",
  borderRadius: "4px",
  marginBottom: "8px",
  wordBreak: "break-word",
});

const UserMessage = styled(Message)({
  backgroundColor: "#e0e0e0",
  textAlign: "right",
});

const BotMessage = styled(Message)({
  backgroundColor: "#1976d2",
  color: "#fff",
  textAlign: "left",
});

const InputContainer = styled(Box)({
  display: "flex",
  gap: "16px",
});

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response
    const botResponse = { text: "This is a simulated response.", sender: "bot" };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);

    setInput("");
  };

  return (
    <Root maxWidth="md">
      <Header variant="h4">Chatbot Chantier</Header>
      <ChatWindow>
        {messages.map((message, index) => (
          <Box key={index} display="flex" justifyContent={message.sender === "user" ? "flex-end" : "flex-start"}>
            {message.sender === "user" ? (
              <UserMessage>{message.text}</UserMessage>
            ) : (
              <BotMessage>{message.text}</BotMessage>
            )}
          </Box>
        ))}
      </ChatWindow>
      <InputContainer>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Poser votre question à notre chatbot..."
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </InputContainer>
    </Root>
  );
};

export default ChatScreen;
