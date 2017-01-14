exports.loadDataFromFacebook = function(req, res){
	console.log('loadDataFromFacebook start')
	var user = req.user; 
	console.log(user.name + 'come to the function');
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	Parse.Cloud.httpRequest({
		url: 'https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday,location,gender,picture.width(500).height(500)&access_token=' + user.get('authData').facebook.access_token
		}).then(function(httpResponse) {
			
			user.set("first_name", httpResponse.data.first_name);
			console.log("first_name = " + httpResponse.data.first_name);
			user.set("last_name", httpResponse.data.last_name);
			console.log("last_name = " + httpResponse.data.last_name);
			
			user.save(null, {
                useMasterKey: true,
                success: res.success(httpResponse.text), 
                error: function(obj, error) { 
                    res.error(error.message);
                } 
            });
			
		},function(httpResponse) {
			// error
			console.error('Request failed with response code ' + httpResponse.status);
			res.error(httpResponse);
		});

}

