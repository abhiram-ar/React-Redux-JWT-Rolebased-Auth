import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./../slices/authSlice";
import { setCredentials } from "./../slices/authSlice";
import { jwtDecode } from "jwt-decode";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log("modified basequery: ", result);

    // 401 - accesToken expired or invalid
    // 401 - no accessToken in the header,cold start fix
    if (result?.error?.status === 401) {
        // get a fresh access token
        // refersh token will be provider by browser as cookie
        const newAccessToken = await baseQuery("/refresh", api, extraOptions);
        console.log("refreshed access token:  ", newAccessToken);

        if (newAccessToken?.data) {
            const payload = jwtDecode(newAccessToken.data);
            api.dispatch(
                setCredentials({
                    token: newAccessToken.data,
                    user: payload.username,
                })
            );

            //retry the failed request
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["userProfile", "allUsers"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        getUserDetails: builder.query({
            query: () => "user/profile",
            providesTags: ["userProfile"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
        }),
        refersh: builder.query({
            query: () => "/refresh",
        }),
        updateProfileImage: builder.mutation({
            query: (formData) => ({
                url: "/user/updateProfilePic",
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["userProfile"],
        }),
        getAllUsers: builder.query({
            query: () => "/admin/users",
            providesTags: ["allUsers"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/admin/user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["allUsers"],
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `admin/user/${data["_id"]}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["allUsers"],
        }),
        registerUser: builder.mutation({
            query: (formdata) => ({
                url: "auth/signup",
                method: "POST",
                body: formdata,
            }),
            invalidatesTags: ["allUsers"],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRefershQuery,
    useGetUserDetailsQuery,
    useUpdateProfileImageMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useEditUserMutation,
    useRegisterUserMutation
} = api;
export default api;
