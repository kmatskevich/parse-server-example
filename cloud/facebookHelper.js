var imageDownloader = require("./Utils/ImageDownloader/ImageDownloader");

exports.loadDataFromFacebook = function(req){
	
	console.error('fucntion loadDataFromFacebook starts ');
	
	var user = req.user; 
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	retrun Parse.Cloud.httpRequest({
		url: 'https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday,location,gender,picture.width(500).height(500)&access_token=' + user.get('authData').facebook.access_token
		}).then(function(httpResponse) {
			
			console.error('start parsing of data from fb');
			
			var data = httResponce.data;
			
			user.set("first_name", data.first_name);
			user.set("last_name", data.last_name);
			user.set("gender", data.gender);
			user.set("location", data.location);
			user.set("email", data.email);
			
			if(data.get("picture")){
				var picture = data.picture;
				
				console.error('user has picture');
				
				console.log('data: ' + picture.data);
				console.log('url: ' + picture.data.url);
				
				return Parse.Promise.when(getImageForUser(user, picture.data.url));
			}else{
				console.error('user hasnt picture, saving user');
				return Parse.Promise.when(user.save(null, {
                useMasterKey: true
                }));
            }
		},function(httpResponse) {
			// error
			console.error('Request failed with response code ' + httpResponse.status);
			return Parse.Promise.error('Request failed with response code ' + httpResponse.status);
		});
}

function getImageForUser(user, url) {
	
	return imageDownloader.fileFromUrl(url).then(function(file) {
        user.set("photo", file);
        return user.save(null, {
                useMasterKey: true
            });
    });
}
