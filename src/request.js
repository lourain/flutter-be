
var request = (method,url,params) => {
	let opts = {
        method: method,
        body: JSON.stringify(params),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      };
	return fetch(url, opts)
			.then(res => {
				return res.json();
			})
			.catch(err => {
				console.log(err);
			});
}
export default request