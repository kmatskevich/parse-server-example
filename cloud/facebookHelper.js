exports.loadDataFromFacebook = function(request, responce){
	console.log('loadDataFromFacebook start')
	var user = request.user; 
	if(user != nil){
		console.log(user.name + 'come to the function');
	}
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	if (Parse.FacebookUtils.isLinked(user)) {
        Parse.Cloud.httpRequest({
            url:'https://graph.facebook.com/me?fields=email,name,username&access_token='+user.get('authData').facebook.access_token,
            success:function(httpResponse){
                console.log(httpResponse.data.name);
                console.log(httpResponse.data.email);
                console.log(httpResponse.data.username);
                res.success(httpResponse);
            },
            error:function(httpResponse){
                console.error(httpResponse);
                res.error(httpResponse);
            }
        });
    }else{
	    console.log(user.name + 'not linked');
    }

}

