const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');

const PROD = process.argv.indexOf('-p') !== -1;

const config = {
    entry: {
        app: "./src/Index.js",
        //angular: "./src/AngularDep.js",
        //directives: './src/app/directives/Directives.js',
        //controllers: './src/app/controllers/Controllers.js',
        //services: './src/app/services/Services.js'

    },
    output: {
        filename: PROD ? "scripts/[name].min.js?[hash]-[chunkhash]" : "scripts/[name].js?[hash]-[chunkhash]",
        chunkFilename: PROD ? "scripts/[name].min.js?[hash]-[chunkhash]" : "scripts/[name].js?[hash]-[chunkhash]",
        path: __dirname + "/assets",
        publicPath: "/assets/"
    },
    devServer:{
        port: 8080,
        contentBase: __dirname + "/src/app/public/"
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
        //new cleanPlugin(['assets']),
        // new HtmlWebpackPlugin({
        //     template: './src/app/public/index.html'
        // }),
        new webpack.HotModuleReplacementPlugin(),
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
            filename: PROD ? "scripts/commons.min.js" : "scripts/commons.js"
        }),
        new CopyWebpackPlugin([{
            from: './src/app/public',
            to: 'html/'
        }])
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