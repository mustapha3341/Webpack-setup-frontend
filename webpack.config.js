const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
	mode: devMode ? "development" : "production",
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: devMode ? "js/[name].js" : "js/[name].[hash].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
	resolve: {
		extensions: [".js"],
	},
};
