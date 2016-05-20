/**
 * Created by udit on 19/05/16.
 */

// Set up login services
Meteor.startup( function () {
	// Add Google configuration entry
	ServiceConfiguration.configurations.update(
		{
			service: "google"
		}, {
			$set: {
				clientId: "900272737854-ovv4hofer8jjlgr98vn2cq40j9qim7ib.apps.googleusercontent.com",
				client_email: "desaiuditd@gmail.com",
				secret: "nK7K-HkPmgPJ16ZcIkm74Me4"
			}
		}, {
			upsert: true
		}
	);

	// Add Facebook configuration entry
	ServiceConfiguration.configurations.update(
		{
			service: "facebook"
		}, {
			$set: {
				appId: "601637623347176",
				secret: "fa26eb5ea0c64f317ffe709c389efe4a"
			}
		}, {
			upsert: true
		}
	);
} );
