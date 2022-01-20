import React, { useState, useEffect } from "react";
import GoogleLogin, { useGoogleLogin } from "react-google-login";
import Script from "next/script";
import { action } from "mobx";
import { Google } from "../contexts/google-user";

const LoginPage = (props: { google: Google }) => {
  const [token, setToken] = useState<string>("");
  const handleLogin = (resp: any) => {
    console.log("login", resp);
    window.localStorage.setItem("idToken", resp.tokenId);
    window.localStorage.setItem("accessToken", resp.accessToken);
  };

  const handlePress = () => {
    fetch("/api/create-user", {
      headers: { authorization: window.localStorage.getItem("idToken") },
    });
  };

  return (
    <>
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_APP}`}
        onSuccess={(response) => {
          console.log(response);
          handleLogin(response);
        }}
        onFailure={(r) => console.log(r)}
      />
      <button onClick={handlePress}>Api call!</button>
    </>
  );
};

export default LoginPage;
