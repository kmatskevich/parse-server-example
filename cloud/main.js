var facebookHelper = require('./facebookHelper');

Parse.Cloud.define('collectDataFromFacebook', function(req, res) {
	var user = req.user; 
	
 	facebookHelper.loadDataFromFacebook(req).then(function(httpResponse) {
			// success
			console.log(httpResponse);
			res.success(httpResponse);
		},function(httpResponse) {
			// error
			console.error('Request failed with response code ' + httpResponse);
			res.error(httpResponse);
		});
});

