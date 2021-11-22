const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = (_env, argv) => {
    const isProduction = (argv.mode === 'production');

    return {
        mode: argv.mode,
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "[name].[contenthash].js",
            publicPath: "/"
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            }
        },
        devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
        devServer: {
            static: './dist',
            hot: true,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.css?$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader", "postcss-loader",
                    ],
                },
                {
                    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                    use: ["file-loader"],
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html')
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new MiniCssExtractPlugin({
                filename: "styles.css",
                chunkFilename: "styles.css"
            }),
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            fallback: {
                "stream": require.resolve("stream-browserify"),
                "crypto": require.resolve("crypto-browserify"),
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "assert": require.resolve("assert/"),
                "buffer": require.resolve("buffer")
            }
        }
    };
};
