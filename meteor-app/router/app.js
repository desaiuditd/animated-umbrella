/**
 * Created by udit on 19/05/16.
 */

/**
 * Public Routes without login
 */
var publicRoutes = [
	'home',
	'changePwd',
	'enrollAccount',
	'forgotPwd',
	'resetPwd',
	'signIn',
	'signUp',
	'verifyEmail',
	'resendVerificationEmail',
	'privacy',
	'termsOfUse'
];

FlowRouter.route( '/', {
	name: 'home',
	action: function() {
		BlazeLayout.render('home');
	}
} );

FlowRouter.route( '/search', {
	triggersEnter: [AccountsTemplates.ensureSignedIn],
	name: 'search',
	action: function() {
		BlazeLayout.render('search');
	}
} );

FlowRouter.route('/search-results', {
	triggersEnter: [ AccountsTemplates.ensureSignedIn, function () {
		Session.set( 'searchResults', [] );
		Session.set( 'totalDocuments', 0 );
	} ],
	name: 'searchResults',
	action: function() {
		var data = {};
		data.request = this.request;
		data.request.params = this.params;

		BlazeLayout.render('searchResults', { data: data } );
	}
} );

/**
 * Accounts Routes
 */
AccountsTemplates.configureRoute( 'changePwd', {
	name: 'changePwd',
	path: '/change-password',
	// template: 'login'
} );
AccountsTemplates.configureRoute( 'enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
	// template: 'login'
} );
AccountsTemplates.configureRoute( 'forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password',
	// template: 'login'
} );
AccountsTemplates.configureRoute( 'resetPwd', {
	name: 'resetPwd',
	path: '/reset-password',
	// template: 'login'
} );
AccountsTemplates.configureRoute( 'signIn', {
	name: 'signIn',
	path: '/login',
	// template: 'login',
	redirect: '/search'
} );
AccountsTemplates.configureRoute( 'signUp', {
	name: 'signUp',
	path: '/register',
	// template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'verifyEmail', {
	name: 'verifyEmail',
	path: '/verify-email',
	// template: 'login'
} );
AccountsTemplates.configureRoute( 'resendVerificationEmail', {
	name: 'resendVerificationEmail',
	path: '/send-again',
	// template: 'login'
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