(function () {
    'use strict';

    angular
        .module('app')
        .factory('LogService', LogService);
        LogService.$inject = ['$http', '$rootScope', '$q'];

    function LogService($http, $rootScope, $q) {
        var service = {};

        service.SaveLogs = SaveLogs;
        service.GetLogs = GetLogs;

        return service;

        function SaveLogs(log) {
            appendLogs(log);
        }

        function GetLogs() {
            var deferred = $q.defer();
            $http.get('http://127.0.0.1:5000/api/logs/get/' + $rootScope.globals.currentUser.username).then(function (res) {
                deferred.resolve(res.data);
            }, function(msg, code){
                deferred.reject(msg);
            });
            return deferred.promise;
        }

        function pushLogs(logs) {
            return $http.post('http://127.0.0.1:5000/api/logs/save', logs).then(function(res) {
            }, function(msg, code) {
            });
        }

        function appendLogs(log) {
            if (localStorage.log) {
                var logs = JSON.parse(localStorage.log);
                if (logs.length >= 4) {
                    pushLogs(logs);
                    logs = [];    
                }
                logs.push(log);
                localStorage.log = JSON.stringify(logs);
            }
            else{
                localStorage.log = JSON.stringify([]);
            }
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
