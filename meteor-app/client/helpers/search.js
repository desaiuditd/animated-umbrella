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
		showSpinner: function () {
			return ( ES.getRequestTriggered() && ! ES.getRequestDone() );
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

			var start = 1;
			var end = ES.getTotalPages() > 10 ? 10 : ES.getTotalPages();

			var page = 1;

			if ( data.queryParams.page ) {
				page = parseInt(data.queryParams.page);
			}

			start = ( ( page - 5 ) > start ) ? ( page - 5 ) : start;
			end = ( ( start + 9 ) > ES.getTotalPages() ) ? ES.getTotalPages() : ( start + 9 );

			for ( i = start; i <= end; i++ ) {

				var params = {
					q: data.queryParams.q,
					page: i
				};

				if ( data.queryParams.qid ) {
					params.qid = data.queryParams.qid;
				}

				pageLinkMeta.push({
					page: i,
					link: url + $.param(params)
				});
			}
			return pageLinkMeta;
		},
		isActivePageLink: function () {
			var data = Template.parentData().data();

			var page = 1;
			if ( data.queryParams.page ) {
				page = parseInt(data.queryParams.page);
				if ( page == 0 ) {
					page = 1;
				}
			}

			if (this.page == page)
				return "active";
			else
				return "";
		},
		getIndices: function () {
			return ES.indices;
		},
		renderCheckbox: function (index) {
			var data = Template.parentData().data();

			var indices = $.map(ES.indices, function ( item ) {
				return item.value;
			});

			if ( data.queryParams.indices ) {
				indices = data.queryParams.indices;
			}

			return '<input name="indices" type="checkbox" autocomplete="off" value="' + index.value + '" ' + ( $.inArray(index.value, indices) != -1 ? 'checked' : '' ) + '> ' + index.label + ' - <a target="_blank" href="' + index.url + '">' + index.url + '</a>';
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