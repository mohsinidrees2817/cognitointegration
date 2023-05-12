import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/index";
import Innerlayout from "../components/layout/Innerlayout";
// import Header from "../components/Headerdata/HeaderData";
import { Headercontext } from "../components/Maincontext/HeaderData";
import Button from "../components/common/Button";
const Home = () => {
  const navigate = useNavigate();

  const { userDetails, token, setLogin, setToken, setToastMessage } =
    useContext(Headercontext);
  const [logoutState, setLogoutState] = useState(false);

  function logOut() {
    localStorage.clear();
    setToken(null);
    setToastMessage({
      display: true,
      message: "Logged Out Successfully",
    });
    setLogoutState(false);
  }
  return (
    <Layout>
      <Innerlayout heading={"User Data"}>
        {token ? (
          <>
            <div className="">
              <>
                <div className="userdetails-main">
                  <div className="userdetails-inner">
                    {userDetails.picture && (
                      <img src={userDetails.picture} className="userpicture" />
                    )}
                    <p className="">
                      <span className="attribute">Name:</span>{" "}
                      {userDetails.username}
                    </p>
                    <p className="">
                      <span className="attribute">UserEmail:</span>{" "}
                      {userDetails.userEmail}
                    </p>
                    {/* <p className="jwttoken">
                      <span className="attribute">Jwt Token:</span>{" "}
                      {userDetails.alldata?.idToken?.jwtToken}
                    </p> */}
                  </div>
                  <div className="" onClick={logOut}>
                    {/* <img
                        src="../assets/icon/logout.png"
                        className="w-[15px]"
                      /> */}
                    <Button actiontype={"Log Out"} />
                  </div>
                </div>
              </>
            </div>
          </>
        ) : (
          <Link to="/signin">
            <div className="button-logout">
              <Button actiontype={"Sign In"} />
            </div>
          </Link>
        )}
      </Innerlayout>
    </Layout>
  );
};

export default Home;
