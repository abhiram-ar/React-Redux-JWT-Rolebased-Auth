import { useState } from "react";
import {
    useLogoutMutation,
    useUpdateProfileImageMutation,
} from "./../../redux/api/api";
import { useGetUserDetailsQuery } from "./../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { logout as clearStore } from "./../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import defaultProfilePic from "./../../assets/noProfileAvatar.png";
import toast, { Toaster } from "react-hot-toast";
import {useRef} from "react"
import api from "./../../redux/api/api"

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadImage, { isLoading }] = useUpdateProfileImageMutation();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        data,
        isSuccess,
    } = useGetUserDetailsQuery();

    const fileUploadInput = useRef(null)

    if (isSuccess) {
        console.log(data);
    }

    const handleProfilePicUpdate = async () => {
        const formData = new FormData();
        formData.append("image", selectedImage);
        toast("uploading...")

        try {
            const response = await uploadImage(formData).unwrap();
            console.log(response);
            toast.success("Image updated")
            fileUploadInput.current.value = ""
        } catch (error) {
            console.log(error);
            toast.error("Unable to update image")
        } finally {
            setSelectedImage(null);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await logout().unwrap();
            console.log("logoutResponse", response);
            dispatch(clearStore());
            dispatch(api.util.resetApiState());
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Toaster/>
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
                        src={`${
                            isSuccess
                                ? data.profilePicURL !== ""
                                    ? data.profilePicURL
                                    : defaultProfilePic
                                : ""
                        }`}
                        alt=""
                    />
                </div>

                <div>
                    <label
                        htmlFor="changeProfile"
                        className="p-1 px-2 text-lg block -mb-5"
                    >
                        Change Profile Pic
                    </label>
                    <br />

                    <input
                        ref={fileUploadInput}
                        id="changeProfile"
                        type="file"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        className="bg-[rgb(237,244,254)]  px-3 py-1 rounded-2xl border border-black hover:bg-blue-400 file:bg-cyan-300 file:rounded-xl file:-ms-2"
                    />
                </div>
                <button
                    onClick={handleProfilePicUpdate}
                    disabled={isLoading}
                    className={` bg-[#F2FED1] border  border-black px-3 py-1 rounded-2xl ${isLoading? "hover:bg-zinc-600" :  "hover:bg-[#ABF600]" }`}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default Home;
