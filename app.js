(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'chart.js'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'profile/profile.view.html',
                controllerAs: 'vm'
            })

            .when('/dashboard', {
                controller: 'DashboardController',
                templateUrl: 'dashboard/dashboard.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });


            (function (ChartJsProvider) {
                ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
              }); 
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            console.log($rootScope.globals.currentUser.username);
            $rootScope.loggedIn = true;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            $rootScope.loggedIn = loggedIn;
            if (restrictedPage && !loggedIn) {
                $rootScope.loggedIn = false;
                $location.path('/login');
            }
        });

    }

})();