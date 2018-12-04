
var request = (method,url,params) => {
	let opts = {
        method: method,
		body: JSON.stringify(params),
        mode: "cors",
        headers: {
		  "Content-Type": "application/json",
		  "Authorization":localStorage.flutter_token
        }
	  };
	//   upload?opts.headers["Expect"]="100-continue":null
	  
	return fetch(url, opts)
			.then(res => {
				return res.json();
			})
			.catch(err => {
				console.error(err);
				
			});
}
export default request