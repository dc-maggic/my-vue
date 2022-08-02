const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader'),
    copyWebpackPlugin = require('copy-webpack-plugin')
    isDebug = process.env.NODE_ENV !== 'production'


let config = {
    mode: process.env.NODE_ENV,
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'index.js',
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'public/index.html'),
            inject: true
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
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: true
    }
}
// console.log(config)
module.exports = () => {
    return config
}