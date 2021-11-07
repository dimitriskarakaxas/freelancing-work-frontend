/** @format */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			reactStrictMode: true,
			env: {
				APP_ID: process.env.APP_ID,
			},
		};
	}

	return {
		reactStrictMode: true,
		env: {
			APP_ID: process.env.APP_ID,
		},
	};
};
