/* eslint-disable react/prop-types */
import defaultProfilePic from "./../../assets/noProfileAvatar.png";
import { useDeleteUserMutation } from "../../redux/api/api";


const UserInfo = ({ index, user, setEditOverlay }) => {
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = () => {
        console.log("deletedd");
        deleteUser(user["_id"]);
    };

    const handleEdit = () => {
        setEditOverlay(user);
    };

    return (
        <div className="flex justify-between items-center py-2 hover:bg-[#F2FED1]">
            <div className="w-4/5 grid grid-cols-4 gap-5 mt-2">
                <div className="flex justify-center items-center gap-5 -mt-2 ">
                    <h1>{index}.</h1>
                    <img
                        className="size-10 rounded-full"
                        src={
                            user.profilePicURL !== ""
                                ? user.profilePicURL
                                : defaultProfilePic
                        }
                    />
                </div>
                <h1>{user["_id"]}</h1>
                <h1>{user.username}</h1>
                <h1>{user.email}</h1>
            </div>
            <div className="flex justify-center items-center gap-3 me-8">
                <button
                    onClick={handleEdit}
                    className="bg-[rgb(237,244,254)]  px-3 py-1 rounded-2xl border border-black hover:bg-blue-400"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-[#ffe2de]  px-3 py-1 rounded-2xl border border-black hover:bg-red-400"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserInfo;
