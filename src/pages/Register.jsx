import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import saveUserAndGetToken from "../Hooks/saveUserAndGetToken";

const Register = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const { createUser, updateUserProfile, googleLogIn } =
    useContext(AuthContext);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setAuthError("");
        updateUserProfile({ displayName: data.name })
          .then(() => {
            const user = {
              email: result?.user.email,
              role: data.userRole,
            };
            saveUserAndGetToken(user).then((res) => {
              if (res.token) {
                localStorage.setItem("Best-buy-token", res.token);
                toast.success("Sign up has been successful");
              }
            });
          })
          .catch((error) => console.log(error));
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
          email: res.user.email,
          role: "User",
        };
        saveUserAndGetToken(user).then((res) => {
          if (res.token) {
            localStorage.setItem("Best-buy-token", res.token);
            toast.success("Sign up has been successful");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setAuthError(err.message);
      });
  };

  return (
    <div className="w-1/2 mx-auto mt-10 py-5 px-20 bg-[#2b6777]">
      <h1 className="text-3xl font-bold my-5 text-center text-white">
        Register
      </h1>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name && (
              <p className="text-white text-sm">{errors?.name.message}</p>
            )}
          </div>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <p className="text-white text-sm">{errors?.email.message}</p>
            )}
          </div>
          <div className="input-filed mb-6">
            <select className="w-full py-1.5 px-4" {...register("userRole")}>
              <option value="User" defaultValue="User">
                User
              </option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <div className="input-field relative mb-6">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              placeholder="Password"
              type={passwordEye ? "password" : "text"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message:
                    "password should have 1 capital letter and 1 special characters and at list 1 digit",
                },
              })}
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
            {errors?.password && (
              <p className="text-white text-sm">{errors?.password.message}</p>
            )}
            {authError && <p className="mt-1">{authError}</p>}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-14 py-1 rounded-full bg-[#EFF5F5] mb-3"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Login
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

export default Register;
