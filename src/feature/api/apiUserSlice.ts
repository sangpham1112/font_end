import { User } from "../../types";
import { initialState } from "../../utils/useUpdateFormHook";
import { apiSlice } from "./index";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<User, initialState>({
      query: (user) => ({
        url: "/api/users/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, initialState>({
      query: (data) => ({
        url: "/api/users/profile/" + data._id,
        method: "PUT",
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<User, initialState>({
      query: (data) => ({
        url: `/api/users/signin`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useLoginMutation,
} = userApiSlice;
