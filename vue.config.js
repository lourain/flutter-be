module.exports = {
    baseUrl:'/flutter-be/',
	devServer:{
		proxy:{
			'^/api':{
				target:'http://localhost:9999',
				pathRewrite:{
                    '^/api':''
                }
			}
		}
	}
}