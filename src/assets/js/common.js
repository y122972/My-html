export default (function (env){
	let envObj = {
		env: '请配置工程环境~~~',
		baseUrl: ''
	}
	if (env == 'production'){
		// 使控制台 console 输出失效
		console.log = console.warn = console.error = console.info = function(){}
		envObj.env = '当前工程环境：production'
		envObj.baseUrl = 'http://aisss.xyz'
	} else if (env == 'development'){
		envObj.env = '当前工程环境：development'
		envObj.baseUrl = 'http://127.0.0.1:3000'
	}
	return envObj
})(process.env.NODE_ENV === 'production' ? 'production' : 'development')