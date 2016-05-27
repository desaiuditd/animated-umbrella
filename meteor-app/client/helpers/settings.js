/**
 * Created by udit on 25/05/16.
 */
Template.settings.helpers(
	{
		getUserSettings: function () {
			var settings = {
				resultsPerPage: 10
			};

			var user = Meteor.user();

			if ( user.auSettings && user.auSettings.resultsPerPage ) {
				settings.resultsPerPage = user.auSettings.resultsPerPage;
			}

			return settings;
		}
	}
);