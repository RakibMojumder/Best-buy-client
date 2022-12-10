import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../contexts/AuthProvider";
import saveUserAndGetToken from "../sharedAPI/saveUserAndGetToken";

const Register = () => {
  const [passwordEye, setPasswordEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, googleLogIn } =
    useContext(AuthContext);
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Register
  const onSubmit = (data) => {
    setLoading(true);
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          createUser(data.email, data.password)
            .then((result) => {
              console.log(result.user);
              setAuthError("");
              const profile = {
                displayName: data.name,
                photoURL: imgData.data.url,
              };
              updateUserProfile(profile)
                .then(() => {
                  const user = {
                    name: data.name,
                    email: result?.user.email,
                    role: data.userRole,
                    userImg: imgData.data.url,
                  };
                  saveUserAndGetToken(user).then((res) => {
                    if (res.token) {
                      localStorage.setItem("Best-buy-token", res.token);
                      setLoading(false);
                      navigate("/");
                      reset();
                      toast.success("Sign up has been successful");
                    }
                  });
                })
                .catch((error) => {
                  setLoading(false);
                  console.log(error);
                });
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setAuthError(err.message);
            });
        }
      })
      .catch((e) => console.log(e));
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
            navigate("/");
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
    <div className="w-1/2 mx-auto mt-10 py-5 px-20 bg-white dark:bg-slate-700/[0.2] shadow-2xl dark:drop-shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold my-5 text-center dark:text-white">
        Register
      </h1>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field relative mb-6 dark:text-slate-800">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors?.name && (
              <p className="text-sm text-red-500">{errors?.name.message}</p>
            )}
          </div>
          <div className="input-field relative mb-6 dark:text-slate-800">
            <input
              className="border w-full py-1 pl-5 focus:outline-none"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors?.email.message}</p>
            )}
          </div>
          <div className="input-filed mb-6 dark:text-slate-800">
            <select className="w-full py-1.5 px-4" {...register("userRole")}>
              <option value="user" defaultValue="user">
                user
              </option>
              <option value="seller">seller</option>
            </select>
          </div>
          <div className="input-filed-img mb-6 dark:text-white">
            <input
              className=""
              type="file"
              {...register("img", { required: "img is required" })}
            />
            {errors?.img && (
              <p className="text-sm text-red-500">{errors?.img.message}</p>
            )}
          </div>
          <div className="input-field relative mb-6 dark:text-slate-800">
            <input
              className="border w-full py-1 pl-5 focus:outline-none dark:text-slate-700"
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
                className="absolute top-2 right-4 dark:text-slate-700"
              />
            ) : (
              <FaEye
                onClick={() => setPasswordEye(!passwordEye)}
                className="absolute top-2 right-4 dark:text-slate-700"
              />
            )}
            {errors?.password && (
              <p className="text-sm text-red-500">{errors?.password.message}</p>
            )}
            {authError && <p className="mt-1">{authError}</p>}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-14 py-1 rounded-full bg-[#3749BB] text-white mb-3"
            >
              {loading ? <SmallSpinner /> : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center dark:text-white">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Login
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

export default Register;
