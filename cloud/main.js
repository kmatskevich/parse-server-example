
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define('getMessagesForUser', function(request, response) {
  var user = request.user; // request.user replaces Parse.User.current()
  var token = user.getSessionToken(); // get session token from request.user

  var query = new Parse.Query('Messages');
  query.equalTo('recipient', user);
  query.find({ sessionToken: token }) // pass the session token to find()
    .then(function(messages) {
      response.success(messages);
    });
});

Parse.Cloud.define('getTotalMessageCount', function(request, response) {

  // Parse.Cloud.useMasterKey() <-- no longer available!

  var query = new Parse.Query('Messages');
  query.count({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
      response.success(count);
    });
});

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
	var user = request.object;
	if (request.object.get('authData') != {}){
    	var fb_auth = request.object.get('authData')['facebook'];
		var email;          
		Parse.Cloud.httpRequest({ method: "GET",
									 url: "https://graph.facebook.com/" + fb_auth['id'] + "?access_token=" + fb_auth['access_token'],
							     success: function(httpResponse) {
								 email = httpResponse.data['email'];
								 Parse.Cloud.useMasterKey();
								 user.setEmail(email, {});
								 user.save();
								},error: function(httpResponse) {
    							}
								});
	} 
}