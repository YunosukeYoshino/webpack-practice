const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { isContext } = require('vm');
module.exports = {
    entry: './src/javascript/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascript/main.js',
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.png|\.jpg/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]',
                    //     },
                    // },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    stats: {
        children: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',
            filename: 'access.html',
        }),
        new CleanWebpackPlugin(),
    ],
}
