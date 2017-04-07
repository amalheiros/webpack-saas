var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cssnano = require('cssnano');
const PROD = process.argv.indexOf('-p') !== -1;

console.log(PROD);

const config = {
    entry: {
        app: "./src/script-1.js",
    },
    output: {
        filename: PROD ? "[name].min.js?[hash]-[chunkhash]" : "[name].js?[hash]-[chunkhash]",
        chunkFilename: PROD ? "[name].min.js?[hash]-[chunkhash]" : "[name].js?[hash]-[chunkhash]",
        path: __dirname + "/assets",
        publicPath: "/assets/"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    publicPath: "../"
                })
            },
            {
                test: /\.png$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)$/,
                use: ['url-loader'],
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader',
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
            disable: false,
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "Commons",
            filename: PROD ? "commons.min.js" : "commons.js"
        })
    ]
};

if(PROD){
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { 
                warnings: false 
            }
        })
    )
}

module.exports = config