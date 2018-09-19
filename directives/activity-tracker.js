(function () {
    'use strict';

    angular.module('app').directive('activityTrackerClick', function($cookies, LogService) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                element.bind('click', function($event) {
                    var user = $cookies.getObject('globals');
                    var json = {};
                    console.log(user);
                    if (user && user.currentUser && user.currentUser.username){
                        json["user"] = user.currentUser.username;
                        json["event"] = "click";
                        json["type"] = element[0].type;    
                        json["url"] = element[0].href;
                        LogService.SaveLogs(json);
                    }
                });
            }
        }
    });

    angular.module('app').directive('activityTrackerScroll', function($cookies, LogService) {
        return {
            restrict: 'AEC',
            link: function(scope, element, attrs) {
                element.bind('click', function($event) {
                    // var user = $cookies.getObject('globals');
                    // var json = {};
                    // console.log(user);
                    // if (user && user.currentUser && user.currentUser.username){
                    //     json["user"] = user.currentUser.username;
                    //     json["event"] = "click";
                    //     json["type"] = element[0].type;    
                    //     json["url"] = element[0].href;
                    //     LogService.SaveLogs(json);
                    // }
                });
            }
        }
    });
})();