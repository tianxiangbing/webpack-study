#webpack-study
#注意事项

    webpack配置中的loader尽量使用!分隔，

    loader后跟用感叹号分隔的，loaders后跟一个数组。

     devtool: "source-map",调试模式

     若jsx中要调scss的类名，在css-loader后加入modules参数即可