/**
 * Created by udit on 25/05/16.
 */
Template.search.helpers(
	{
		existingQuery: function () {
			return this.request.params.query.q;
		},
		searchResults: function () {
			return Session.get('searchResults') || [];
		}
	}
);