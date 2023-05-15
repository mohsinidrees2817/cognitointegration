import { CognitoUserPool } from "amazon-cognito-identity-js";

export const poolData = {
  UserPoolId: "ap-northeast-1_ZpGAnFl7V",
  ClientId: "7c3np67ouk443m5mmer7ajmi2",
};
export const poolDomain = {
  domain: "https://integration2.auth.ap-northeast-1.amazoncognito.com",
  socialredirecturi: "http://localhost:3001/serververification",
};

export const userPool = new CognitoUserPool(poolData);
