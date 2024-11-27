import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token);

    console.log(token);
    return <>{token ? <Outlet /> : <Navigate to="/login" replace={true} />}</>;
};

export default ProtectedRoute;
