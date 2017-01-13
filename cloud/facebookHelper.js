var loadDataFromFacebook = function(request, responce){
	var user = request.user; 
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	if (Parse.FacebookUtils.isLinked(user)) {
        Parse.Cloud.httpRequest({
            url:'https://graph.facebook.com/me?fields=email,name,username&access_token='+user.get('authData').facebook.access_token,
            success:function(httpResponse){
                console.log(httpResponse.data.name);
                console.log(httpResponse.data.email);
                console.log(httpResponse.data.username);
            },
            error:function(httpResponse){
                console.error(httpResponse);
            }
        });
    }

}

module.exports = facebookHelper;