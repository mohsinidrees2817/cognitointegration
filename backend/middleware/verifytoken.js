const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader) {~
    res.status(401).send("Unauthorized");
  }

  const token = authorizationHeader.replace("Bearer ", "");
  const verifier = CognitoJwtVerifier.create({
    userPoolId: "ap-northeast-1_ZpGAnFl7V",
    tokenUse: "access",
    clientId: "7c3np67ouk443m5mmer7ajmi2",
    Issuer:
      "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_ZpGAnFl7V",
  });

  console.log(token);
  try {
    const payload = await verifier.verify(token);

    req.user = {
      id: payload.sub,
      username: payload.username,
      scope: payload.scope,
    };
    console.log("Token is valid. Payload:", payload);
    res.status(200).send("Token is valid");

    next();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log("Token not valid!", message);
    res.status(401).send("Token not valid!");
  }
};

module.exports = {
  verifyToken,
};
