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

		var summary = summarize(response.content);

		return {title:summary.title, tags:summary.topics};
	}
};
