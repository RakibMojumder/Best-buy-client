import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import SmallSpinner from "./SmallSpinner";

const AddProductForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      .then((imageData) => {
        if (imageData.success) {
          const productData = {
            productCategory: data.pCategory,
            productCondition: data.pCondition,
            img: imageData?.data.url,
            name: data.pName,
            configuration: data.configuration,
            location: data.location,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            usedTime: data.usedTime,
            postedTime: new Date().toLocaleDateString(),
            sellersName: user?.displayName,
            sellerEmail: user?.email,
            isVerified: false,
            mobile: data.mobile,
          };

          fetch("https://best-buy-serever.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(productData),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              toast.success("A product is added");
              navigate("/dashboard/myProducts");
            });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="input-field">
        <input
          className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
          type="text"
          placeholder="Product Name"
          {...register("pName", { required: "Product Name is required" })}
        />
        {errors?.pName && (
          <p className="text-red-500 text-sm">{errors?.pName.message}</p>
        )}
      </div>
      <div className="input-field">
        <select
          className="w-full border py-2 rounded-md pl-3 text-slate-800"
          {...register("pCategory", {
            required: "Product category is required",
          })}
        >
          <option value="" disabled>
            Select product brand
          </option>
          <option value="HP">HP</option>
          <option value="Dell">Dell</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Walton">Walton</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Razer">Razer</option>
          <option value="Asus">Asus</option>
        </select>
        {errors?.pCategory && (
          <p className="text-red-500 text-sm">{errors?.pCategory.message}</p>
        )}
      </div>
      <div className="input-field">
        <textarea
          placeholder="Product Configuration"
          className="w-full h-20 pl-4 border rounded-md text-slate-800"
          {...register("configuration", {
            required: "Product Configuration is required",
          })}
        ></textarea>
        {errors?.configuration && (
          <p className="text-red-500 text-sm">
            {errors?.configuration.message}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-8">
        <div className="input-field w-full">
          <input
            className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
            type="text"
            placeholder="Product Original Price"
            {...register("originalPrice", {
              required: "Original price is required",
            })}
          />
          {errors?.originalPrice && (
            <p className="text-red-500 text-sm">
              {errors?.originalPrice.message}
            </p>
          )}
        </div>
        <div className="input-field w-full">
          <input
            className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
            type="text"
            placeholder="Product Resale Price"
            {...register("resalePrice", {
              required: "Resale price is required",
            })}
          />
          {errors?.resalePrice && (
            <p className="text-red-500 text-sm">
              {errors?.resalePrice.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-8">
        <div className="input-field w-full">
          <input
            className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
            type="text"
            placeholder="Product Used Time"
            {...register("usedTime", {
              required: "Product used time is required",
            })}
          />
          {errors?.usedTime && (
            <p className="text-red-500 text-sm">{errors?.usedTime.message}</p>
          )}
        </div>
        <div className="input-field w-full">
          <input
            className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
            type="text"
            placeholder="Location"
            {...register("location", {
              required: "Location is required",
            })}
          />
          {errors?.location && (
            <p className="text-red-500 text-sm">{errors?.location.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-8">
        <div className="input-field w-full">
          <select
            className="w-full border py-1 rounded-md pl-3 text-slate-800"
            {...register("pCondition", {
              required: "Product condition is required",
            })}
          >
            <option value="" disabled>
              Select product condition
            </option>
            <option value="excellent">excellent</option>
            <option value="good">good</option>
            <option value="fair">fair</option>
          </select>
          {errors?.pCondition && (
            <p className="text-red-500 text-sm">{errors?.pCondition.message}</p>
          )}
        </div>
        <div className="input-field w-full">
          <input
            className="border w-full py-1 pl-5 rounded-md focus:outline-none text-slate-800"
            type="text"
            placeholder="Mobile"
            {...register("mobile", {
              required: "Mobile number is required",
            })}
          />
          {errors?.mobile && (
            <p className="text-red-500 text-sm">{errors?.mobile.message}</p>
          )}
        </div>
      </div>

      <div className="input-filed">
        <input
          className=""
          type="file"
          {...register("img", { required: "img is required" })}
        />
        {errors?.img && (
          <p className="text-red-500 text-sm">{errors?.img.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-[#3749BB] w-full py-1 text-center text-white rounded-md"
      >
        {loading ? <SmallSpinner /> : "Add product"}
      </button>
    </form>
  );
};

export default AddProductForm;
