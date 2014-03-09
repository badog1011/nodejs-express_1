/**
*
* Search Function
*
* @parm {String} search query
* @parm {Function} callback
* @api public
*
**/
var request = require('superagent')

module.exports = function search (query, fn) {
	request.get('https://api.twitter.com/1.1/search/search.json')
		.data({ q:query })
		.end(function (res) {//處理回應資料
			if (res.body && Array.isArray(res.body.results)) { //result: tweets
				return fn (null, res.body.results);
			}
			fn(new Error('Bad Twitter Response'));
		});
}