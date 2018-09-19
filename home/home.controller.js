(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', 'StackoverflowService', 'LogService'];
    function HomeController(UserService, $rootScope, StackoverflowService, LogService) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.stackoverflow = [];

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            loadStackoverflowData();
            loadlogs();
        }

        function loadlogs() {
            LogService.GetLogs();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }

        function loadStackoverflowData() {
            StackoverflowService.GetAll().then(function (data){
                vm.stackoverflow = data;
            })
        }
    }

})();