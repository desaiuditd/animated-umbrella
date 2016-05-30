/**
 * Created by udit on 29/05/16.
 */

Meteor.publish( 'query', function () {
	if ( this.userId ) {
		return query.find( { user_id: this.userId } );
	}
} );

Meteor.publish( 'activity', function () {
	if ( this.userId ) {
		return activity.find( { user_id: this.userId } );
	}
} );