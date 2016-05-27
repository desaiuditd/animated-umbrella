/**
 * Created by udit on 27/05/16.
 */
Meteor.methods(
	{
		saveUserSettings: function (settings) {
			Meteor.users.update(
				{ _id: Meteor.user()._id },
				{ $set: { auSettings: { resultsPerPage: settings.resultsPerPage } } }
			);
		}
	}
);