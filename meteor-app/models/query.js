/**
 * Created by udit on 28/05/16.
 */

query = new Meteor.Collection( 'query' );

Schemas.query = new SimpleSchema(
	{
		user_id: {
			type: String,
			optional: true,
			blackbox: true
		},
		query: {
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

query.attachSchema( Schemas.query );

query.allow(
	{
		insert: function (userID, doc) {
			return ( userID ) ? true : false;
		},
		update: function (userID, doc) {
			return ( userID ) ? true : false;
		}
	}
);