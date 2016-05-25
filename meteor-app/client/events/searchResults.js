/**
 * Created by udit on 25/05/16.
 */
Template.searchResults.onRendered(function () {
	Meteor.call( 'fetchSearchResults', this.data.request.params.query.q, function ( error, response ) {
		if ( error ) {
			console.log("error occured on receiving data on server. ", err );
		} else {
			var hits = response.hits;
			var totalDocuments = hits.total;
			var documents = hits.hits;
			Session.set( 'searchResults', documents );
			Session.set( 'totalDocuments', totalDocuments );
		}
	} );
} );