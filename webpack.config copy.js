const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { VueLoaderPlugin } = require('vue-loader'),
    isDebug = process.env.NODE_ENV !== 'production'
let config= {
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
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // 生成html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ]
}
const devConfigFun = argument=> {
    argument.devtool= '#cheap-module-eval-source-map'
    argument.devServer= {
        port: '8080',
        host: '0.0.0.0',
        overlay: {
            errors:true
        },
        open: true,
        hot: true
    }
    argument.plugins.push(
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorPlugins()
    )
}
if(isDebug) {
    config = devConfigFun(config)
}
module.exports = config