module.exports = {
    baseUrl:'./',
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