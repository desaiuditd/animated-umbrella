/**
 * Created by udit on 27/05/16.
 */
auSettings = {
	getResultsPerPage: function () {
		var limit = 10;

		var user = Meteor.user();

		if ( user.auSettings && user.auSettings.resultsPerPage ) {
			limit = user.auSettings.resultsPerPage;
		}

		return limit;
	},
	setResultsPerPage: function (resultsPerPage) {
		Meteor.users.update(
			{ _id: Meteor.user()._id },
			{ $set: { auSettings: { resultsPerPage: resultsPerPage } } }
		);
	}
};