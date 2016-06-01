/**
 * Created by udit on 25/05/16.
 */
Template.search.onRendered(function () {

	this.autorun( function () {

		var data = this._templateInstance.data.data();

		if ( data.queryParams.q ) {

			ES.setRequestTriggered(1);

			var offset = 0;
			var limit = 10;

			var indices = $.map(ES.indices, function ( item ) {
				return item.value;
			});

			var user = Meteor.user();

			if ( user && user.auSettings && user.auSettings.resultsPerPage ) {
				limit = user.auSettings.resultsPerPage;
			}

			if ( data.queryParams.page > 0 ) {
				offset = limit * ( data.queryParams.page - 1 );
			}

			if ( data.queryParams.indices ) {
				indices = data.queryParams.indices;
			}

			if ( urlSearch.isURL(data.queryParams.q) ) {

				var updateID = auHistory.updateQuery(data.queryParams.qid, { 'meta.query_type': "url" } );

				Meteor.call( 'processURL', data.queryParams.q, indices, offset, limit, function ( error, response ) {
					if ( error ) {
						console.log( "error occured on receiving data on server. ", error );
					} else {
						var searchResults = response.searchResults;

						var updateID = auHistory.updateQuery(data.queryParams.qid, { 'meta.summary': response.summary } );

						var timeTook = searchResults.took;
						var hits = searchResults.hits;
						var totalDocuments = hits.total;
						var documents = hits.hits;

						ES.setRequestDone(1);
						ES.setSearchResults(documents);
						ES.setTotalDocuments(totalDocuments);
						ES.setTimeTook(timeTook);
					}
				} );

			} else {

				Meteor.call( 'fetchSearchResults', data.queryParams.q, indices, offset, limit ,function ( error, response ) {
					if ( error ) {
						console.log( "error occured on receiving data on server. ", error );
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

		}
	} );

} );

Template.search.events(
	{
		'keyup #js-q': function ( event ) {
			var preValue = $(event.target).data('value');
			var curValue = $(event.target).val();

			if ( preValue == curValue ) {
				$('#js-q-submit').attr('disabled', true);
				$('#js-q-submit').prop('disabled', true);
				return;
			} else {
				$('#js-q-submit').attr('disabled', false);
				$('#js-q-submit').prop('disabled', false);
			}

			if ( ! curValue ) {
				$('#js-q-submit').attr('disabled', true);
				$('#js-q-submit').prop('disabled', true);
			}

		},
		'click #advanced-search input[name=indices]': function ( event ) {
			var flag = false;
			for ( i = 0; i < $('#advanced-search input[name=indices]').length; i++ ) {
				var item = $('#advanced-search input[name=indices]')[i];
				if ( $(item).is(':checked') ) {
					flag = true;
				}
			}
			if ( ! flag ) {
				$('#js-q-submit').attr('disabled', true);
				$('#js-q-submit').prop('disabled', true);
			} else {
				$('#js-q-submit').attr('disabled', false);
				$('#js-q-submit').prop('disabled', false);
			}
		}
	}
);