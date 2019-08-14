/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-12 18:01:43
 * @LastEditTime: 2019-08-13 10:39:59
 * @LastEditors: Please set LastEditors
 */
export default (function (env){
	let envObj = {
		env: '请配置工程环境~~~',
		baseUrl: ''
	}
	if (env == 'production'){
		// 使控制台 console 输出失效
		console.log = console.warn = console.error = console.info = function(){}
		envObj.env = '当前工程环境：production'
		envObj.baseUrl = 'http://aisss.xyz:3000'
	} else if (env == 'development'){
		envObj.env = '当前工程环境：development'
		envObj.baseUrl = 'http://localhost:3000/api/'
	}
	return envObj
})(process.env.NODE_ENV === 'production' ? 'production' : 'development')