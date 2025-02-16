import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../feature/authApi/AuthApi";
import { login } from "../../feature/authSlice";
import {  toast } from 'react-toastify';
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginAccount,{isError}]=useLoginUserMutation()
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const onSubmit =async (data) => {
    const userData={
      email:data.email,
      password:data.password
    }

    const res=await loginAccount(userData)

  
  if (res.data?.token) {
    dispatch(login(res.data?.token))
    navigate("/");
  }
  if (isError) {
    toast.error(res.error.data.message)
    console.log(res.error.data.message);
  }
  };

  useEffect(() => {
    if (user) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true }); // Redirects to previous page or home
    }
}, [user, navigate, location]);
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-96 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
