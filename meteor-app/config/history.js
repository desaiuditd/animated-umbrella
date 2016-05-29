/**
 * Created by udit on 28/05/16.
 */
auHistory = {
	addQuery: function (q) {
		var userID = Meteor.userId();

		if ( userID ) {
			return query.insert(
				{
					user_id: userID,
					query: q
				}
			);
		}

		return "";
	}
};