/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form";
import Link from "next/link";
import { useRouter } from "next/router";

import Site from "../components/site";

export default function Home() {
  const [refetch, setRefetch] = React.useState(true);
  const [deleteRefetch, setDeleteRefetch] = React.useState(true);
  const [sites, setSites] = React.useState([]);
  const [fetchedInput, setFetchedInput] = React.useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    // GET request using fetch inside useEffect React hook
    const url = `http://localhost:8080/sites?portfolio_id=${router.query.portfolio_id}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSites(data);
      })
      .catch((err) => console.log(err));
  }, [refetch, deleteRefetch]);

  React.useEffect(() => {
    const url = `http://localhost:8080/sites?portfolio_id=${router.query.portfolio_id}`;
    fetch(url, {
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
  }, [deleteRefetch]);

  return (
    <div className=" bg-[#fff] h-screen">
      <div className="max-w-[630px] mx-auto pt-[2rem] shadow-xl">
        <header className="text-center bg-white  pt-[1rem]  text-xl font-bold  ">
          Edit Site
        </header>

        <div
          className="sm:flex space-x-8
         p-5 bg-white relative"
        >
          <div className="mb-12 sm:w-1/3 sm:mb-0 ">
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
            setDeleteRefetch={setDeleteRefetch}
            deleteRefetch={deleteRefetch}
            portfolioId={router.query.portfolio_id}
          />

          <div>
            <Link href="/">
              {/* <button
              className="bg-gray-200 rounded-md p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500 absolute  top-[50%] -translate-y-2/4 left-[150px]"
              type="Create Site"
            >
              Back
            </button> */}
              <button
                className="bg-purple-400 text-white rounded-md p-1 cursor-pointer hover:bg-white hover:text-purple-400 border-2 border-purple-400 transition duration-150  hover:shadow-xl absolute bottom-0 left-0"
                type="Go back"
              >
                Portfolios
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
