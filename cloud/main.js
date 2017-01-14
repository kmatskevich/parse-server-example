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

/*
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
*/

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
