/** @format */

import Head from "next/head";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Form({ fetchedInput, setRefetch, refetch }) {
  const [inputSiteName, setInputSiteName] = useState("");
  const [inputOwner, setInputOwner] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputUTC, setInputUTC] = useState("");

  const [checkboxesState, setCheckboxesState] = useState([false, true, false]);

  React.useEffect(() => {
    setInputSiteName(fetchedInput.siteName);
    setInputOwner(fetchedInput.owner);
    setInputLongitude(fetchedInput.longitude);
    setInputLatitude(fetchedInput.latitude);
    setInputUTC(fetchedInput.utc);
    setCheckboxesState([
      fetchedInput.internal,
      fetchedInput.dst,
      fetchedInput.disabled,
    ]);
  }, [fetchedInput]);

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

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();
  //   const onSubmit = (data) => console.log(data);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      siteName: inputSiteName,
      owner: inputOwner,
      longitude: inputLongitude,
      latitude: inputLatitude,
      utc: inputUTC,
      internal: checkboxesState[0],
      dst: checkboxesState[1],
      disabled: checkboxesState[2],
    };
    console.log("hiii" + fetchedInput.siteId);
    fetch(`http://localhost:8080/sites/${fetchedInput.siteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Update Site failed!");
        }
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="sideId">Name</label>

          <div className="w-[250px] ">
            <input
              className="custom-input"
              type="text"
              id="siteName"
              value={inputSiteName}
              onChange={(event) => {
                setInputSiteName(event.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="owner">Owner</label>

          <div className="w-[250px] ">
            <input
              className="custom-input"
              type="text"
              id="owner"
              value={inputOwner}
              onChange={(event) => {
                setInputOwner(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="longitude">Longitude</label>

          <div className="w-[250px] ">
            <input
              className="custom-input"
              type="number"
              id="longitude"
              value={inputLongitude}
              onChange={(event) => {
                setInputLongitude(event.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="latitude">Latitude</label>

          <div className="w-[250px] ">
            <input
              className="custom-input"
              type="number"
              id="latitude"
              value={inputLatitude}
              onChange={(event) => {
                setInputLatitude(event.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex items-center  justify-between mb-8  space-x-8 ">
          <label htmlFor="utc">UTC</label>

          <div className="w-[250px] ">
            <input
              className="custom-input"
              type="text"
              id="utc"
              value={inputUTC}
              onChange={(event) => {
                setInputUTC(event.target.value);
              }}
              required
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
              className="cursor-pointer"
              checked={checkboxesState[0]}
              onChange={checkboxClickHandler}
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
              onChange={checkboxClickHandler}
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
              className="cursor-pointer"
              checked={checkboxesState[2]}
              onChange={checkboxClickHandler}
            />
            <label className="  ml-2 cursor-pointer" htmlFor="disabled">
              Disabled
            </label>
          </div>
        </div>{" "}
        <div className="control  flex justify-between">
          <button
            className="bg-gray-200 rounded-md p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500 "
            type="Create Site"
            onClick={() => {
              router.push("/newSite");
            }}
          >
            Create New Site
          </button>
          <button
            className="bg-gray-200 rounded-md  p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
