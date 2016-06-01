/**
 * Created by udit on 25/05/16.
 */
ES = {
	baseEndPoint: "http://ec2-52-40-86-78.us-west-2.compute.amazonaws.com:9200",
	indices: [
		{ value: "techblogs", label: "The Verge", url: 'http://www.theverge.com/' },
		{ value: "cnet", label: "CNET", url: 'http://www.cnet.com/' },
		{ value: "technewsworld", label: "TechNewsWorld", url: 'http://www.technewsworld.com/' }
	],
	type: "page",
	queryBuilder: function ( q, indices, offset = 0, limit = 10 ) {
		var query = {};

		query.url = this.baseEndPoint + '/' + indices.join(',') + '/' + '_search';

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
					"order": "desc"
				}
			},
			"explain":true
		};

		return query;
	},
	// tagQueryBuilder: function ( tag, indices, offset = 0, limit = 10 ) {
	// 	var query = {};
	//
	// 	query.url = this.baseEndPoint + '/' + indices.join(',') + '/' + '_search';
	//
	// 	query.headers = {
	// 		'Content-Type': 'application/json'
	// 	};
	//
	// 	query.formData = {
	// 		"query": {
	// 			"bool": {
	// 				"must": [
	// 					{ "match": { "tags": tag }},
	// 					{ "match": { "title": tag }}
	//
	// 				]
	// 			}
	// 		},
	// 		"from":offset,
	// 		"size":limit,
	// 		"sort": {
	// 			"_score": {
	// 				"order": "desc"
	// 			}
	// 		},
	// 		"explain":true
	// 	};
	//
	// 	return query;
	// },
	queryExecutioner: function (query) {
		var response = HTTP.get(query.url, {
			headers: query.headers,
			data: query.formData
		} );
		return response;
	},
	processTags: function (searchResponse) {
		var hits = searchResponse.hits;
		var documents = hits.hits;

		for(i in documents) {
			if ( documents[i]._source.tags ) {
				for ( j in documents[i]._source.tags ) {
					var tagStr = documents[i]._source.tags[j].toLowerCase().trim();
					var existingTag = tag.findOne({tag: tagStr});
					if ( ! existingTag ) {
						tag.insert(
							{
								tag: tagStr
							}
						);
					}
				}
			}
		}
	},
	resetSessionVariables: function () {
		// ES.setSearchResults([]);
		// ES.setTotalDocuments(0);
		// ES.setTimeTook(0);
		// ES.setRequestTriggered(0);
		// ES.setRequestDone(0);
	},
	getSearchResults: function () {
		return Session.get('es.searchResults') || [];
	},
	setSearchResults: function (searchResults) {
		Session.set('es.searchResults', searchResults);
	},
	getTotalDocuments: function () {
		return Session.get('es.totalDocuments') || 0;
	},
	setTotalDocuments: function (totalDocuments) {
		Session.set('es.totalDocuments',totalDocuments);
	},
	getTimeTook: function () {
		return Session.get('es.timeTook') || 0;
	},
	setTimeTook: function (timeTook) {
		Session.set('es.timeTook', timeTook);
	},
	getRequestTriggered: function () {
		return Session.get('es.requestTriggered') || 0;
	},
	setRequestTriggered: function (requestTriggered) {
		Session.set('es.requestTriggered',requestTriggered);
	},
	getRequestDone: function () {
		return Session.get('es.requestDone') || 0;
	},
	setRequestDone: function (requestDone) {
		Session.set('es.requestDone',requestDone);
	},
	getTotalPages: function () {
		return Math.ceil(ES.getTotalDocuments() / auSettings.getResultsPerPage());
	}
};
