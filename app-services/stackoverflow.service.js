(function () {
    'use strict';

    angular
        .module('app')
        .factory('StackoverflowService', StackoverflowService);

    StackoverflowService.$inject = ['$timeout', '$filter', '$q', '$http'];
    function StackoverflowService($timeout, $filter, $q, $http) {

        var service = {};

        service.GetAll = GetAll;
        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getData());
            return deferred.promise;
        }

        // function getData() {
        //     var deferred = $q.defer();
        //     if(!localStorage.stackoverflow){
        //         $.getJSON("../data/stackoverflow.json", function(json) {
        //             localStorage.stackoverflow = JSON.stringify(json);
        //             deferred.resolve(JSON.parse(localStorage.stackoverflow));
        //         });
        //     } else {
        //         deferred.resolve(JSON.parse(localStorage.stackoverflow));
        //     }
        //     return deferred.promise;
        // }

        function getData() {
            var deferred = $q.defer();
            if(!localStorage.stackoverflow){
                $http.get('http://127.0.0.1:5000/api/stackoverflow').then(function (res) {
                        localStorage.stackoverflow = JSON.stringify(res.data);
                        deferred.resolve(JSON.parse(localStorage.stackoverflow));
                    }, function(msg, code){
                        deferred.resolve(JSON.parse(localStorage.stackoverflow));
                });
            } else {
                deferred.resolve(JSON.parse(localStorage.stackoverflow));
            }
            return deferred.promise;
        }
    }
})();