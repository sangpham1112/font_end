import { Comment } from "../../types";
import { initialState } from "../../utils/useUpdateFormHook";
import { apiSlice } from "./index";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsBySlug: builder.query<Comment[], string>({
      query: (slug) => `/api/comments/${slug}`,
      providesTags: [{ type: "Comment" }],
    }),
    createComment: builder.mutation<Comment, initialState>({
      query: (data) => ({
        url: `/api/comments/`,
        method: "POST",
        body: {
          username: data.username,
          text: data.text,
          slug: data.slug,
          rating: data.rating,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Comment" }, { type: "Product" }],
    }),
  }),
});

export const { useGetCommentsBySlugQuery, useCreateCommentMutation } =
  commentApiSlice;
