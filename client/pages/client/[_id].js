import React, { useEffect } from "react";
import Head from "next/head";
import * as cookie from "cookie";
import { auth } from "../../middleware/auth";
import { EditClientForm } from "../../components/client/EditClientForm";
import { getClientById } from "../../middleware/clientMiddleware";

export default function ClientId({ client, token, setTokenHeader }) {
  useEffect(() => {
    setTokenHeader(token);
  }, []);

  return (
    <>
      <Head>
        <title>Edit Client {client.name}</title>
      </Head>
      <main className="container">
        <h3 className="text-center text-uppercase mt-5">
          Edit the information for the client<strong> {client.name} </strong>
        </h3>
        <EditClientForm client={client} token={token} />
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
  const client = await getClientById(context.params._id, token);
  if (!client || client.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        client,
        token,
      },
    };
  }
};
