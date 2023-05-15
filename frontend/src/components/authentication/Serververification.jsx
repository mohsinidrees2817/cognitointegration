import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoAuth } from "amazon-cognito-auth-js";
import { Headercontext } from "../Maincontext/HeaderData";
import { useState } from "react";
import { poolData } from "../../config/cognito";

const Serververification = () => {
  const navigate = useNavigate();
  const [pagetext, setPagetext] = useState(".......");
  const { setUserDetails, setToken, setUserid, verifyJwtFromserver } =
    useContext(Headercontext);
  useEffect(() => {
    const url = window.location;
    const href = url.href;
    const strs = href.split("#access_token=");
    const access_token = strs.at(1);
    if (access_token !== undefined) {
      setPagetext("verifying from server...");
      parseJwt();
      console.log("recieved token in url user just logged in");
    } else {
      console.log("user not logged in");
    }
  }, []);

  async function parseJwt() {
    var authData = {
      UserPoolId: poolData.UserPoolId,
      ClientId: poolData.ClientId,
      RedirectUriSignIn: "http://localhost:3001/serververification",
      RedirectUriSignOut: "http://localhost:3001/home",
      AppWebDomain: "integration2.auth.ap-northeast-1.amazoncognito.com",
      TokenScopesArray: ["email"],
    };
    var auth = new CognitoAuth(authData);
    auth.userhandler = {
      onSuccess: async function (result) {
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
        const response = await verifyJwtFromserver(result.accessToken.jwtToken);
        if (response !== null && response !== undefined) {
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
        } else {
          console.log("invalid jwt token");
          localStorage.clear();
          navigate("/signin");
          alert("fail to login try again later");
        }
      },
      onFailure: function (err) {
        console.log(err, "errrr");
      },
    };
    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
  }

  return <div className="serverVerification">{pagetext}</div>;
};

export default Serververification;
