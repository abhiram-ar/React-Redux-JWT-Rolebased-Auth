import { useState } from "react";
import {
    useLogoutMutation,
    useUpdateProfileImageMutation,
} from "./../../redux/api/api";
import { useGetUserDetailsQuery } from "./../../redux/api/api";
import { setCredentials } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { logout as clearStore } from "./../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadImage, { isLoading }] = useUpdateProfileImageMutation();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        data,
        isFetching, //greyout if have time
        isSuccess,
    } = useGetUserDetailsQuery();

    if (isSuccess) {
        console.log(data);
    }

    const handleProfilePicUpdate = async () => {
        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const response = await uploadImage(formData).unwrap();
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setSelectedImage(null);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout().unwrap();
            console.log("logoutResponse", response);

            dispatch(clearStore());
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                className="absolute right-16 top-5 px-3 py-2 rounded-2xl font-semibold border border-black  bg-[#8B8B8B] hover:bg-red-500"
            >
                Logout
            </button>

            <h1 className="text-2xl bg-[#F2FED1] w-fit font-bold p-2 mt ms-16 mt-5">
                hello {isSuccess && data.username}
            </h1>
            <div className="m-auto w-fit flex flex-col gap-10 justify-center items-center mt-20 border border-black p-10 rounded-lg bg-zinc-200">
                <div className="size-44 overflow-hidden border rounded-xl border-black shadow-[0px_10px_0px_-2px_rgba(0,0,0,1)]">
                    <img
                        src={`${isSuccess ? data.profilePicURL : ""}`}
                        alt=""
                    />
                </div>
                <input
                    type="file"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="bg-[rgb(237,244,254)]  px-3 py-1 rounded-2xl border border-black hover:bg-blue-400"
                />
                <button
                    onClick={handleProfilePicUpdate}
                    disabled={isLoading}
                    className=" bg-[#F2FED1] border  border-black px-3 py-1 rounded-2xl hover:bg-[#ABF600]"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default Home;
