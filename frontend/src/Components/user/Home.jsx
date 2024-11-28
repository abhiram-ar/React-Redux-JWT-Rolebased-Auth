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
            <button onClick={handleLogout}>logout</button>
            <h1>hello {isSuccess && data.username}</h1>
            <div>
                <img src={`${isSuccess ? data.profilePicURL : ""}`} alt="" />
            </div>
            <input
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <button onClick={handleProfilePicUpdate} disabled={isLoading}>
                Update
            </button>
        </div>
    );
};

export default Home;
