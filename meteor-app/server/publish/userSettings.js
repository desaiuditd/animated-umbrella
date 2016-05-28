/**
 * Created by udit on 27/05/16.
 */
Meteor.publish("userSettings", function () {
	if ( ! this.userId ) return this.ready();
	return Meteor.users.find( { _id: this.userId }, { fields: { 'auSettings': 1 } } );
} );