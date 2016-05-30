/**
 * Created by udit on 29/05/16.
 */

Tracker.autorun(function () {
	Meteor.subscribe("query");
	Meteor.subscribe("activity");
} );
