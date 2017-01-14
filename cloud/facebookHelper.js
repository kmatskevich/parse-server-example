var Jimp = require("jimp");

exports.loadDataFromFacebook = function(req, res){
	console.log('loadDataFromFacebook start')
	var user = req.user; 
	console.log(user.name + 'come to the function');
	var accessToken = user.get('authData')['facebook']['access_token'];
	
	Parse.Cloud.httpRequest({
		url: 'https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday,location,gender,picture.width(500).height(500)&access_token=' + user.get('authData').facebook.access_token
		}).then(function(httpResponse) {
			
			var data = httResponce.data;
			
			user.set("first_name", data.first_name);
			user.set("last_name", data.last_name);
			user.set("gender", data.gender);
			user.set("location", data.location);
			user.set("email", data.email);
			
			if(data.get("picture")){
				var picture = data.picture;
				
				console.log('data: ' + picture.data);
				console.log('url: ' + picture.data.url);
				
/*
				Jimp.read(picture.data.url())
				  .then(function(image) {
				    var currentWidth = image.bitmap.width;
				    var currentHeight = image.bitmap.height;
				    var ratio = currentHeight / currentWidth;
				    if (currentWidth > 640) {
				      return image.resize(640, 640 * ratio)
				    } else {
				      return image;
				    }
				  })
				  .then(function(image) {
					  image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
					  	if (err) return reject(err);
					  	var file = new Parse.File('mainAvatar.jpg', {base64: buffer});
					  	resolve(file.save());
    				  });
				  })
				  .then(function(cropped) {
				    console.log("### 2");
				    user.set("thumb", cropped);
				  })
*/
			}
			
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

