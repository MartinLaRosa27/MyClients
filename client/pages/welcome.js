import React, { useState, useEffect } from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../middleware/auth";
import { CreateAccountModal } from "../components/welcome/CreateAccountModal";
import { LoginModal } from "../components/welcome/LoginModal";

export default function Welcome({ setTokenHeader }) {
  const [modalCreateShow, setModalCreateShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);

  useEffect(()=>{
    setTokenHeader(null);
  },[])

  return (
    <>
      <Head>
        <title>Welcome to MyClients App</title>
      </Head>
      <main className="container">
        <h3 className="mt-5 text-center">
          Welcome to <strong>My Clients App</strong>. The website for al the
          workers who want to have a registration of their clients.
        </h3>
        <h3 className="text-center">
          Start registering your clients for <strong>free</strong> right now!!!
        </h3>
        <div className="mt-5 d-grid gap-2">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setModalCreateShow(true)}
          >
            Create an account
          </button>
          <CreateAccountModal
            show={modalCreateShow}
            onHide={() => setModalCreateShow(false)}
          />
          <hr />
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setModalLoginShow(true)}
          >
            Login with a registered account
          </button>
          <LoginModal
            show={modalLoginShow}
            onHide={() => setModalLoginShow(false)}
          />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  let token;
  if (typeof context.req.headers.cookie !== "string") {
    token = "Invalid token";
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.token;
  }
  if (await auth(token)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};
