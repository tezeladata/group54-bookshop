import {Routes, Route} from "react-router";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Panel from "./Pages/Panel";
import Books from "./Pages/Books";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </>
  )
};

export default App;