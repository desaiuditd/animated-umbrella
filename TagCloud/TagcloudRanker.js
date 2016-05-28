const Natural = require('natural');
var HashMap= require('hashmap');

var TfIdf = Natural.TfIdf;
var Tokenizer= new Natural.WordTokenizer();  ///^[^\s]+/
Natural.PorterStemmer.attach();
var getHist=function(words,map){
  for( i in  words)
    if(words[i].length >1 ){
    	var val=map.get(words[i]+'');
      (val!=undefined || val!=null) ? map.set(words[i]+'',{text:words[i]+'',count:val.count+1}) : map.set(words[i]+'',{text:words[i]+'',count:1});
    }

}
exports.getResults = function(query,data){
	var map= new HashMap();
	var	tfidf = new TfIdf();
	for (var i = 0; i < data.length; i++) {
	  getHist(data[i]['_source'].tags,map);
	  getHist(Tokenizer.tokenize(data[i]['_source'].text.stem()),map);
	}
	return map.values();

} 
