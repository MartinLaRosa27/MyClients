import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";

module.exports.getClientById = async (id, token) => {
  let client = null;

  const GET_CLIENT_BY_ID = gql`
    query GetClientById($getClientByIdId: String!) {
      getClientById(id: $getClientByIdId) {
        _id
        address
        email
        name
        phone
        updatedAt
      }
    }
  `;

  await axios
    .post(
      `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
      {
        query: print(GET_CLIENT_BY_ID),
        variables: {
          getClientByIdId: id,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then(async (res) => {
      if (!res.data.errors) {
        client = res.data.data.getClientById;
        if (!client._id) {
          client = null;
        }
      } else {
        toast.error(res.data.errors[0].message, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return client;
};
