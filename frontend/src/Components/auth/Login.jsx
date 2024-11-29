import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/api/api";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            dispatch(
                setCredentials({ user: payload.username, token: accessToken })
            );
            console.log("payload",payload)
            if (payload.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.log(error.data?.message || error);
            toast.error(error.data?.message)
            //to-do: do a tost of error message
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-[#272727] p-5 pt-40">
                <Toaster/>
                <form
                    onSubmit={handleSubmit((data) => handleLogin(data))}
                    className="relative min-w-96 w-1/3 bg-[#272727] border border-black h-4/5 m-auto rounded-lg p-10 pt-0 flex flex-col gap-5 justify-center items-center backdrop-blur-lg shadow-[10px_15px_5px_10px_rgba(0,0,0,0.3)]"
                >
                    <h2 className="text-3xl font-bold text-white mb-5 tracking-widest font-[inter]">
                        SingIn
                    </h2>
                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern:
                                // eslint-disable-next-line no-useless-escape
                                /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                        })}
                        placeholder="email"
                        className="px-5 py-3 rounded-md text-white outline-none border border-black w-2/3 bg-[#404040] focus:border focus:border-[#abf600]"
                    />
                    {errors.email?.type === "required" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            Email is required
                        </p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            Invalid email
                        </p>
                    )}

                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                        placeholder="password"
                        className="px-5 py-3 rounded-md text-white outline-none border border-black w-2/3 bg-[#404040] focus:border focus:border-[#abf600]"
                    />
                    {errors.password?.type === "required" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            password is required
                        </p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            8 characters required
                        </p>
                    )}

                    <button
                        type="submit"
                        className="px-10 py-2 bg-[#abf600] font-bold rounded-md border border-black hover:bg-[#9ecb35]"
                    >
                        LOGIN{" "}
                    </button>
                    <p className="absolute bottom-10 text-white">
                        Dont have an account?{" "}
                        <Link className="bg-[#404040] underline px-1" to="/signup">
                            SignUp.
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Signup;
