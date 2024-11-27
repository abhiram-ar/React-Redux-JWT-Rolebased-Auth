import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {setCredentials} from "./../redux/slices/authSlice"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [login] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function handleLogin(formdata) {
        console.log("form data", formdata);
        try {
            const accessToken = await login(formdata).unwrap();
            console.log("response", accessToken);
            const payload = await jwtDecode(accessToken);
            dispatch(setCredentials({ user: payload.username, token: accessToken }));
            navigate("/home")
        } catch (error) {
            console.log(error.data?.message || error);
            //to-do: do a tost of error message
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit((data) => handleLogin(data))}>
                <input
                    type="text"
                    {...register("email", {
                        required: true,
                        pattern:
                            /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                    })}
                    placeholder="email"
                />
                {errors.email?.type === "required" && <p>Email is required</p>}
                {errors.email?.type === "pattern" && <p>Invalid email</p>}

                <input
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    placeholder="password"
                />
                {errors.password?.type === "required" && (
                    <p>password is required</p>
                )}
                {errors.passoword?.type === "minLength" && (
                    <p>password should be atlest 8 characters long</p>
                )}

                <button type="submit">login</button>
            </form>
        </>
    );
};

export default Signup;
