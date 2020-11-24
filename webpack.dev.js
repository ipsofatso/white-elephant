const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/js/app.js'
	},
	devServer: {
		contentBase: path.join( __dirname, 'dist' ),
		historyApiFallback: true,
		liveReload: true,
		open: true,
		port: 3000,
		writeToDisk: true
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: [ '/dist/', '/prod/', '/node_modules/', '/src/js/workers/' ],
				loader: 'eslint-loader',
				options: {},
			},
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					attributes: false
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(png|jpe?g|gif|ico)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					context: 'src'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/html/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				lib: {
					test: /[\\/]node_modules[\\/]/,
					name: 'lib',
					chunks: 'all'
				}
			}
		}
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	}
};