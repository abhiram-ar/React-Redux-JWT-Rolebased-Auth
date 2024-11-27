import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRefershMutation } from "./redux/api/api";
import { setCredentials } from "./redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const App = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [getNewAccessToken] = useRefershMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchNewAccessToken = async () => {
            if (!token) {
                try {
                    const newAccessToken = await getNewAccessToken().unwrap();
                    const payload = await jwtDecode(newAccessToken);
                    dispatch(
                        setCredentials({
                            token: newAccessToken,
                            user: payload.username,
                        })
                    );
                    //navigate("/home");
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchNewAccessToken();
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

export default App;
