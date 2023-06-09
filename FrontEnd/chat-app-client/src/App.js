import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import TryChat from "./pages/TryChat";
import Timer from "./MedisageTimer/Timer";
import UseRefExample from "./MedisageTimer/UseRefExample";

function App() {
  const callbackFunction = (time) => {
    console.log("It is completed");
    // alert('It is completed')
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/tryChat" element={<TryChat />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
      {/* <Timer time={5} direction={"clock"} callback={callbackFunction} />
      <Timer time={10} direction={"anticlock"} callback={callbackFunction} />

      <div style={{ marginTop: "50px" }}>
        <UseRefExample />
      </div> */}
    </>
  );
}

export default App;
