
var request = (method,url,params) => {
    let host = window.location.hostname
    if(host == 'backend.fluttering.cn'){
        host = 'https://www.fluttering.cn'
    }else{
        host = ''
    }
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
	  
	return fetch(host+url, opts)
			.then(res => {
				return res.json();
			})
			.catch(err => {
				console.error(err);
				
			});
}
export default request