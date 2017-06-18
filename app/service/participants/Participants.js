angular.module('bbva').factory('Participants', function ($q, User, $rootScope) {

    var Participants = {
        getList: function () {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $rootScope.pathName + "api/participante/listar",
                "method": "GET",
                "headers": {
                    "token": User.getToken()
                }
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
                User.setToken(response.token);
            }).fail(function (err) {
                User.logout();
                deferred.reject(err);
            });
            return deferred.promise;
        },
        detail: function (id) {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $rootScope.pathName + "api/participante/detalle/" + id,
                "method": "GET",
                "headers": {
                    "token": User.getToken()
                }
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
                User.setToken(response.token);
            }).fail(function (err) {
                User.logout();
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };

    return Participants;
});
