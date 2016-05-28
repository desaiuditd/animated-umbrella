/**
 * Created by udit on 27/05/16.
 */
Meteor.methods(
	{
		saveUserSettings: function (settings) {
			auSettings.setResultsPerPage(settings.resultsPerPage);
		}
	}
);