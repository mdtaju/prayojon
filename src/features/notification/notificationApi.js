import { apiSlice } from "../api/apiSlice";

export const notification = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNotification: builder.mutation({
      query: (data) => ({
        url: "/notification",
        method: "POST",
        body: data,
      }),
    }),
    getNotifications: builder.query({
      query: (id) => `/notification/${id}`,
    }),
  }),
});

export const {
  useAddNotificationMutation,
  useGetNotificationsQuery,
  util: { getRunningQueriesThunk },
} = notification;
