import { useGetAllUsersQuery } from "../../redux/api/api";

const AdminDashBoard = () => {
  const {data, isFetching, isError} = useGetAllUsersQuery()
  console.log(data)
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input type="text" placeholder="search" />
            <div>

            </div>
        </div>
    );
};

export default AdminDashBoard;
