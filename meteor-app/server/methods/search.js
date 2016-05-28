/**
 * Created by udit on 25/05/16.
 */
Meteor.methods(
	{
		fetchSearchResults: function ( q, offset = 0, limit = 10 ) {
			if ( q ) {
				var query = ES.queryBuilder(q, offset, limit);

				var response = ES.queryExecutioner(query);

				if(response.statusCode==200) {
					return response.data;
				} else {
					throw new Meteor.Error(result.statusCode, result.data.error);
				}
			}
		}
	}
);