/** @format */

import React from "react";
import NewPortfolioComponent from "../components/newPortfolio";

function NewPortfolioPage() {
	return (
		<div className=' bg-[#fff] h-screen'>
			<div className='max-w-[430px] mx-auto pt-[2rem] shadow-xl'>
				<header className='text-center bg-white  pt-[1rem]  text-xl font-bold  '>
					Add New Portfolio
				</header>

				<div className='flex  space-x-8 p-5 bg-white'>
					<NewPortfolioComponent />
				</div>
			</div>
		</div>
	);
}

export default NewPortfolioPage;
