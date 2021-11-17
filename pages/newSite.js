import React from "react";
import { useForm } from "react-hook-form";
import NewSite from "../components/newSite";

import { useRouter } from "next/router";

function NewPage() {
  const router = useRouter();

  return (
    <div className=" bg-[#fff] h-screen">
      <div className="max-w-[430px] mx-auto pt-[2rem] shadow-xl">
        <header className="text-center bg-white  pt-[1rem]  text-xl font-bold  ">
          Add New Site
        </header>

        <div className="flex  space-x-8 p-5 bg-white">
          <NewSite portfolioId={router.query.portfolio_id} />
        </div>
      </div>
    </div>
  );
}

export default NewPage;
