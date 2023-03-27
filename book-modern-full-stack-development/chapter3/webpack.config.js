// Copyright (C) 2022 Varghese Mathew (Matt)

// Reference: https://webpack.js.org/configuration/
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

var config = {
    entry: "./src/index.tsx",
    devServer: { port: 3000 },
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("babel-loader"),
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                // Ref: https://stackoverflow.com/questions/67659204/you-may-need-an-appropriate-loader-to-handle-this-file-type-currently-no-loade
                // Ref: https://stackoverflow.com/questions/47447199/module-not-found-error-cant-resolve-sass-loader
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "inline-source-map"
    }
    if (argv.mode === "production") {
        // Nothing special 
    }
    return config;
};