import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";
import { print } from "graphql";
import gql from "graphql-tag";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {},
});
export default userSlice.reducer;
const expSecCookies = 18000;

// --------------------------------------------------------------------------------------------------
export const postUser = async (userForm) => {
  let userConfirmation = false;
  const POST_USER = gql`
    mutation Mutation($input: usuarioInput) {
      postUser(input: $input) {
        token
      }
    }
  `;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      query: print(POST_USER),
      variables: {
        input: {
          email: userForm.email,
          password: userForm.password,
          passwordAux: userForm.passwordAux,
        },
      },
    })
    .then(async (res) => {
      if (!res.data.errors) {
        const cookies = new Cookies();
        cookies.set("token", res.data.data.postUser.token, {
          path: "/",
          maxAge: expSecCookies,
        });
        toast.success("User created successfully", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        userConfirmation = true;
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
  return userConfirmation;
};

// --------------------------------------------------------------------------------------------------
export const authenticateUser = async (userForm) => {
  let userConfirmation = false;
  const AUTHENTICATE_USER = gql`
    mutation Mutation($input: usuarioInput) {
      authenticateUser(input: $input) {
        token
      }
    }
  `;
  await axios
    .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      query: print(AUTHENTICATE_USER),
      variables: {
        input: {
          email: userForm.email,
          password: userForm.password,
        },
      },
    })
    .then(async (res) => {
      if (!res.data.errors) {
        const cookies = new Cookies();
        cookies.set("token", res.data.data.authenticateUser.token, {
          path: "/",
          maxAge: expSecCookies,
        });
        userConfirmation = true;
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
  return userConfirmation;
};

// --------------------------------------------------------------------------------------------------
export const logout = () => {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });
  window.location.reload();
};
