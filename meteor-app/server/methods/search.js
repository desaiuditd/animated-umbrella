/**
 * Created by udit on 25/05/16.
 */
Meteor.methods(
	{
		fetchSearchResults: function ( q, indices, offset = 0, limit = 10 ) {
			if ( q ) {
				var query = ES.queryBuilder(q, indices, offset, limit);

				var response = ES.queryExecutioner(query);

				if(response.statusCode==200) {

					ES.processTags(response.data);

					return response.data;
				} else {
					throw new Meteor.Error(result.statusCode, result.data.error);
				}
			}
		},
		fetchTagResults: function (tag, indices, offset =0, limit =10) {
			if ( tag ) {
				var query = ES.tagQueryBuilder(tag, indices, offset, limit);

				var response = ES.queryExecutioner(query);

				if(response.statusCode==200) {

					ES.processTags(response.data);

					return response.data;
				} else {
					throw new Meteor.Error(result.statusCode, result.data.error);
				}
			}
		}
	}
);