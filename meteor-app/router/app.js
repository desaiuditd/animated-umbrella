/**
 * Created by udit on 19/05/16.
 */

FlowRouter.route( '/', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'home',
	action: function(params, queryParams) {

		Tracker.autorun( function () {
			var data = {};
			data.queryParams = queryParams;

			if ( queryParams.q && ! queryParams.qid ) {
				data.queryParams.qid = auHistory.addQuery(queryParams.q);
			}

			BlazeLayout.render('search', { data: data } );
		} );

	}
} );

FlowRouter.route( '/search', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'search',
	action: function(params, queryParams) {

		Tracker.autorun( function () {
			var data = {};
			data.queryParams = queryParams;

			if ( queryParams.q && ! queryParams.qid ) {
				data.queryParams.qid = auHistory.addQuery(queryParams.q);
			}

			BlazeLayout.render('search', { data: data } );
		} );
	}
} );

FlowRouter.route( '/redirect', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn ],
	name: 'redirect',
	action: function (params, queryParams) {
		Tracker.autorun( function () {
			var userID = Meteor.userId();
			if ( userID ) {
				var meta = {
					title: queryParams.title,
					url: queryParams.url
				};
				auHistory.addActivity(userID, "click", queryParams.qid, queryParams.docid, meta);
				window.location = queryParams.url;
			}
		} );
	}
} );

FlowRouter.route( '/history', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'history',
	action: function (params, queryParams) {
		BlazeLayout.render('history');
	}
} );

FlowRouter.route( '/settings', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'settings',
	action: function(params, queryParams) {
		BlazeLayout.render('settings');
	}
} );

/**
 * Accounts Routes
 */
AccountsTemplates.configureRoute( 'changePwd', {
	name: 'changePwd',
	path: '/change-password',
} );
AccountsTemplates.configureRoute( 'enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
} );
AccountsTemplates.configureRoute( 'forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password',
} );
AccountsTemplates.configureRoute( 'resetPwd', {
	name: 'resetPwd',
	path: '/reset-password',
} );
AccountsTemplates.configureRoute( 'signIn', {
	name: 'signIn',
	path: '/login',
	redirect: '/search'
} );
AccountsTemplates.configureRoute( 'signUp', {   
	name: 'signUp',
	path: '/register',
} );
AccountsTemplates.configureRoute( 'verifyEmail', {
	name: 'verifyEmail',
	path: '/verify-email',
} );
AccountsTemplates.configureRoute( 'resendVerificationEmail', {
	name: 'resendVerificationEmail',
	path: '/send-again',
} );

/**
 * Misc Routes
 * */
FlowRouter.route( '/privacy', {
	name: 'privacy',
	action: function() {
		BlazeLayout.render('privacy');
	}
} );
FlowRouter.route( '/terms-of-use', {
	name: 'termsOfUse',
	action: function() {
		BlazeLayout.render('termsOfUse');
	}
} );