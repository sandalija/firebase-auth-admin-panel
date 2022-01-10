import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import Script from "next/script";
import { action } from "mobx";
import { Google } from "../contexts/google-user";

const LoginPage = (props: { google: Google }) => {
  const handleLogin = (resp: any) => {
    action(() => {
      props.google.setUser(resp);
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
    </>
  );
};

export default LoginPage;
