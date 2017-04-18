import template from './firstAccess.html';
import './firstAccess.scss';
import firstAccessCtrl from './firstAccessController';

export default /*@ngInject*/ function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('firstAccess', {
        url: '/primeiro-acesso',
        views: {
            '@': {
                template: require('./firstAccess.html'),
                controller: firstAccessCtrl,
                controllerAs: 'firstAccessCtrl'
            }
        }
    });

    $locationProvider.html5Mode(true);
}
