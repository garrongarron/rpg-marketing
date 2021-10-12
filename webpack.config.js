const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let folder = 'src'
module.exports = {
    entry: `./${folder}/indexWebPack.js`,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                // test: /\.s[ac]ss$/i,
                test: /.(css|sass|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                include: [
                    path.resolve(__dirname, folder),
                    path.resolve(__dirname, 'js')
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                  ],
            },
            {
                type: "asset",
                test: /\.(png|svg|jpg|gif)$/i,
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: `./test/template.html`,
            filename: '../init.html',
        }),
    ],
};