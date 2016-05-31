/**
 * Created by udit on 30/05/16.
 */

tag = new Meteor.Collection( 'tag' );

Schemas.tag = new SimpleSchema(
	{
		tag: {
			type: String,
			unique: true
		}
	}
);

tag.attachSchema( Schemas.tag );

tag.allow(
	{
		insert: function (userID, doc) {
			return ( userID ) ? true : false;
		},
		update: function (userID, doc) {
			return ( userID ) ? true : false;
		}
	}
);