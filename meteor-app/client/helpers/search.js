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
			return ES.getSearchResults();
		},
		timeTook: function () {
			return ES.getTimeTook();
		},
		totalDocuments: function () {
			return ES.getTotalDocuments();
		},
		showNoResultsFound: function () {
			var data = this.data();

			console.log(data.queryParams.q);

			if ( data.queryParams.q == undefined )
				return false;

			if ( data.queryParams.q.length == 0 )
				return false;

			console.log("requestTriggered: "+ES.getRequestTriggered())
			if ( ! ES.getRequestTriggered() )
				return false;

			console.log("requestDone: "+ES.getRequestDone())
			if ( ! ES.getRequestDone() )
				return false;

			console.log("total docs: "+ES.getTotalDocuments())
			if ( ES.getTotalDocuments() )
				return false;

			console.log("show no results");
			return true;
		},
		showPagination: function () {
			var pages = ES.getTotalPages();
			return ES.getSearchResults() && pages > 1;
		},
		getPaginatedURL: function (page) {
			var url = "/search?";
			var data = this.data();
			var params = {
				q: data.queryParams.q,
				page: page < 0 ? ES.getTotalPages() : page
			};
			return url + $.param(params);
		},
		getPaginatedLinkMeta: function () {
			var pageLinkMeta = [];

			var url = "/search?";
			var data = this.data();

			for ( i = 0; i < ES.getTotalPages(); i++ ) {

				var params = {
					q: data.queryParams.q,
					page: i+1
				};

				pageLinkMeta[i] = {
					page: i+1,
					link: url + $.param(params)
				};
			}
			return pageLinkMeta;
		},
		isActivePageLink: function () {
			var currentRoute = FlowRouter.current();

			if (this.link == currentRoute.path)
				return "active";
			else
				return "";
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