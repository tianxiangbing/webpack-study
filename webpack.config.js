var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
module.exports = {
    devtool: "source-map",
    entry: {
        app: ["./app/app.jsx"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "[name].js"
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
                loader:extractCSS.extract('style-loader','css?modules&sourceMap!sass')
            }
        ]
    },
    plugins: [
        extractCSS
    ]
};