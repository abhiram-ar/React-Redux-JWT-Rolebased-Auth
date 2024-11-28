import { useGetAllUsersQuery } from "../../redux/api/api"
import UserInfo from "./UserInfo";

const AdminDashBoard = () => {
    const { data,isLoading ,isFetching, isError, refetch } = useGetAllUsersQuery();
    console.log(data);
    
    if(!data){
     return(<>loading...</>)
    }
    
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input type="text" placeholder="search" />
            <button onClick={() => refetch()}>refersh</button>
            <div className="flex flex-col text-center p-10">
                {/* table title */}
                <div className="flex justify-between items-center text-xl font-semibold">
                    <div className="w-4/5 grid grid-cols-4 gap-5 ">
                        <div>#</div>
                        <h1>UID</h1>
                        <h1>usename</h1>
                        <h1>email</h1>
                    </div>
                    <div>
                        <h1 className="me-5">options</h1>
                    </div>
                </div>
                <hr />
                {/* table body */}
                {data.map((user,index)=> <UserInfo key={user["_id"]} user={user} index={index+1}/>)}
                
            </div>
        </div>
    );
};

export default AdminDashBoard;
