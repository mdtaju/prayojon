import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPersonalInfo: builder.mutation({
      query: (data) => ({
        url: "/personal_info",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          console.log(arg);
        } catch (error) {}
      },
    }),
    addSecurityInfo: builder.mutation({
      query: (data) => ({
        url: "/security_info",
        method: "POST",
        body: data,
      }),
    }),
    addProfilePic: builder.mutation({
      query: (data) => ({
        url: "/profile_photo",
        method: "POST",
        body: data,
      }),
    }),
    addCoverPic: builder.mutation({
      query: (data) => ({
        url: "/cover_photo",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (id) => `/auth_user/${id}`,
    }),
    getNearPeople: builder.query({
      query: (id) => `/near_people/${id}`,
    }),
    getTopUsers: builder.query({
      query: () => `/top_users`,
    }),
  }),
});

export const {
  useAddPersonalInfoMutation,
  useAddProfilePicMutation,
  useAddCoverPicMutation,
  useGetUserQuery,
  useAddSecurityInfoMutation,
  useGetNearPeopleQuery,
  useGetTopUsersQuery,
  util: { getRunningQueriesThunk },
} = profileApi;
