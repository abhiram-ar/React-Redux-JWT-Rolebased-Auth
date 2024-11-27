import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./../slices/authSlice";
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        console.log("token req", token);
        console;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log("modified basequery", result);
    if (result?.error?.status === 401) {
        // get a fresh access token
        // refersh token will be provider by browser as cookie
        const refershResult = await baseQuery("/refersh", api, extraOptions);
        if (refershResult?.data) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
        }),
        refersh: builder.mutation({
            query: () => ({
                url: "/refresh",
                method: "POST",
            }),
        }),
        getUserDetails: builder.query({
            query: () => "user/profile",
        }),
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: "/user/updateProfilePic",
                method: "PATCH",
                body: formData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRefershMutation,
    useUpdateProfileImageMutation,
    useGetUserDetailsQuery,
} = api;
export default api;
