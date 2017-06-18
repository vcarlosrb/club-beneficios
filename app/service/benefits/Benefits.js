angular.module('bbva').factory('Benefits', function ($q, User, $rootScope) {

    var Benefits = {
        getList: function () {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/beneficio/listar",
                "method": "GET",
                headers: {
                    'token': User.getToken()
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
        search: function (data) {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/beneficio/buscar?termino=" + data,
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
        category: function (data) {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/beneficio/categoria/" + data,
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
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/beneficio/detalle/" + id,
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

    return Benefits;
});
