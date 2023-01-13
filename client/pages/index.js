import React, {useEffect} from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { ClientTable } from "../components/home/ClientTable";
import { NewClient } from "../components/home/NewClient";
import { auth } from "../middleware/auth";

export default function Home({ token, setTokenHeader }) {

  useEffect(()=>{
    setTokenHeader(token);
  },[])

  return (
    <>
      <Head>
        <title>MyClients App - Home</title>
      </Head>
      <main className="container">
        <NewClient token={token} />
        <ClientTable token={token} />
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
  if (!(await auth(token))) {
    return {
      redirect: {
        destination: "/welcome",
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
