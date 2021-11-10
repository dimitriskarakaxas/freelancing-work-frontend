/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form";

import Site from "../components/site";

export default function Home() {
  const [refetch, setRefetch] = React.useState(true);
  const [sites, setSites] = React.useState([]);
  const [fetchedInput, setFetchedInput] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8080/sites", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSites(data);
      })
      .catch((err) => console.log(err));
  }, [refetch]);

  React.useEffect(() => {
    fetch("http://localhost:8080/sites", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const firstSiteId = data[0].siteId;
        return fetch(`http://localhost:8080/sites/${firstSiteId}`, {
          method: "GET",
        });
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Get Site failed!");
        }
        return response.json();
      })
      .then((firstSiteDetails) => {
        setFetchedInput(firstSiteDetails);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" bg-[#fff] h-screen">
      <div className="max-w-[630px] mx-auto pt-[2rem] shadow-xl">
        <header className="text-center bg-white  pt-[1rem]  text-xl font-bold  ">
          Edit Site
        </header>

        <div
          className="flex  space-x-8 
         p-5 bg-white"
        >
          <div className="w-1/3">
            <div className="bg-gray-200 flex items-center">
              <p className="w-full text-center py-2 font-bold ">Name</p>
              <p className="w-full text-center py-2">Owner</p>
            </div>

            <div className="left-side">
              {sites &&
                sites.map((site) => (
                  <Site
                    setFetchedInput={setFetchedInput}
                    key={site.siteId}
                    ownerName={site.owner}
                    siteName={site.siteName}
                    siteId={site.siteId}
                  />
                ))}
            </div>
          </div>

          <Form
            fetchedInput={fetchedInput}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
}
