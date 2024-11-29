import { Fragment, useState } from "react";
import { useGetAllUsersQuery } from "../../redux/api/api";
import EditOverlay from "./EditOverlay";
import UserInfo from "./UserInfo";
import CreateUserOverlay from "./CreateUserOverlay";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "./../../redux/api/api";
import { logout as clearStore } from "./../../redux/slices/authSlice";
import api from "./../../redux/api/api"

const AdminDashBoard = () => {
    const { data, isLoading, isFetching, refetch } = useGetAllUsersQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(data);
    const [editOverlay, setEditOverlay] = useState(null);
    const [showCreateUserOverlay, setShowCreateUserOverlay] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = async () => {
        try {
            const response = await logout().unwrap();
            console.log("logoutResponse", response);

            dispatch(api.util.resetApiState());
            dispatch(clearStore());
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const filterUsers = (users, query) => {
        if (query === "") return;
        const filteredUsers = users.filter((user) => {
            const pattern = new RegExp(query, "i");
            return pattern.test(user.email) || pattern.test(user.username);
        });

        console.log(filteredUsers);
        return filteredUsers;
    };

    return (
        <div>
            {showCreateUserOverlay && (
                <CreateUserOverlay
                    setShowCreateUserOverlay={setShowCreateUserOverlay}
                />
            )}
            {editOverlay && (
                <EditOverlay
                    setEditOverlay={setEditOverlay}
                    editOverlay={editOverlay}
                />
            )}

            <h1 className="text-2xl bg-[#F2FED1] w-fit font-bold p-2 mt ms-16">
                Admin Dashboard
            </h1>
            <button
                onClick={handleLogout}
                className="absolute right-16 top-5 px-3 py-2 rounded-2xl font-semibold border border-black  bg-[#8B8B8B] hover:bg-red-500"
            >
                Logout
            </button>
            <div className="relative">
                <input
                    type="text"
                    placeholder="search"
                    className="border block m-auto w-2/5 border-b-0 border-black rounded-t-2xl bg-[#F2FED1] p-3 px-10 mt-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-16 top-2 flex gap-3 mr-6">
                    <button
                        onClick={() => refetch()}
                        className=" bg-[#F2FED1] border  border-black px-3 py-1 rounded-2xl hover:bg-[#ABF600]"
                    >
                        Refersh
                    </button>
                    <button
                        onClick={() => setShowCreateUserOverlay(true)}
                        className=" bg-[#fefbd1] border  border-black px-3 py-1 rounded-2xl hover:bg-[#f6f600]"
                    >
                        Create +
                    </button>
                </div>
            </div>

            {/* userDetails Table */}
            <div className="flex flex-col text-center m-16 mt-0  rounded-md border border-black overflow-hidden">
                {/* table title */}
                <div className="flex justify-between items-center text-xl font-semibold px-5 py-3">
                    <div className="w-4/5 grid grid-cols-4 gap-5 ">
                        <div>#</div>
                        <h1>UID</h1>
                        <h1>usename</h1>
                        <h1>email</h1>
                    </div>
                    <div className="me-12">
                        <h1>options</h1>
                    </div>
                </div>
                <hr className="mt-2" />
                {/* table body */}
                {!isLoading && !isFetching && data && searchQuery
                    ? filterUsers(data, searchQuery)?.map(
                          (user, index, data) => (
                              <Fragment key={user["_id"]}>
                                  <UserInfo
                                      user={user}
                                      index={index + 1}
                                      setEditOverlay={setEditOverlay}
                                  />
                                  {data.length - 1 !== index && <hr />}
                              </Fragment>
                          )
                      )
                    : data?.map((user, index, data) => (
                          <Fragment key={user["_id"]}>
                              <UserInfo
                                  user={user}
                                  index={index + 1}
                                  setEditOverlay={setEditOverlay}
                              />
                              {data.length - 1 !== index && <hr />}
                          </Fragment>
                      ))}
            </div>
        </div>
    );
};

export default AdminDashBoard;
