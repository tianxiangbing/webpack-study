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
module.exports = {
    //devtool: "source-map",
    entry: {
        app: ["./app/app.jsx"],
        vendor:["react","react-dom"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
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
                loader:extractCSS.extract('style-loader','css?sourceMap!sass')
            }
        ]
    },
    plugins: [
        extractCSS,
        //ignoreFiles
        new webpack.optimize.CommonsChunkPlugin("vendor", "base.js")
    ]
};