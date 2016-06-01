/**
 * Created by udit on 30/05/16.
 */
import summarize from 'summarize';

urlSearch = {
	isURL: function (url) {
		var rule = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi;
		var regex = new RegExp(rule);
		return regex.test(url);
	},
	getTagsForUrl: function (url) {
		var response = HTTP.get(url);

		if(response.statusCode==200) {

			var summary = summarize( response.content );

			return {title: summary.title, tags: summary.topics};
		} else {
			throw new Meteor.Error(result.statusCode, result.data.error);
		}
	},
	/** Function count the occurrences of substring in a string;
	 * @param {String} string   Required. The string;
	 * @param {String} subString    Required. The string to search for;
	 * @param {Boolean} allowOverlapping    Optional. Default: false;
	 * @author Vitim.us http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
	 */
	getStrCount(string, subString, allowOverlapping = false) {
		string += "";
		subString += "";
		if (subString.length <= 0) return (string.length + 1);

		var n = 0,
			pos = 0,
			step = allowOverlapping ? 1 : subString.length;

		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				++n;
				pos += step;
			} else break;
		}
		return n;
	}
};
