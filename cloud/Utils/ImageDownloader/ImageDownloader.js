var _ = require('underscore');

exports.filesFromUrls = function(urls) {
    var promises = _.map(urls, function (url, index) {
        return fileFromUrl(url, ''+index);
    });
    return Parse.Promise.when(promises).then(function() {
        return _.toArray(arguments);
    });
}

exports.fileFromUrl = function(url, name) {
    return Parse.Cloud.httpRequest({url: url}).then(function(httpResponse) {
        var imageBuffer = httpResponse.buffer;
        var base64 = imageBuffer.toString("base64");
        var file = new Parse.File(name, { base64: base64 });
        // edit - pretty sure file.save resolves to file, but just in case...
        return file.save().then(function() { return file; });
    }, function(error) {
        // can't fetch the image for some reason
        // ideas:
        return null; // and have your UI check for nulls in the user image array
        // or return cannedImage(); where this function returns a promise 
        // for a PFFile that already exists
    });
}
