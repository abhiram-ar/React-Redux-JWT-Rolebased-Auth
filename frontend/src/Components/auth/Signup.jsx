import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/api/api";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CreateUserOverlay = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [registerUser] = useRegisterUserMutation();

    const handleCreateUser = async (formdata) => {
        try {
            await registerUser(formdata).unwrap();
            reset();
            toast.success("User created");
        } catch (error) {
            console.log("error while creating a new user");
            console.log(error);
            if (error.data?.name === "ZodError") {
                error.data.issues.forEach((issue) => {
                    toast.error(issue.message);
                });
            } else if (error.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error("unexpected error");
            }
        }
    };

    return (
        <>
            <div className="w-full h-full bg-[#272727] p-5 pt-40 absolute z-10">
                <Toaster />
                <form
                    onSubmit={handleSubmit((data) => handleCreateUser(data))}
                    className="relative min-w-96 w-1/3 bg-[#272727] border border-black h-4/5 m-auto rounded-lg p-10 pt-0  flex flex-col gap-5 justify-center items-center backdrop-blur-lg shadow-[10px_15px_5px_10px_rgba(0,0,0,0.3)]"
                >
                    <h2 className="text-3xl font-bold text-white mb-2 mt-5 tracking-widest font-[inter]">
                        SingUp
                    </h2>

                    <input
                        type="text"
                        {...register("username", {
                            required: true,
                            minLength: 3,
                        })}
                        placeholder="username"
                        className="px-5 py-3 rounded-md text-white outline-none border border-black w-2/3 bg-[#404040] focus:border focus:border-[#abf600]"
                    />
                    {errors.username?.type === "required" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            username is required
                        </p>
                    )}
                    {errors.username?.type === "minLength" && (
                        <p className="-mt-5 text-red-600 text-sm">
                            min. 3 characters required
                        </p>
                    )}

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
                            min: 8,
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
                    {errors.password && (
                        <p className="-mt-5 text-red-600 text-sm text-center">
                            8 characters required
                        </p>
                    )}

                    <button
                        type="submit"
                        className="px-10 py-2 bg-[#abf600] font-bold rounded-md border border-black hover:bg-[#9ecb35]"
                    >
                        REGISTER{" "}
                    </button>
                    <p className="absolute bottom-10 text-white">
                        Have an account?{" "}
                        <Link
                            to="/login"
                            className="bg-[#404040] underline px-1"
                        >
                            login.
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default CreateUserOverlay;
