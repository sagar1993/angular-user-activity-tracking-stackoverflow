(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$q'];
    function UserService($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        // service.Update = Update;
        service.Delete = Delete;
        service.Login = Login;
        service.LoginHistory = LoginHistory;
        service.UserActivity = UserActivity;
        service.GetUserActivityChartData = GetUserActivityChartData;

        return service;

        function GetAll() {
            console.log('get-all');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/users').then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function GetById(id) {
            console.log('get-by-id');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/users/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function GetByUsername(username) {
            console.log('get-by-username');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/users/username/' + username).then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function Create(user) {
            console.log('create');

            var deferred = $q.defer();
            $http.post('http://127.0.0.1:5000/api/users', user).then(function (res) {
                let result = {};
                result.success = true;
                deferred.resolve(result);
            }, function(msg, code){
                console.log(msg, code);
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function Login(user) {
            console.log('login');

            var deferred = $q.defer();
            $http.post('http://127.0.0.1:5000/api/login', user).then(function (res) {
                console.log(res);
                let result = {};
                result.success = true;
                deferred.resolve(result);
            }, function(msg, code){
                console.log(msg, code);
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function LoginHistory(username) {
            console.log('login-historys');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/loginhistory/' + username).then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function UserActivity(username) {
            console.log('user-activity');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/useractivity/' + username).then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        // function Update(user) {
        //     console.log('update');
        //     return $http.put('http://127.0.0.1:5000/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        // }

        function Delete(id) {
            console.log('delete');

            var deferred = $q.defer();
            $http.delete('http://127.0.0.1:5000/api/users/' + id).then(function (res) {
                let result = {};
                result.success = true;
                deferred.resolve(result);
            }, function(msg, code){
                console.log(msg, code);
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function GetUserActivityChartData() {
            console.log('get-user-activity-chart-data');

            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/get_user_activity').then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        // function handleSuccess(res) {
        //     return res.data;
        // }

        // function handleError(error) {
        //     return function () {
        //         return { success: false, message: error };
        //     };
        // }
    }

})();
