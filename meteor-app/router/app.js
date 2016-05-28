/**
 * Created by udit on 19/05/16.
 */

FlowRouter.route( '/', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'home',
	action: function(params, queryParams) {

		var data = {};
		data.queryParams = queryParams;

		BlazeLayout.render('search', { data: data } );
	}
} );

FlowRouter.route( '/search', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, ES.resetSessionVariables ],
	name: 'search',
	action: function(params, queryParams) {

		var data = {};
		data.queryParams = queryParams;

		BlazeLayout.render('search', { data: data } );
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