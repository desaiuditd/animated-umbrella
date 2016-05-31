/**
 * Created by udit on 30/05/16.
 */

Meteor.methods(
	{
		processURL: function (q, indices, offset = 0, limit = 10) {
			if ( q ) {
				var summary = urlSearch.getTagsForUrl(q);

				if ( summary && summary.tags ) {

					var query = ES.queryBuilder(summary.tags.slice(0,4).join(' '), indices, offset, limit);

					var response = ES.queryExecutioner(query);

					if(response.statusCode==200) {

						ES.processTags(response.data);

						return response.data;
					} else {
						throw new Meteor.Error(result.statusCode, result.data.error);
					}
				} else {
					throw new Meteor.Error(500, "No summary found");
				}
			}
		}
	}
);