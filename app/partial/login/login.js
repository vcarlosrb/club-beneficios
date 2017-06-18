angular.module('bbva').controller('LoginCtrl', function ($scope, User, Device, $state, Email) {

    $scope.user = {};
    $scope.login = {
        validInput: function (data) {
            return data == undefined || data == ''
        },
        buildData: function () {
            var self = this;
            $scope.valEmail = this.validInput($scope.user.email);
            if (!Email.validate($scope.user.email)) $scope.valEmail = true;
            $scope.valPassword = this.validInput($scope.user.password);

            if (!$scope.valEmail && !$scope.valPassword) {
                var data = {
                    email: $scope.user.email,
                    password: $scope.user.password,
                    imei: Device.getImei(),
                    plataforma: Device.getPlatform(),
                    so: Device.getOperatingSystem(),
                    version_so: Device.getVersioOS(),
                    navegador: Device.getNavigator(),
                    version_navegador: Device.getVersioOS()
                };
                self.request(data);
            }
        },
        request: function (data) {
            $('.btnBlue span').fadeOut(200, function () {
                $('.btnBlue .loader').fadeIn(200);
                User.login(data).then(function (res) {
                    if (res.resultado == 1) {
                        $scope.$emit("sendLogin", true);
                        if (res.nuevo == 'si') {
                            $state.go('app.private.profile');
                        } else {
                            $state.go('app.private.benefits');
                        }
                        $('.btnBlue .loader').fadeOut(200, function () {
                            $('.btnBlue span').fadeIn(200);
                        });
                    } else {
                        if (res.resultado == 0) {
                            $('.btnBlue').fadeOut(200, function () {
                                $('.btnBlue .loader').css('display','none');
                                $('.btnBlue span').css('display','block');
                                $('.noteError').fadeIn(200);
                                setTimeout(function(){
                                    $('.noteError').fadeOut(200, function() {
                                        $('.btnBlue').fadeIn(200);
                                    });
                                },3000);
                            });
                        }
                    }
                }, function (err) {
                    $('.btnBlue .loader').fadeOut(200, function () {
                        $('.btnBlue span').fadeIn(200);
                    });
                });
            });
        }
    }

});
