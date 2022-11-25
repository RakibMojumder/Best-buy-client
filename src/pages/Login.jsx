import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import saveUserAndGetToken from "../Hooks/saveUserAndGetToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [passwordEye, setPasswordEye] = useState(true);
  const { googleLogIn, logIn } = useContext(AuthContext);
  const [authError, setAuthError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from.pathname || "/";

  const onSubmit = (data) => {
    logIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setAuthError("");
        saveUserAndGetToken(result?.user)
          .then((res) => {
            if (res.token) {
              localStorage.setItem("Best-buy-token", res.token);
              navigate(from, { replace: true });
              toast.success("Successfully log in");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
      });
  };

  // Google Log in
  const handleGoogleSignIn = () => {
    googleLogIn()
      .then((res) => {
        setAuthError("");
        console.log(res.user);
        const user = {
          name: res.user.displayName,
          email: res.user.email,
          role: "user",
          userImg: res?.user?.photoURL,
        };
        saveUserAndGetToken(user).then((res) => {
          if (res.token) {
            localStorage.setItem("Best-buy-token", res.token);
            navigate(from, { replace: true });
            toast.success("Successfully log in");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-10 py-10 px-20 bg-[#2b6777]">
      <h1 className="text-3xl font-bold my-5 text-center text-white">Log in</h1>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              placeholder="Password"
              type={passwordEye ? "password" : "text"}
              {...register("password", { required: "Password is required" })}
            />
            {passwordEye ? (
              <FaEyeSlash
                onClick={() => setPasswordEye(!passwordEye)}
                className="absolute top-2 right-4"
              />
            ) : (
              <FaEye
                onClick={() => setPasswordEye(!passwordEye)}
                className="absolute top-2 right-4"
              />
            )}
            {authError && <p className="mt-1">{authError}</p>}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-14 py-1 rounded-full bg-[#EFF5F5] mb-3"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </p>

        <div className="flex justify-between items-center my-3">
          <div className="h-[1px] w-[23%] lg:w-[40%] bg-white"></div>
          <div className="text-white">or</div>
          <div className="h-[1px] w-[23%] lg:w-[40%] bg-white"></div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center bg-[#dc392d] rounded-md text-white w-60 mx-auto py-2 transition-all hover:bg-[#f5564b]"
          >
            <FaGoogle className="inline-block mr-3 text-xl" />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center bg-slate-800 rounded-md text-white w-60 mx-auto py-2 mt-3 transition-all hover:bg-slate-600">
            <FaGithub className="inline-block mr-3 text-xl" />{" "}
            <span>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
