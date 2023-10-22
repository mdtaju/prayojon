import { apiSlice } from "../api/apiSlice";

export const userPostApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralPosts: builder.query({
      query: () => "/user_post_general",
    }),
    getProductPosts: builder.query({
      query: () => "/user_post_product",
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const { result: data } = await queryFulfilled;
      //     dispatch(addProductPost(data));
      //   } catch (error) {
      //     dispatch(addProductPost([]));
      //   }
      // },
    }),
    getProductPostsForPersonal: builder.query({
      query: (id) => `/product_get_user/${id}`,
    }),
    getGeneralPostsForPersonal: builder.query({
      query: (id) => `/post_get_user/${id}`,
    }),
    getUPostsImages: builder.query({
      query: () => "/user_post_files",
      providesTags: ["getImages"],
    }),
    // getComments: builder.query({
    //   query: () => "/user_post_comments",
    //   providesTags: ["getComments"],
    // }),
    // getReacts: builder.query({
    //   query: () => "/user_post_reacts",
    //   providesTags: ["getReacts"],
    // }),
    getFollower: builder.query({
      query: (id) => `/follower/${id}`,
    }),
    getFollowing: builder.query({
      query: (id) => `/following/${id}`,
    }),
    getUserPurchase: builder.query({
      query: (id) => `/user_orders_get/${id}`,
    }),
    getUserPurchaseOrders: builder.mutation({
      query: (id) => ({
        url: `/order_products_get`,
        method: "POST",
        body: id,
      }),
    }),
    // getSimilarProducts: builder.query({
    //   query: (id) => `/similar_product/${id}`
    // }),
    addReacts: builder.mutation({
      query: (data) => ({
        url: "/user_post_reacts",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResultProduct = dispatch(
          apiSlice.util.updateQueryData(
            "getProductPosts",
            undefined,
            (draft) => {
              const element = draft?.find(
                (product) => product?.id === arg?.post_id
              );
              if (element?.id && arg?.post_type === "Product") {
                const getElement = element?.reacts?.find(
                  (react) =>
                    react?.user_id === arg?.user_id &&
                    react?.post_type === "Product" &&
                    react?.post_id === arg?.post_id
                );
                if (getElement?.post_type === "Product") {
                  getElement.react_type = arg?.react_type;
                } else {
                  element?.reacts?.push(arg);
                }
              }
            }
          )
        );
        const patchResultGeneral = dispatch(
          apiSlice.util.updateQueryData(
            "getGeneralPosts",
            undefined,
            (draft) => {
              const element = draft?.find(
                (general) => general?.id === arg?.post_id
              );
              if (element?.id && arg?.post_type === "General") {
                const getElement = element?.reacts?.find(
                  (react) =>
                    react?.user_id === arg?.user_id &&
                    react?.post_type === "General" &&
                    react?.post_id === arg?.post_id
                );
                if (getElement?.post_type === "General") {
                  getElement.react_type = arg?.react_type;
                } else {
                  element?.reacts?.push(arg);
                }
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResultProduct.undo();
          patchResultGeneral.undo();
        }
      },
    }),
    removeReact: builder.mutation({
      query: (data) => ({
        url: `/user_post_react_remove`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getProductPosts",
            undefined,
            (draft) => {
              if (arg?.post_type === "Product") {
                const getElement = draft?.find(
                  (product) => product?.id === arg?.post_id
                );
                if (getElement?.id) {
                  for (let i = 0; i < getElement?.reacts?.length; ) {
                    const element = getElement?.reacts[i];
                    if (
                      element?.post_id === arg?.post_id &&
                      element?.user_id === arg?.user_id
                    ) {
                      getElement?.reacts?.splice(i, 1);
                    }
                    i++;
                  }
                }
              }
            }
          )
        );
        const patchResultGeneral = dispatch(
          apiSlice.util.updateQueryData(
            "getGeneralPosts",
            undefined,
            (draft) => {
              if (arg?.post_type === "General") {
                const getElement = draft?.find(
                  (general) => general?.id === arg?.post_id
                );
                if (getElement?.id) {
                  for (let i = 0; i < getElement?.reacts?.length; ) {
                    const element = getElement?.reacts[i];
                    if (
                      element?.post_id === arg?.post_id &&
                      element?.user_id === arg?.user_id
                    ) {
                      getElement?.reacts?.splice(i, 1);
                    }
                    i++;
                  }
                }
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          patchResultGeneral.undo();
        }
      },
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: "/user_post_comments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResultProduct = dispatch(
          apiSlice.util.updateQueryData(
            "getProductPosts",
            undefined,
            (draft) => {
              for (let i = 0; i < draft.length; i++) {
                const element = draft[i];
                if (element?.id === arg?.post_id) {
                  element?.comments?.push(arg);
                }
              }
            }
          )
        );
        const patchResultGeneral = dispatch(
          apiSlice.util.updateQueryData(
            "getGeneralPosts",
            undefined,
            (draft) => {
              for (let i = 0; i < draft.length; i++) {
                const element = draft[i];
                if (element?.id === arg?.post_id) {
                  element?.comments?.push(arg);
                }
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResultProduct.undo();
          patchResultGeneral.undo();
        }
      },
    }),
    addGeneralPost: builder.mutation({
      query: (data) => ({
        url: "/user_post_general",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: result } = await queryFulfilled;
          console.log(arg);
          dispatch(
            apiSlice.util.updateQueryData(
              "getGeneralPosts",
              undefined,
              (draft) => {
                draft.unshift(result);
              }
            )
          );
        } catch (error) {}
      },
      // invalidatesTags: ["getImages", "getGeneralPosts"],
    }),
    addProductPost: builder.mutation({
      query: (data) => ({
        url: "/user_post_product",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: result } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getProductPosts",
              undefined,
              (draft) => {
                draft.unshift(result);
              }
            )
          );
        } catch (error) {}
      },
      // invalidatesTags: ["getImages", "getProductPosts"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/product_update",
        method: "POST",
        body: data,
      }),
    }),
    addFollower: builder.mutation({
      query: (data) => ({
        url: "/follower",
        method: "POST",
        body: data,
      }),
    }),
    unfollow: builder.mutation({
      query: (data) => ({
        url: "/unfollow",
        method: "POST",
        body: data,
      }),
    }),
    removeFile: builder.mutation({
      query: (id) => ({
        url: `/remove_file/${id}`,
        method: "DELETE",
      }),
    }),
    productDelete: builder.mutation({
      query: (id) => ({
        url: `/product_update/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGeneralPostsQuery,
  useGetProductPostsQuery,
  useAddGeneralPostMutation,
  useAddProductPostMutation,
  // useGetCommentsQuery,
  useAddCommentMutation,
  useGetUPostsImagesQuery,
  // useGetReactsQuery,
  useAddReactsMutation,
  useGetFollowerQuery,
  useGetFollowingQuery,
  useAddFollowerMutation,
  useUnfollowMutation,
  useGetProductPostsForPersonalQuery,
  useUpdateProductMutation,
  useRemoveFileMutation,
  useProductDeleteMutation,
  useGetGeneralPostsForPersonalQuery,
  useGetUserPurchaseQuery,
  useGetUserPurchaseOrdersMutation,
  useRemoveReactMutation,
  util: { getRunningQueriesThunk },
} = userPostApi;
