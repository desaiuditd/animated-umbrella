/**
 * Created by udit on 25/05/16.
 */
Template.searchResults.helpers(
	{
		existingQuery: function () {
			return this.request.params.query.q;
		},
		searchResults: function () {
			return Session.get('searchResults') || [];
		}
	}
);