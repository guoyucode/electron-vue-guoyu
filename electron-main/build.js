/**
 * webpack编译使用该文件
 * */
const path = require("path");
const {dependencies} = require('../package.json')
module.exports = {
	mode: "production",
	entry: path.resolve(__dirname, "./main"),
	externals: [
		...Object.keys(dependencies),
	],
	resolve: {
		alias: {
			'__static': path.resolve(__dirname, './public'),
			'@': path.join(__dirname, './src/renderer'),
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['.js', '.json', '.node']
	},
	target: 'electron-main',
	output: { //输出路径和文件名，使用path模块resolve方法将输出路径解析为绝对路径
		path: path.resolve(__dirname, "../dist"), //将js文件打包到dist的目录
		filename: "main.js" //使用 main.js 打包出来的js文件会分别按照入口文件配置的属性来命名
	}
}
