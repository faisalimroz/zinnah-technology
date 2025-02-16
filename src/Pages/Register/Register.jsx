import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "../../feature/authApi/AuthApi";
import { login } from "../../feature/authSlice";
import {  toast } from 'react-toastify';
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createAccount,{isError}]=useCreateAccountMutation()
  const { user } = useSelector((state) => state.auth);
  const onSubmit = async(data) => {

    const newUser={
      email:data.email,
      photo:data.photo,
      password:data.password,
      role:'user'
    }
    console.log(newUser);
   const res=await createAccount(newUser)
  
   if (res.data?.token) {
    
     navigate("/");
     dispatch(login(res.data?.token))
   }
   if (isError) {
    toast.error(res.error.data.message)
    console.log(res.error.data.message);
  }
  };
  useEffect(()=>{
    if (user) {
      navigate("/");
    }
  },[navigate,user])
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-96 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
     
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input
            {...register("photo", { required: "Email is required" })}
            type="url"
            placeholder="photoURL"
            className="w-full p-2 border rounded mb-3"
          />
           {errors.email && <p className="text-red-500">{errors.photo.message}</p>}
          <input
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters required" } })}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button

            className="w-full bg-green-500 text-white p-2 rounded"
          >
           Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
