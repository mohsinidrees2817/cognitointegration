import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Verifycode from "./components/authentication/Verifycode";
import Requestcode from "./components/authentication/Requestcode";
import HeaderData from "./components/Maincontext/HeaderData";
import ForgotPassword from "./components/authentication/ForgotPassword";
import SetPassword from "./components/authentication/SetPassword";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <HeaderData>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verifycode />} />
          <Route path="/requestcode" element={<Requestcode />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          {/* <Route path="/setpassword" element={<SetPassword />} /> */}

          <Route path="/" element={<Home />} />
        </Routes>
      </HeaderData>
    </BrowserRouter>
  );
}

export default App;
