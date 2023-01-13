import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";
import axios from "axios";

export const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    clientsList: null,
  },
  reducers: {
    setClientsList: (state, action) => {
      state.clientsList = action.payload;
    },
  },
});
export default clientSlice.reducer;
const { setClientsList } = clientSlice.actions;

// --------------------------------------------------------------------------------------------------
export const getAllClients = (token) => {
  const GET_ALL_CLIENTS = gql`
    query Query {
      getAllClients {
        _id
        address
        email
        name
        phone
        updatedAt
      }
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(GET_ALL_CLIENTS),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(async (res) => {
        if (!res.data.errors) {
          dispatch(setClientsList(res.data.data.getAllClients));
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
  };
};

// --------------------------------------------------------------------------------------------------
export const postClient = async (form, token) => {
  const POST_CLIENT = gql`
    mutation PostClient($input: clientInput) {
      postClient(input: $input)
    }
  `;
  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(POST_CLIENT),
          variables: {
            input: form,
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
          toast.success(res.data.data.postClient, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(getAllClients(token));
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
  };
};

// --------------------------------------------------------------------------------------------------
export const deleteClient = (id, token) => {
  const DELETE_CLIENT = gql`
    mutation DeleteClient($deleteClientId: String!) {
      deleteClient(id: $deleteClientId)
    }
  `;
  return async (dispatch) => {
    let postConfirmation = false;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(DELETE_CLIENT),
          variables: {
            deleteClientId: id,
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
          toast.success(res.data.data.deleteClient, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(getAllClients(token));
          postConfirmation = true;
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
    return postConfirmation;
  };
};

export const patchClient = async (form, id, token) => {
  const PATCH_CLIENT = gql`
    mutation PatchClient($patchClientId: String!, $input: clientInput) {
      patchClient(id: $patchClientId, input: $input)
    }
  `;

  return async (dispatch) => {
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        {
          query: print(PATCH_CLIENT),
          variables: {
            input: form,
            patchClientId: id,
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
          toast.success(res.data.data.patchClient, {
            style: {
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(getAllClients(token));
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
  };
};
