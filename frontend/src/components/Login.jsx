import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/api";
const Signup = () => {
    const [login] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function handleLogin(formdata) {
        console.log(formdata);
        login(formdata)
    }

    console.log(errors);

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
