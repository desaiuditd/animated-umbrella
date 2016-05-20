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

/**
 * Route Controller to check on users.
 */
AUController = RouteController.extend(
	{
		onBeforeAction: function() {
			// Check users before routing
			this.next();
		}
	}
);

Router.route( '/', {
	name: 'home',
	template: 'home',
	controller: 'AUController'
} );

Router.route( '/search', {
	name: 'search',
	template: 'search',
	controller: 'AUController'
} )

/**
 * Accounts Routes
 */
AccountsTemplates.configureRoute( 'changePwd', {
	name: 'changePwd',
	path: '/change-password',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'enrollAccount', {
	name: 'enrollAccount',
	path: '/enroll-account',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'forgotPwd', {
	name: 'forgotPwd',
	path: '/forgot-password',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'resetPwd', {
	name: 'resetPwd',
	path: '/reset-password',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'signIn', {
	name: 'signIn',
	path: '/login',
	template: 'login',
	redirect: '/search',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'signUp', {
	name: 'signUp',
	path: '/register',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'verifyEmail', {
	name: 'verifyEmail',
	path: '/verify-email',
	template: 'login',
	controller: 'AUController'
} );
AccountsTemplates.configureRoute( 'resendVerificationEmail', {
	name: 'resendVerificationEmail',
	path: '/send-again',
	template: 'login',
	controller: 'AUController'
} );

/**
 * Ensure User Login for templates
 */
Router.plugin( 'ensureSignedIn', {
	except: publicRoutes
} );

/**
 * Misc Routes
 * */
Router.route( '/privacy', {
	name: 'privacy',
	template: 'privacy',
	controller: 'AUController'
} );
Router.route( '/terms-of-use', {
	name: 'termsOfUse',
	template: 'termsOfUse',
	controller: 'AUController'
} );