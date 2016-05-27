var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
console.log("+++++++++++"+process.env.NODE_ENV+"***********")
var TEST = process.env.NODE_ENV == "test" ;
console.log(TEST)
var filename= TEST?"[name]":"[chunkhash:8].[name]";
console.log(filename)
var extractCSS = new ExtractTextPlugin('stylesheets/'+filename+'.css');
//var ignoreFiles = new webpack.IgnorePlugin(new RegExp("^(jquery|react|react-dom)$"));

//动态创建html
var HtmlWebpackPlugin = require('html-webpack-plugin');
var htmlPlugin = new HtmlWebpackPlugin({
    title:"my APP",
    filename: '../index-publish.html',
    template:"template.html"
});

var config ={
    entry: {
        app: ["./app/app.jsx"],
        vendor:["react","react-dom"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        //publicPath: "/data/assets/build/",
        publicPath: "build/",
        filename: filename+".js"
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
                presets:['es2015','react']
            }
        },
            {
                test:/\.scss$/,
                loader:extractCSS.extract('style-loader','css?sourceMap!sass?includePaths[]='+ path.resolve(__dirname, 'app/scss'))
            },
            {
                test:/\.html$/,loader:"html-loader"
            },
            { test: /\.png$/, loader: "file-loader?name=[hash:8].[name].[ext]" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        }),
        extractCSS,
        //ignoreFiles
        new webpack.optimize.CommonsChunkPlugin("vendor", "base.js")
        ,htmlPlugin
    ]
};
if(process.env.NODE_ENV == "test"){
    config.devtool= "source-map";
    config.output.publicPath="/";
}
console.log(config)
module.exports = config