(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['UserService', '$rootScope', 'LogService'];
    function ProfileController(UserService, $rootScope, LogService) {
        var vm = this;

        (function initController() {
            loadCurrentUser();
            loadsLogs();
            loadLoginHistory();
            loadUserActivity();
        })();

        function loadLoginHistory () {
            UserService.LoginHistory($rootScope.globals.currentUser.username)
                .then(function (res){
                    vm.loginHistory = res;
                    console.log(res);
                });
        }

        function loadsLogs () {
            LogService.GetLogs().then(function (res) {
                vm.logdata = res;
                console.log(res);
            });
        }

        function loadCurrentUser () {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadUserActivity () {
            UserService.UserActivity($rootScope.globals.currentUser.username)
                .then(function (activity){
                    console.log(activity);
                    vm.activity = activity;
                });
        }

    }

})();
