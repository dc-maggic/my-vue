const glob = require('glob'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    fs = require('fs')

module.exports = {
    getPages: function (globPath) {
    const entries = {}, htmlPlugins = []
    glob.sync(globPath).forEach(function (entry) {
        const paths = entry.split('/') || []
        const entryName = paths[3];
        let moduleIndexHtmlPath = `../public/${entryName}.html`
        entries[entryName] =  path.join(__dirname, `../src/pages/${entryName}/index.js`)
        let template = (fs.existsSync(moduleIndexHtmlPath) && moduleIndexHtmlPath)
                || `public/index.html`
        htmlPlugins.push(new HtmlWebpackPlugin({
            filename: `${entryName}.html`,
            // 本地模板的所在的文件路径
            template: template,
            inject: true,
            chunks: [entryName]
        }))
    })
    return {entries, htmlPlugins}
}}