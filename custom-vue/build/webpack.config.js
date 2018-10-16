//引入依赖模块
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //入口文件 相对路径 可以写成数组 对象 字符串
    entry: {
        //path.resolve([from...],to ) 将to参数解析为绝对路径
        index: path.resolve(__dirname, '../src/entry/index.js'),
        //需要被提取为公共模块的群组
        vendors: ['vue', 'vue-router', 'jquery']
    },
    //输出配置
    output: {
        //输出文件 路径相对路径
        path: path.resolve(__dirname, '../output/static.js'),
        // 设置publicPath这个属性会出现很多问题：
        // 1.可以看成输出文件的另一种路径，差别路径是相对于生成的html文件；
        // 2.也可以看成网站运行时的访问路径；
        // 3.该属性的好处在于当你配置了图片CDN的地址，本地开发时引用本地的图片资源，上线打包时就将资源全部指向CDN了，如果没有确定的发布地址不建议配置该属性，特别是在打包图片时，路径很容易出现混乱，如果没有设置，则默认从站点根目录加载
        // publicPath: '../static/js/',
        //基于文件的md5生成的hash 名称的scripte 防止缓存
        filename: '[name].[hash].js',
        //非主入口的文件名 即违背列在entry的入口中 但是需要打包出来的文件名称
        chunkFilename: '[id].[chunkhash].js'
    },
    //其他解决方案
    resolve: {
        //require省略得后缀名 遇到.vue也要去加载
        extensions: ['', '.js', '.vue'],
        //模块别名地址 方便后续直接饮用别名 无需写出全部地址 注意后续如果不能识别该别名 需要先设置root
        alias: {}
    },
    //不进行打包的模块
    externals: {},
    //模块加载器
    module: {
        //loader 相当于gulp中的task 用来处理在入口文件中的require 和其他地方引用近来的文件 test是正则表达式 匹配要处理的文件 loader匹配要是用的loader '-loader'可以省略 include把要处理的目录包括进来 exclude排除不处理的目录
        loaders: [{
                //使用 vue-loader 加载.vue 结尾的文件
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0'],
                    plugins: ['transform-runtime']
                }
            },
            {
                //shiyong9bcss-loader和style-loader 加载.css文件
                //将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autopprefixer-loader'),
                exclude: /node_modules/,
            },
            //使用less-loader css-loader 和style-loader加载.less文件
            {
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader'),
                exclude: /node_modules/,
            },
            //加载图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    //把较小的图片转化成base64的字符串内嵌生成的js文件里
                    limit: 10000,
                    //路径与当前配置文件下的pubnlicPath相结合
                    name: '../img/[name].[ext]?[hash:7]'
                }
            },
            //加载图标
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
                    limit: 10000,
                    name: '../fonts/[name].[ext]?[hash:7]',
                    prefix: 'font'
                }
            }
        ]
    },
    // 配置插件项
    plugins: []
};