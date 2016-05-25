/**
 * Created by udit on 25/05/16.
 */
Template.search.onRendered(function () {
	var data = this.data.data();

	if ( data.queryParams.q ) {

		Session.set( 'es.requestTriggered', 1 );

		Meteor.call( 'fetchSearchResults', data.queryParams.q, function ( error, response ) {
			if ( error ) {
				console.log( "error occured on receiving data on server. ", err );
			} else {
				var timeTook = response.took;
				var hits = response.hits;
				var totalDocuments = hits.total;
				var documents = hits.hits;

				Session.set( 'es.requestDone', 1 );
				Session.set( 'es.searchResults', documents );
				Session.set( 'es.totalDocuments', totalDocuments );
				Session.set( 'es.timeTook', timeTook );
			}
		} );

	}
} );