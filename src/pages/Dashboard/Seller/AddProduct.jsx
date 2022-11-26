import React from "react";
import AddProductForm from "../../../components/AddProductForm";

const AddProduct = () => {
  return (
    <div className="lg:w-[80%] mx-auto">
      <h1 className="text-slate-700 text-2xl uppercase text-center mb-3 font-bold">
        Add a product
      </h1>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
