/**
 * Created by udit on 29/05/16.
 */

Template.history.helpers(
	{
		getHistory: function () {
			var userID = Meteor.userId();
			var queryLog = [];
			if ( userID ) {
				queryLog = query.find({user_id: userID},{sort:{timestamp:-1}}).fetch();
			}
			return queryLog;
		}
	}
);

Template.singleHistory.helpers(
	{
		myDebug: function ( obj ) {
			console.log(obj);
		},
		getQueryLink: function () {
			var url = "/search?";

			var params = {
				q: this.query,
				qid: this._id
			}

			return url + $.param(params);
		},
		getActivities: function () {
			var activities = [];
			var userID = Meteor.userId();
			if ( userID ) {
				activities = activity.find({user_id:userID, query_id: this._id},{sort:{timestamp:-1}}).fetch();
			}
			return activities;
		},
		getIndices: function () {
			var indices = [];
			var defaultIndices = [];

			for(item in ES.indices) {
				defaultIndices[ES.indices[item].value] = ES.indices[item];
			}

			if ( this.meta && this.meta.indices ) {
				indices = $.map(this.meta.indices, function ( item ) {

					if ( defaultIndices[item] ) {
						return defaultIndices[item];
					}

					return;
				});
			}

			return indices;
		}
	}
);