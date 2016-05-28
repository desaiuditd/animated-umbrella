var Tagger= require('./MiniScrapper');

Tagger.getTagsForUrl('http://www.technobuffalo.com/2016/05/25/game-of-thrones-apology-jimmy-kimmel-live/',function(result){
	console.log(result);
});