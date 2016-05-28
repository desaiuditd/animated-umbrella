var summarize = require('summarize');
var request = require('request');

exports.getTagsForUrl=function(url,callback){
request.get(url,function(error,res,body){
    var summary=summarize(body.toString());
    callback({title:summary.title, tags:summary.topics});
});
}