import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import io from "socket.io-client";

const socket = io.connect("http://127.0.0.1:5000", {
  //2:connect frontend with socket serever
  transports: ["websocket", "polling"], //without this it will throw error of 404 socket server not found
});

function TryChat() {
  const [isSent, setIsSent] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const [message, setMessage] = useState([]);
  const [senderMessage, setSenderMessage] = useState([]);

  const refMessage = useRef();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //6:receives message which has been broadcast from backend
      console.log("data", data);
      setMessage((pre) => [...pre, data.message]);
      setIsSent(false);
    });
  }, []);

  useEffect(() => {}, [isSent]);

  console.log("message", message);

  const sendMessage = () => {
    setSenderMessage((pre) => [...pre, refMessage.current]);
    socket.emit("send_message", { message: refMessage.current }); //3:send message on backend
    setIsSent(true);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" p="20px">
        <Box>
          {message.length !== 0 &&
            message?.reverse().map((data, index) => (
              <Box display="flex" justifyContent="left">
                <Box
                  p="10px 20px"
                  backgroundColor="#b7d7e8"
                  key={index}
                  textAlign="left"
                  mb="4px"
                  borderRadius="4px"
                  w="auto"
                >
                  {data}
                </Box>
              </Box>
            ))}
          {refMessage.current !== undefined &&
            senderMessage.map((data, index) => (
              <Box display="flex" justifyContent="right">
                <Box
                  p="10px 20px"
                  backgroundColor="#fff2df"
                  textAlign="right"
                  mb="4px"
                  borderRadius="4px"
                  w="auto"
                  key={index}
                >
                  {data}
                </Box>
              </Box>
            ))}
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Input
            borderColor="#87bdd8"
            w="50%"
            backgroundColor="#f0f0f0"
            placeholder="Enter Message"
            onChange={(e) => (refMessage.current = e.target.value)}
            color="#000000"
          />
          <Button colorScheme="blue" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default TryChat;
