var webpack=require('webpack');
var HtmlwebpackPlugin=require('html-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var UglifyJsPlugin=require('uglifyjs-webpack-plugin');
var {merge}=require('webpack-merge');
var webpackBaseConfig=require('./webpack.config.js');
webpackBaseConfig.plugins=[];
module.exports=merge(webpackBaseConfig,{
	output:{
		publicPath:'./dist/',
		filename:'[name].[hash].js',
		chunkFilename:'[name].chunk.js'
	},
	plugins:[
		new ExtractTextPlugin({
			filename:'[name].[hash].css',
			allChunks:true
		}),
		new webpack.DefinePlugin({
			'progress.env':{
				NODE_ENV:'"production"'
			}
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
                warnings: false,
                compress: {
                    pure_funcs: ['console.log','console.debug']//移除console
                }
            }
		}),
		new HtmlwebpackPlugin({
			filename:'../index_prod.html',
			template:'./index.ejs',
			inject:false
		}),
	]
});
