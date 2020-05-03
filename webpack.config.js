
const path = require('path');
const htmlWebpackPlugin  = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',

    entry: './app/index.js',

    output: {
        filename: 'main-[hash].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new htmlWebpackPlugin({
        template: "./app/index.html"
        }),
        
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({filename: '[name].[hash].css'})
    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,    //3. extract css into files
                    "css-loader",   //2. turns css into commonjs
                    "sass-loader"  //1. turn sass into css
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images",

                    }
                }
            },
            {
                loader: 'webp-loader',
                options: {
                    quality: 13
                }
            }

        ]
    }
}