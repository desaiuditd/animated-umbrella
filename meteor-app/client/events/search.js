/**
 * Created by udit on 25/05/16.
 */
Template.search.onRendered(function () {
	var data = this.data.data();
	Meteor.call( 'fetchSearchResults', data.queryParams.q, function ( error, response ) {
		if ( error ) {
			console.log("error occured on receiving data on server. ", err );
		} else {
			var timeTook = response.took;
			var hits = response.hits;
			var totalDocuments = hits.total;
			var documents = hits.hits;

			Session.set( 'es.searchResults', documents );
			Session.set( 'es.totalDocuments', totalDocuments );
			Session.set( 'es.timeTook', timeTook );
		}
	} );
} );