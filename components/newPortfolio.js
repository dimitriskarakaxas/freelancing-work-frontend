/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const NewPortfolioComponent = () => {
  const router = useRouter();

  const cancelBtnHandler = (event) => {
    event.preventDefault();
    router.push("/portfolio");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const siteData = {
      portfolioName: data.name,
      owner: data.owner,
    };

    console.log(siteData);

    fetch("http://localhost:8080/portfolios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(siteData),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Create Site failed");
        }
        router.push("/portfolio");
      })
      .catch((error) => {
        console.error("Error:", error);
        router.push("/portfolio");
      });
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="name">Name</label>

          <div className="w-[250px] ">
            {errors.name && <p className="error">Site name is required</p>}
            <input
              className={` ${errors.name ? "is-invalid" : "custom-input"}`}
              type="text"
              id="name"
              placeholder={errors.name ? "" : ""}
              {...register("name", { required: true })}
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="owner">Owner</label>

          <div className="w-[250px] ">
            {errors.owner && <p className="error">Owner is required</p>}
            <input
              className={` ${errors.owner ? "is-invalid" : "custom-input"}`}
              type="text"
              id="owner"
              placeholder={errors.owner ? "" : ""}
              {...register("owner", { required: true })}
            />
          </div>
        </div>

        <div className="control  flex justify-between ">
          <button
            className="bg-gray-200 rounded-md  w-[120px] p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500 "
            type="Create Site"
            onClick={cancelBtnHandler}
          >
            Cancel
          </button>
          <button
            className="bg-gray-200 rounded-md  p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500 "
            type="submit "
          >
            Create New Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPortfolioComponent;
