/**
 * Created by udit on 19/05/16.
 */

activity = new Meteor.Collection( 'activity' );

Schemas.surveys = new SimpleSchema(
	{
		user_id: {
			type: String,
		},
		type: {
			type: String,
		},
		meta: {
			type: Object,
			optional: true
		}
	}
);