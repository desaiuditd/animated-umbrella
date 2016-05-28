/**
 * Created by udit on 25/05/16.
 */
Template.search.onRendered(function () {

	this.autorun( function () {

		console.log("search template render");

		var data = this._templateInstance.data.data();

		if ( data.queryParams.q ) {

			ES.setRequestTriggered(1);

			var offset = 0;
			var limit = 10;

			var user = Meteor.user();

			if ( user.auSettings && user.auSettings.resultsPerPage ) {
				limit = user.auSettings.resultsPerPage;
			}

			if ( data.queryParams.page > 0 ) {
				offset = limit * ( data.queryParams.page - 1 );
			}

			Meteor.call( 'fetchSearchResults', data.queryParams.q, offset, limit ,function ( error, response ) {
				if ( error ) {
					console.log( "error occured on receiving data on server. ", err );
				} else {
					var timeTook = response.took;
					var hits = response.hits;
					var totalDocuments = hits.total;
					var documents = hits.hits;

					ES.setRequestDone(1);
					ES.setSearchResults(documents);
					ES.setTotalDocuments(totalDocuments);
					ES.setTimeTook(timeTook);
				}
			} );

		}
	} );

} );