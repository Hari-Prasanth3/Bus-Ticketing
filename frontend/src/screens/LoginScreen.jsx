import React from "react";
import { useState,useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import Loader from "../components/loader.jsx";
import { useDispatch,useSelector } from "react-redux";
import {useLoginMutation} from '../slices/userApiSlice.js'
import { setCredentials } from "../slices/authSlice.js";
import {  toast } from "react-toastify";

const LoginScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Login, {isLoading}] = useLoginMutation();
  const {userInfo} = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect" || "/");

  useEffect(() => { 
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const res = await Login({ email, password }).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/SearchScreen");
      toast.success("SignIn Successfully")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
      
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col mt-10 justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
          <form class=" w-full md:w-3/4" onSubmit={submitHandler}>
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
              <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">
                Login to your account
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <div class="">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div class="">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-blue-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
            </div>
            <div className="text-center mt-7">
              <button
                type="submit"
                className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-blue-400 to-emerald-400  font-medium m-2 mb-6 "
              >
                Sign In
              </button>
              {isLoading && <Loader />}
            </div>
          </form>
          <div className="h-[100%] w-full md:w-1/3  rounded-xl bg-gradient-to-l from-blue-400 to-emerald-400  items-center flex justify-center">
            <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
              <h1 className="text-5xl">New Here?</h1>
              <h1 className="">Sign Up and discover new features here</h1>
              <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                {" "}
                <button
                  type="submit"
                  className="bg-white rounded-2xl px-4 hover:bg-gray-200 hover:text-blue-900 text-emerald-400 py-1"
                >
                  SignUp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;