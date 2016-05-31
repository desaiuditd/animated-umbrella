/**
 * Created by udit on 28/05/16.
 */
auHistory = {
	addQuery: function (q, indices) {
		var userID = Meteor.userId();

		if ( userID ) {
			return query.insert(
				{
					user_id: userID,
					query: q,
					meta: {
						indices: indices
					}
				}
			);
		}

		return "";
	},
	addActivity: function (userID, type, qid, docid, meta) {
		return activity.insert(
			{
				user_id: userID,
				type: type,
				query_id: qid,
				document_id: docid,
				meta: meta
			}
		);
	}
};
