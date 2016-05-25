/**
 * Created by udit on 25/05/16.
 */
Template.search.helpers(
	{
		existingQuery: function () {
			var data = this.data();
			return data.queryParams.q;
		},
		searchResults: function () {
			return Session.get('es.searchResults') || [];
		},
		timeTook: function () {
			return Session.get('es.timeTook') || 0;
		},
		totalDocuments: function () {
			return Session.get('es.totalDocuments') || 0;
		}
	}
);

Template.searchResult.helpers(
	{
		myDebug: function ( obj ) {
			console.log(obj);
		},
		textContent: function ( content ) {
			if ( content.length > 500 ) {
				return content.substring(0, 500) + ' ...';
			} else {
				return content;
			}
		}
	}
);