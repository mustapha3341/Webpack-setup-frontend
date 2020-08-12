const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: !devMode },
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				loader: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: devMode,
						},
					},
				],
			},
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, "build"),
		open: true,
		port: 3000,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? "[name].css" : "[name].[hash].css",
			chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
		}),
	],
	resolve: {
		extensions: [".js", ".scss"],
	},
};
