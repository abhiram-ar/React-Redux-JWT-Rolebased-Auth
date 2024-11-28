import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRefershQuery } from "./redux/api/api";
import { setCredentials } from "./redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const App = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { data, isLoading, isError } = useRefershQuery();
    console.log(data);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNewAccessToken = async () => {
            if (!token && !isLoading) {
                try {
                    const newAccessToken = data;
                    const payload = await jwtDecode(newAccessToken);
                    dispatch(
                        setCredentials({
                            token: newAccessToken,
                            user: payload.username,
                        })
                    );
                    if (payload.isAdmin) {
                        navigate("/admin");
                    } else {
                        navigate("/home");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchNewAccessToken();
    }, [data]);

    if (isLoading) {
        return <>loading...</>;
    }

    return <> {<Outlet />} </>;
};

export default App;
