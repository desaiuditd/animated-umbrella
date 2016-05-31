/**
 * Created by udit on 30/05/16.
 */

Meteor.methods(
	{
		processURL: function (q, offset = 0, limit = 10) {
			if ( q ) {
				var summary = urlSearch.getTagsForUrl(q);
				console.log(summary);
				// return summary;
			}
		}
	}
);