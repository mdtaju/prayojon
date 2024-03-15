import io from "socket.io-client";
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
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded }) {
        const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("notification", (data) => {
            updateCachedData((draft) => {
              const getElement = draft.find(
                (item) => item?.receiver_id === data?.data?.receiver_id
              );
              if (getElement) {
                draft.unshift(data?.data);
              }
            });
          });
        } catch (error) {}
      },
      providesTags: ["getNotification"],
    }),
    addNotificationRead: builder.mutation({
      query: (data) => ({
        url: "/notification_read",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getNotification"],
    }),
  }),
});

export const {
  useAddNotificationMutation,
  useGetNotificationsQuery,
  useAddNotificationReadMutation,
  util: { getRunningQueriesThunk },
} = notification;
