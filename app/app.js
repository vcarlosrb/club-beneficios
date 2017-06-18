angular.module('bbva', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate']);

angular.module('bbva').config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    /*$locationProvider.html5Mode({
     enabled: true,
     requireBase: false
     });*/

    var root = 'html/';
    //var root = '';

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        views: {
            'panel': {
                templateUrl: root + 'partial/panel//panel.html'
            }
        }
    });

    $stateProvider.state('app.login', {
        url: 'login',
        parent: 'app',
        views: {
            '@': {
                templateUrl: root + 'partial/login//login.html'
            }
        }
    });

    $stateProvider.state('app.private', {
        url: '',
        parent: 'app',
        abstract: true,
        resolve: {
            profile: function (User, $state, $timeout) {
                if (!User.getToken()) {
                    $timeout(function () {
                        $state.go('app.login');
                    });
                }
            }
        },
        views: {
            '@': {
                templateUrl: root + 'partial/private//private.html'
            }
        }
    });


    $stateProvider.state('app.private.benefits', {
        url: '',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/home//home.html'
            }
        }
    });

    $stateProvider.state('app.private.benefits.detail', {
        url: 'beneficio/:id',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/detailBenefit//detailBenefit.html'
            }
        }
    });

    $stateProvider.state('app.private.services', {
        url: 'servicios',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/services//services.html'
            }
        }
    });

    $stateProvider.state('app.private.services.detail', {
        url: 'servicios/:id',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/detailService//detailService.html'
            }
        }
    });

    $stateProvider.state('app.private.participants', {
        url: 'participantes',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/participants//participants.html'
            }
        }
    });

    $stateProvider.state('app.private.participants.detail', {
        url: 'participantes/:id',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/detailParticipant//detailParticipant.html'
            }
        }
    });

    $stateProvider.state('app.private.profile', {
        url: 'perfil',
        parent: 'app.private',
        views: {
            'content': {
                templateUrl: root + 'partial/profile//profile.html'
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');

});

angular.module('bbva').run(function ($rootScope, crossDomain) {

    //$rootScope.pathName = "http://192.168.1.160:8086/holistic/bbva/mundoproveedor/index.php/";
    $rootScope.pathName = "http://52.33.248.97/php/index.php/";
    $rootScope.crossDomain = crossDomain;

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

}).constant('crossDomain', false);

angular.module('bbva').controller('MainCtrl', function ($scope) {

    $scope.$on("sendLogin", function (e, d) {
        $scope.$broadcast("sendLogin", true);
    });

});
