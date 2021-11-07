/** @format */

import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";

import React from "react";

function MyApp({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Head>
				<title>React form validation</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta name='author' content='Saddam Arbaa' />
				<meta name='description' content='form validation' />
			</Head>

			<Component {...pageProps} />
		</React.Fragment>
	);
}

export default MyApp;
