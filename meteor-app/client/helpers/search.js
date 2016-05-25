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
		},
		showNoResultsFound: function () {
			var data = this.data();

			if ( data.queryParams.q == undefined )
				return false;

			if ( data.queryParams.q.length == 0 )
				return false;

			if ( ! Session.get('es.requestExecuted') )
				return false;

			if ( Session.get('es.totalDocuments') )
				return false;

			return true;
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
				return content.substring(0, 499) + ' ...';
			} else {
				return content;
			}
		}
	}
);