/**
 * Created by udit on 25/05/16.
 */
Template.search.helpers(
	{
		existingQuery: function () {
			var data = this.data();
			return data.queryParams.q;
		},
		existingQueryID: function () {
			var data = this.data();
			return ( data.queryParams.qid ) ? '<input type="hidden" name="qid" value="' + data.queryParams.qid + '" />' : "";
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

			if ( data.queryParams.q == undefined )
				return false;

			if ( data.queryParams.q.length == 0 )
				return false;

			if ( ! ES.getRequestTriggered() )
				return false;

			if ( ! ES.getRequestDone() )
				return false;

			if ( ES.getTotalDocuments() )
				return false;

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

			if ( data.queryParams.qid ) {
				params.qid = data.queryParams.qid;
			}

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

				if ( data.queryParams.qid ) {
					params.qid = data.queryParams.qid;
				}

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
		},
		searchResultLink: function () {
			var url = "/redirect?";
			var data = Template.parentData().data();

			var params = {
				qid: data.queryParams.qid,
				docid: this._id,
				url: this._source.url,
				title: this._source.title
			};

			return url + $.param(params);
		}
	}
);