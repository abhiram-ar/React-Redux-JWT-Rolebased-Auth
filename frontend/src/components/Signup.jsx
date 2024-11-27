import { useForm } from "react-hook-form";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function handleLogin(formdata) {
        console.log(formdata);
    }

    console.log(errors);

    return (
        <>
            <form onSubmit={handleSubmit((data) => handleLogin(data))}>
                <input
                    type="text"
                    {...register("username", { required: true, minLength: 5 })}
                    placeholder="username"
                />
                {errors.username?.type === "required" && (
                    <p>Username is required</p>
                )}
                {errors.username?.type === "minLength" && (
                    <p>Username should be atlest 5 characters long</p>
                )}

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

                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Signup;
