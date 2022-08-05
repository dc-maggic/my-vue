const path = require('path'),
    // program = require('commander'),
    // { exec } = require('child_process')
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader'),
    copyWebpackPlugin = require('copy-webpack-plugin'),
    isDebug = process.env.NODE_ENV !== 'production'
// const pages = getPages(`./src/pages/**/index.js`)
let config = {
    mode: process.env.NODE_ENV,
    entry: {
        rose:path.join(__dirname, 'src/pages/rose/index.js'),
        other: path.join(__dirname, 'src/pages/other/index.js')
    },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 生成html文件
        // new HtmlWebpackPlugin({
        //     filename: '[name].html',
        //     // 本地模板的所在的文件路径
        //     template: path.join(__dirname, 'public/index.html'),
        //     inject: true
        // }),
        new HtmlWebpackPlugin({
            filename: 'rose.html',
            // 本地模板的所在的文件路径
            template: path.join(__dirname, 'public/index.html'),
            inject: true,
            chunks: ['rose']
        }),
        new HtmlWebpackPlugin({
            filename: 'other.html',
            // 本地模板的所在的文件路径
            template: path.join(__dirname, 'public/index.html'),
            inject: true,
            chunks: ['other']
        }),
        // 静态资源输出到根目录
        new copyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, "./public"),
                to: './',
                globOptions: {
                    dot: true,
                    gitignore: true,
                    ignore: ["**/index.html*"]
                }
            }]
        })
    ]
}
if(isDebug) {
    // webpack5 的 devtool 参数不一样
    config.devtool= 'eval-cheap-module-source-map'
    config.devServer= {
        // 看看怎么配置
        // static: {
        //     directory: path.join(__dirname, 'public'),
        // },
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        hot: true
    }
}
// console.log(config)
module.exports = () => {
    return config
}