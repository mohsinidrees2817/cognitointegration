import React, { useContext, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoAuth } from "amazon-cognito-auth-js";
import axios from "axios";

export const Headercontext = createContext();

const HeaderData = ({ children }) => {
  const navigate = useNavigate();
  const [userID, setUserid] = useState("");
  const [comfirmLoader, setConfirmLoader] = useState(false);

  // states for displaying popups
  const [forgetPassword, setForgetPassword] = useState(false);
  const [confirmUser, setConfirmUser] = useState(false);

  // react toast notification
  const [toastmessage, setToastMessage] = useState({
    display: false,
    message: "",
  });

  // loader for social icons
  const [googleLoader, setGoogleloader] = useState(false);
  const [facebookLoader, setFacebookloader] = useState(false);

  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // make a request to the server and include the authorization header
  const verifyJwtFromserver = async (jwttoken) => {
    console.log("i runn");
    const API_URL = "http://localhost:4000";

    try {
      const response = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      });
      console.log(response.data);
      return true;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error!", message);
    }
  };

  // function to parse token which we recieve in url during social login.
  function parseJwt() {
    var authData = {
      UserPoolId: "ap-northeast-1_ZpGAnFl7V",
      ClientId: "7c3np67ouk443m5mmer7ajmi2",
      RedirectUriSignIn: "https://cognito-integration.vercel.app/",
      RedirectUriSignOut: "https://cognito-integration.vercel.app/",
      AppWebDomain: "integration2.auth.ap-northeast-1.amazoncognito.com",
      TokenScopesArray: ["email"],
    };
    var auth = new CognitoAuth(authData);
    auth.userhandler = {
      onSuccess: function (result) {
        let token = result.idToken.jwtToken;
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        let userdata = JSON.parse(jsonPayload);
        let userData = {
          username: userdata?.name,
          userEmail: userdata?.email,
          picture:
            userdata?.identities[0].providerName == "Facebook"
              ? `https://graph.facebook.com/me/picture?access_token=${userdata.picture}`
              : userdata.picture,
          userId: userdata?.identities[0].userId,
          expTime: userdata?.exp,
          provider: userdata?.identities[0].providerName,
        };
        let user_ID = userdata?.identities[0].userId;

        setUserDetails(userData);
        localStorage.setItem("user_details", JSON.stringify(userData));
        setToken(result.accessToken.jwtToken);
        localStorage.setItem("token", result.accessToken.jwtToken);
        setUserid(user_ID);
        localStorage.setItem("user_ID", user_ID);
        navigate("/");
      },
      onFailure: function (err) {
        console.log(err, "errrr");
      },
    };
    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
  }


  // function to check is user logged in or not
  const IsloggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // verifying token on each login that is there is valid token in local storage or not
      const response = await verifyJwtFromserver(token);
      if (response) {
        console.log(response, "response");
        const userDetails = JSON.parse(localStorage.getItem("user_details"));
        const ID = localStorage.getItem("user_ID");
        token && setToken(token);
        userDetails && setUserDetails(userDetails);
        ID && setUserid(ID);
        console.log("User already logged in");
      } else {
        console.log("user have invalid/expired token token");
        alert("Invalid token in local storage");
        localStorage.clear();
        navigate("/signin");
      }
    } else {
      const url = window.location;
      const href = url.href;
      const strs = href.split("#access_token=");
      const access_token = strs.at(1);
      if (access_token !== undefined) {
        parseJwt(access_token);
        console.log("recieved token in url user just logged in");
      } else {
        console.log("user not logged in");
      }
    }
  };

  useEffect(() => {
    IsloggedIn();
  }, []);

  return (
    <Headercontext.Provider
      value={{
        token,
        setToken,
        userDetails,
        setUserDetails,

        forgetPassword,
        setForgetPassword,
        toastmessage,
        setToastMessage,
        googleLoader,
        setGoogleloader,
        facebookLoader,
        setFacebookloader,
        confirmUser,
        setConfirmUser,
        userID,
        setUserid,
        verifyJwtFromserver,
        setConfirmLoader,
        comfirmLoader,
      }}
    >
      {children}
    </Headercontext.Provider>
  );
};

export default HeaderData;
