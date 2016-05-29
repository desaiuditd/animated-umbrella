/**
 * Created by udit on 27/05/16.
 */

Tracker.autorun(function () {
	Meteor.subscribe("userSettings");
} );

AutoForm.hooks(
	{
		"user-settings": {
			onSuccess: function(formType, result) {
				auSettings.setAlertSuccess('Settings saved successfully.');
			},
		}
	}
);
