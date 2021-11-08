import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function NewSite() {
  const [checkboxesState, setCheckboxesState] = React.useState([
    false,
    true,
    false,
  ]);
  const router = useRouter();

  React.useEffect(() => {}, [checkboxesState]);

  const checkboxClickHandler = (event) => {
    if (
      event.target.attributes.id.value === "dst" &&
      checkboxesState[1] === false
    ) {
      setCheckboxesState([false, true, false]);
    } else if (
      event.target.attributes.id.value === "internal" &&
      checkboxesState[0] === false
    ) {
      setCheckboxesState([true, false, false]);
    } else if (
      event.target.attributes.id.value === "disabled" &&
      checkboxesState[2] === false
    ) {
      setCheckboxesState([false, false, true]);
    }
  };

  const cancelBtnHandler = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const siteData = {
      name: data.name,
      owner: data.owner,
      longitude: data.longitude,
      latitude: data.latitude,
      utc: data.utc,
      internal: checkboxesState[0],
      dst: checkboxesState[1],
      disabled: checkboxesState[2],
    };

    console.log(siteData);
    return;

    fetch("http://localhost:8080/sites", {
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
        router.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="sideId">Site name</label>

          <div className="w-[250px] ">
            {errors.name && <p className="error">Site name is required</p>}
            <input
              className={` ${errors.name ? "is-invalid" : "custom-input"}`}
              type="text"
              id="name"
              placeholder={errors.name ? "" : "Placeholder from db"}
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
              placeholder={errors.owner ? "" : "Placeholder from db"}
              {...register("owner", { required: true })}
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="longitude">Longitude</label>

          <div className="w-[250px] ">
            {errors.longitude && (
              <p className="error">Longitude is required (number)</p>
            )}
            <input
              className={` ${errors.longitude ? "is-invalid" : "custom-input"}`}
              type="number"
              id="longitude"
              placeholder={errors.longitude ? "" : "Placeholder from db"}
              {...register("longitude", { required: true })}
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="latitude">Latitude</label>

          <div className="w-[250px] ">
            {errors.latitude && (
              <p className="error">Latitude is required (number)</p>
            )}
            <input
              className={` ${errors.latitude ? "is-invalid" : "custom-input"}`}
              type="number"
              id="latitude"
              placeholder={errors.latitude ? "" : "Placeholder from db"}
              {...register("latitude", { required: true })}
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="utc">UTC</label>

          <div className="w-[250px] ">
            {errors.utc && <p className="error">UTC is required (number)</p>}
            <input
              className={` ${errors.utc ? "is-invalid" : "custom-input"}`}
              type="text"
              id="utc"
              placeholder={errors.utc ? "" : "Placeholder from db"}
              {...register("utc", { required: true })}
            />
          </div>
        </div>
        <div className="control">
          <div>
            <input
              type="checkbox"
              id="internal"
              name="internal1"
              value="internal"
              checked={checkboxesState[0]}
              className="cursor-pointer"
              onClick={checkboxClickHandler}
            />
            <label className="  ml-2 cursor-pointer" htmlFor="internal">
              Internal
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="dst"
              name="dst"
              value="dst"
              className="cursor-pointer"
              checked={checkboxesState[1]}
              onClick={checkboxClickHandler}
            />
            <label className=" ml-2 cursor-pointer" htmlFor="dst">
              DST
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="disabled"
              name="disabled"
              value="disabled"
              checked={checkboxesState[2]}
              className="cursor-pointer"
              onClick={checkboxClickHandler}
            />
            <label className="  ml-2 cursor-pointer" htmlFor="disabled">
              Disabled
            </label>
          </div>
        </div>{" "}
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
            Create New Site
          </button>
        </div>
      </form>
    </div>
  );
}
