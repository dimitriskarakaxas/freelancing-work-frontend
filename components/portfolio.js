/** @format */

import Link from "next/link";
import React, { useState, useEffect } from "react";
import PortfolioOption from "./portfolioOption";

const PortfolioComponent = () => {
  const [fetchPortfolios, setFetchPortfolios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/portfolios")
      .then((response) => response.json())
      .then((portfolios) => {
        setFetchPortfolios(portfolios);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" bg-[#fff] h-screen">
      <div className="max-w-[630px] mx-auto pt-[2rem] shadow-xl">
        <header className="text-center bg-white  pt-[1rem]  text-xl font-bold  ">
          Portfolios
        </header>

        <div
          className="  
         p-5 bg-white"
        >
          <div className="mb-12  ">
            <div className="bg-gray-200 flex items-center">
              <p className="w-full text-center py-2 font-bold ">Name</p>
              <p className="w-full text-center py-2">Owner</p>
            </div>

            {fetchPortfolios &&
              fetchPortfolios.map((portfolio) => {
                return (
                  <PortfolioOption
                    key={portfolio?.portfolio_id}
                    portfolioName={portfolio?.portfolioName}
                    portfolioId={portfolio?.portfolio_id}
                    ownerName={portfolio?.owner}
                  />
                );
              })}

            <Link href="newPortfolio">
              <button
                className="bg-gray-200 rounded-md  p-2 cursor-pointer hover:bg-gray-150 transition duration-150  hover:shadow-xl
            border border-gray-500  mt-[1.5rem] mx-auto block"
                type="Create Site"
              >
                Add New Portfolio
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioComponent;
