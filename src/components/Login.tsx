import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { login as loginAction } from '../features/authSlice';
import Logo from './ui/Logo';
import Input from './ui/Input';
import Button from './ui/Button';
interface LoginFormInputs {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        mode: 'onSubmit'
    });

    const [error, setError] = React.useState("");

    const login = async (data: LoginFormInputs) => {
        console.log("in login component data", data)
        setError("")
        try {
            const session = await authService.login(data);
            // console.log("session",session)
            // console.log("truthy or falsy session",Boolean(session))
            if (session) {
                const userData = await authService.getCurrentUser();
                // console.log("in login component userData", userData)
                if (userData) dispatch(loginAction(userData));
                navigate('/');
            }
        } catch (error) {
            if (error instanceof Error) setError(error.message)
        }
    }



    return (

        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
                    <Input
                        label='Email:'
                        placeholder="Enter Your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) => /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                    "Email must be valid input",

                            }
                        })
                        }

                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    <Input
                        label='Password: '
                        type="password"
                        placeholder='Enter your password'
                        {...register("password",
                            {
                                required: "Password is required",

                            }
                        )}
                    />
                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded"
                    >
                        Sing in</Button>
                </form>
            </div>
        </div>
    )
}

export default Login