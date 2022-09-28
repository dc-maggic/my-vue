
// import { getPages } from './utils.js'
const path = require('path'),
    { VueLoaderPlugin } = require('vue-loader'),
    copyWebpackPlugin = require('copy-webpack-plugin'),
    { getPages } = require('./build/utils.js'),
    isDebug = process.env.NODE_ENV !== 'production'
const {entries, htmlPlugins} = getPages(`./src/pages/**/index.js`)
let config = {
    mode: process.env.NODE_ENV,
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 生成html文件
        ...htmlPlugins,
        // 静态资源输出到根目录
        new copyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "./public"),
                to: './',
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: ["**/**.html*"]
                }
            }]
        })
    ]
}
if(isDebug) {
    // webpack5 的 devtool 参数不一样
    config.devtool= 'eval-cheap-module-source-map'
    config.devServer= {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true
    }
}
module.exports = () => {
    return config
}