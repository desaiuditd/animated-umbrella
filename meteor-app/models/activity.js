/**
 * Created by udit on 19/05/16.
 */

activity = new Meteor.Collection( 'activity' );

Schemas.activity = new SimpleSchema(
	{
		user_id: {
			type: String,
			optional: true,
			blackbox: true
		},
		type: {
			type: String,
			optional: true,
			blackbox: true
		},
		query_id: {
			type: String,
			optional: true,
			blackbox: true
		},
		document_id: {
			type: String,
			optional: true,
			blackbox: true
		},
		timestamp: {
			type: Date,
			autoValue: function() {
				if (this.isInsert) {
					return new Date();
				} else if (this.isUpsert) {
					return {$setOnInsert: new Date()};
				} else {
					this.unset();  // Prevent user from supplying their own value
				}
			}
		},
		meta: {
			type: Object,
			optional: true,
			blackbox: true
		}
	}
);

activity.attachSchema( Schemas.activity );

activity.allow(
	{
		insert: function (userID, doc) {
			return ( userID ) ? true : false;
		},
		update: function (userID, doc) {
			return ( userID ) ? true : false;
		}
	}
);
