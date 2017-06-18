angular.module('bbva').factory('User', function ($q, $rootScope, $state) {

    var User = {
        login: function (data) {
            var self = this;
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/usuario/iniciar-sesion",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded"
                },
                "data": data
            };

            $.ajax(settings).success(function (response, status, request) {
                deferred.resolve(response);
                self.setToken(response.token);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/usuario/cerrar-sesion",
                "method": "POST",
                "headers": {
                    "token": User.getToken()
                }
            };

            $.ajax(settings).success(function (response, status, request) {
                if (response.resultado == 1) {
                    deferred.resolve(true);
                    localStorage.clear();
                    $state.go('app.login');
                }
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getProfile: function () {
            var self = this;
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/usuario/perfil",
                "method": "GET",
                "headers": {
                    "token": User.getToken()
                }
            };

            $.ajax(settings).success(function (response) {
                deferred.resolve(response);
                self.setToken(response.token);
            }).fail(function (err) {
                User.logout();
                deferred.reject(err);
            });
            return deferred.promise;
        },
        saveProfile: function (data) {
            var self = this;
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": $rootScope.crossDomain,
                "url": $rootScope.pathName + "api/usuario/perfil",
                "method": "PUT",
                "headers": {
                    "token": User.getToken()
                },
                "data": data
            };

            $.ajax(settings).success(function (response) {
                deferred.resolve(response);
                self.setToken(response.token);
            }).fail(function (err) {
                User.logout();
                deferred.reject(err);
            });
            return deferred.promise;
        },
        setToken: function (newToken) {
            localStorage.setItem('token', newToken);
        },
        getToken: function () {
            return localStorage.getItem('token');
        }
    };

    return User;
});
