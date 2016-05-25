/**
 * Created by udit on 25/05/16.
 */
ES = {
	baseEndPoint: "http://ec2-52-40-86-78.us-west-2.compute.amazonaws.com:9200",
	index: "techblogs",
	type: "page",
	queryBuilder: function ( q, offset = 0, limit = 50 ) {
		var query = {};

		query.url = this.baseEndPoint + '/' + this.index + '/' + '_search';

		query.headers = {
			'Content-Type': 'application/json'
		};

		query.formData = {
			"query": {
				"filtered": {
					"query": {
						"query_string": {
							"query": q
						}
					}
				}
			},
			"from":offset,
			"size":limit,
			"sort": {
				"_score": {
					"order": "asc"
				}
			},
			"explain":true
		};

		return query;
	},
	queryExecutioner: function (query) {
		var response = HTTP.get(query.url, {
			headers: query.headers,
			data: query.formData
		} );
		return response;
	},
	resetSessionVariables: function () {
		Session.set( 'es.searchResults', [] );
		Session.set( 'es.totalDocuments', 0 );
		Session.set( 'es.timeTook', 0 );
		Session.set( 'es.requestTriggered', 0 );
		Session.set( 'es.requestDone', 0 );
	}
};