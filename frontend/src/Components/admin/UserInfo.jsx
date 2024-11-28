import defaultProfilePic from "./../../assets/noProfileAvatar.png";

const UserInfo = ({ index, user }) => {
    const handleDelete = () => {
        console.log("deletedd");
    };

    return (
        <div className="flex justify-between items-center">
            <div className="w-4/5 grid grid-cols-4 gap-5 mt-5">
                <div className="flex justify-center items-center gap-5 -mt-2 ">
                    <h1>{index}.</h1>
                    <img
                        className="size-10 rounded-full"
                        src={user.profilePicURL !== "" ? user.profilePicURL : defaultProfilePic}
                    />
                </div>
                <h1>{user["_id"]}</h1>
                <h1>{user.username}</h1>
                <h1>{user.email}</h1>
            </div>
            <div className="flex justify-center items-center gap-5">
                <button>edit</button>
                <button onClick={handleDelete}>delete</button>
            </div>
        </div>
    );
};

export default UserInfo;
