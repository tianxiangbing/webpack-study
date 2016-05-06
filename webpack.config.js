var path = require("path");
var webpack = require('webpack');

console.log(process.env.NODE_ENV)
var TEST = process.env.NODE_ENV === "test" ;
var filename= TEST?"[name]":"[chunkhash:8].[name]";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('stylesheets/'+filename+'.css');
//var ignoreFiles = new webpack.IgnorePlugin(new RegExp("^(jquery|react|react-dom)$"));//排除文件，但不能再打包这个文件了

//动态创建html
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPlugin = new HtmlWebpackPlugin({
    title:"my APP",
    filename: '../index-publish.html',
    template:"template.html"
});
module.exports = {
    //devtool: "source-map",
    entry: {
        app: ["./app/app.jsx"],
        vendor:["react","react-dom"]//单独打包react和react-dom进vendor
    },
    output: {
        path: path.resolve(__dirname, "build"),
        //publicPath: "/assets/",
        publicPath:"build",
        filename: filename+".js"//文件名取hash8位，默认16位
    },
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "bower_components"],
        extensions: ['', '.js', '.jsx','css']
    },
    module:{
        loaders:[{
            jsx:/\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader:'babel',
            query:{
                presets:['es2015','react']//react使用es6的写法
            }
        },
            {
                test:/\.scss$/,
                loader:extractCSS.extract('style-loader','css?modules&sourceMap!sass')//css?modules可以js里引用css，但会导致css的名称变成hash
            },
            {
                test:/\.html$/,loader:"html-loader"
            }
        ]
    },
    plugins: [
        extractCSS,//输出样式文件
        //ignoreFiles
        new webpack.optimize.CommonsChunkPlugin("vendor", "base.js")//输出vendor名字为base.js
        ,htmlPlugin
    ]
};