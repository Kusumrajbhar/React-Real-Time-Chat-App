import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import girl1 from "../assets/girl1.jfif";
import girl2 from "../assets/girl2.jfif";
import girl3 from "../assets/girl3.jfif";
import girl4 from "../assets/girl4.jfif";

export default function SetAvatar() {
  // const api = `https://api.multiavatar.com/Binx Bond.svg`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  console.log("selectedAvatar", selectedAvatar);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      console.log("selectedAvatar in first if", selectedAvatar);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app"));

      console.log(
        "`${setAvatarRoute}/${user._id}`",
        `${setAvatarRoute}/${user._id}`
      );
      console.log("user onclick", user);
      const data = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      console.log("data in setProfilePicture", data);

      if (data.data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        console.log("user.isAvatarImageSet", user.isAvatarImageSet);
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const data = [girl1, girl2, girl3, girl4];
    // const avatarFunction = async() => {
    //   for (let i = 0; i < 4; i++) {
    //     const image = await axios.get(
    //       `${api}/${Math.round(Math.random() * 100)}`
    //     );
    //     const buffer = new Buffer(image.data);
    //     data.push(buffer.toString("base64"));
    //   }
    // }
    // avatarFunction();
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Flex
          display="flex"
          height="100vh"
          width="100vw"
          justifyContent="center"
          alignItems="center"
        >
          <Box as="img" src={loader} alt="loader" className="loader" />
        </Flex>
      ) : (
        <Box
          backgroundColor="#131324"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100vh"
          width="100vw"
        >
          <Box
            as="h2"
            color="#ffffff"
            fontSize="26px"
            fontWeight="700"
            mb="30px"
          >
            Pick an Avatar as your profile picture
          </Box>
          <Box
            display="flex"
            flexDirection={{
              base: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
          >
            {avatars.map((avatar, index) => {
              return (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                  mr="10px"
                >
                  <Box
                    as="img"
                    src={avatar}
                    alt="avatar"
                    key={index}
                    border="0.4rem solid transparent"
                    p="0.4rem"
                    onClick={() => setSelectedAvatar(index)}
                    borderRadius="5rem"
                    height="140px"
                    width="140px"
                  />
                </Box>
              );
            })}
          </Box>
          <Button
            backgroundColor="#4e0eff"
            color="#ffffff"
            p="1rem 2rem"
            border="none"
            fontWeight="bold"
            fontSize="1rem"
            textTransform="uppercase"
            cursor="pointer"
            marginTop="30px"
            onClick={setProfilePicture}
          >
            Set as Profile Picture
          </Button>

          <ToastContainer />
        </Box>
      )}
    </>
  );
}
