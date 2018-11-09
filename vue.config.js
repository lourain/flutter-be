module.exports = {
	devServer:{
		proxy:{
			'^/fluttering':{
				target:'http://localhost:9999',
				pathRewrite:{
					'^/fluttering':''
				}
			}
		}
	}
}