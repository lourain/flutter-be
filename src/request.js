
var request = (method,url,params,ctype) => {
	let opts = {
        method: method,
        body: JSON.stringify(params),
        mode: "cors",
        headers: {
          "Content-Type": ctype || "application/json"
        }
      };
	return fetch(url, opts)
			.then(res => {
				return res.json();
			})
			.catch(err => {
				console.error(err);
			});
}
export default request