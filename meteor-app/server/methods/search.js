/**
 * Created by udit on 25/05/16.
 */
Meteor.methods(
	{
		fetchSearchResults: function ( q ) {
			var query = ES.queryBuilder(q);

			var response = ES.queryExecutioner(query);

			if(response.statusCode==200) {
				console.log("response received.");
				return response.data;
			} else {
				console.log("Response issue: ", result.statusCode);
				throw new Meteor.Error(result.statusCode, result.data.error);
			}
		}
	}
);