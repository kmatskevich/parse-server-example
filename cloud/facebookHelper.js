exports.loadDataFromFacebook = function(request, responce){
	console.log('loadDataFromFacebook start')
	var user = req.user; 
	console.log(user.name + 'come to the function');
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	Parse.Cloud.httpRequest({
		url: 'https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday,location,gender,picture.width(500).height(500)&access_token=' + user.get('authData').facebook.access_token
		}).then(function(httpResponse) {
			// success
			console.log(httpResponse.text);
			res.success(httpResponse.text);
		},function(httpResponse) {
			// error
			console.error('Request failed with response code ' + httpResponse.status);
			res.error(httpResponse);
		});

}

