import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../contexts/AuthProvider";
import saveUserAndGetToken from "../sharedAPI/saveUserAndGetToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [passwordEye, setPasswordEye] = useState(true);
  const { googleLogIn, logIn } = useContext(AuthContext);
  const [authError, setAuthError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from.pathname || "/";

  const onSubmit = (data) => {
    setLoading(true);
    logIn(data.email, data.password)
      .then((result) => {
        setAuthError("");
        saveUserAndGetToken(result?.user)
          .then((res) => {
            if (res.message) {
              reset();
              setLoading(false);
              return toast.error(res.message);
            }

            if (res.token) {
              localStorage.setItem("Best-buy-token", res.token);
              setLoading(false);
              navigate(from, { replace: true });
              toast.success("Successfully log in");
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
        setLoading(false);
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
          if (res.message) {
            return toast.error(res.message);
          }

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
    <div className="md:w-3/5 lg:w-1/2 mx-auto mt-10 py-10 px-10 lg:px-20 bg-white dark:bg-slate-700/[0.2] shadow-2xl dark:drop-shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold my-5 text-center dark:text-white">
        Log in
      </h1>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none dark:text-slate-800"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors?.email.message}</p>
            )}
          </div>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none dark:text-slate-800"
              placeholder="Password"
              type={passwordEye ? "password" : "text"}
              {...register("password", { required: "Password is required" })}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors?.password.message}</p>
            )}
            {passwordEye ? (
              <FaEyeSlash
                onClick={() => setPasswordEye(!passwordEye)}
                className="absolute top-2 right-4 dark:text-slate-800"
              />
            ) : (
              <FaEye
                onClick={() => setPasswordEye(!passwordEye)}
                className="absolute top-2 right-4 dark:text-slate-700"
              />
            )}
            {authError && <p className="mt-1 text-red-500">{authError}</p>}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-14 py-1 rounded-full bg-[#3749BB] text-white mb-3"
            >
              {loading ? <SmallSpinner /> : "Log in"}
            </button>
          </div>
        </form>

        <p className="text-center dark:text-white">
          Already have an account?{" "}
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </p>

        <div className="flex justify-between items-center my-3">
          <div className="h-[1px] w-[40%] bg-slate-600"></div>
          <div className="dark:text-white">or</div>
          <div className="h-[1px] w-[40%] bg-slate-600"></div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center text-white bg-[#dc392d] w-2/3 lg:w-full rounded-md mx-auto py-2 transition-all hover:bg-[#f5564b]"
          >
            <FaGoogle className="inline-block mr-3 text-xl" />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center text-white dark:text-slate-700 bg-slate-800 dark:bg-white w-2/3 lg:w-full rounded-md mx-auto py-2 mt-3 transition-all hover:bg-slate-600 dark:hover:bg-gray-200">
            <FaGithub className="inline-block mr-3 text-xl" />{" "}
            <span>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
