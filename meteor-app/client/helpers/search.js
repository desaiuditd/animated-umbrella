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
		totalPages: function () {
			var limit = 10;
			return this.totalDocuments() / 10;
		},
		showNoResultsFound: function () {
			var data = this.data();

			console.log(data.queryParams.q);

			if ( data.queryParams.q == undefined )
				return false;

			if ( data.queryParams.q.length == 0 )
				return false;

			console.log("requestTriggered: "+Session.get('es.requestTriggered'))
			if ( ! Session.get('es.requestTriggered') )
				return false;

			console.log("requestDone: "+Session.get('es.requestDone'))
			if ( ! Session.get('es.requestDone') )
				return false;

			console.log("total docs: "+Session.get('es.totalDocuments'))
			if ( Session.get('es.totalDocuments') )
				return false;

			console.log("show no results");
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