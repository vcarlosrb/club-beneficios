angular.module('bbva').controller('ProfileCtrl', function ($scope, User) {

    var map = null;
    var marker = null;
    $scope.password = {};
    $scope.newLocation = "";
    $scope.profile = {
        init: function () {
            this.request();
        },
        request: function () {
            var self = this;
            User.getProfile().then(function (res) {
                if (res.resultado == 1) {
                    $scope.profileData = res.data;
                    $scope.dataRecovery = angular.copy(res.data);
                    $('.boxRegistro .contLoad').fadeOut(300, function () {
                        $('.boxRegistro .modRegistro').fadeIn(300);
                        var location = res.data.empresa.ubicacion.split(',');
                        var LatLng = {lat: parseFloat(location[0]), lng: parseFloat(location[1])};
                        $scope.saveLatLng = LatLng;
                        self.map(LatLng);
                    });
                } else {
                    $('.boxRegistro .contLoad').fadeOut(300, function () {
                        $('.boxRegistro .modRegistro').fadeIn(300);
                    });
                }
            });
        },
        map: function (LatLng) {
            var mapDiv = document.getElementById('map');
            map = new google.maps.Map(mapDiv, {
                center: LatLng,
                zoom: 14
            });
            marker = new google.maps.Marker({
                position: LatLng,
                map: map
            });

            map.addListener('click', function (e) {
                marker.setPosition({lat: e.latLng.lat(), lng: e.latLng.lng()});
                $scope.newLocation = e.latLng.lat() + "," + e.latLng.lng();
            });
        },
        save: function (data, password) {
            if (password.new == password.repeat) {
                $scope.valPass = false;
                var location = data.empresa.ubicacion;
                if ($scope.newLocation) location = $scope.newLocation;
                var send = {
                    empresa: data.empresa.nombre,
                    ruc: data.empresa.ruc,
                    direccion: data.empresa.direccion,
                    ubicacion: location,
                    aniversario: data.empresa.aniversario,
                    nombre: data.contacto.nombre,
                    cumple: data.contacto.cumple,
                    email: data.contacto.email,
                    telefono: data.contacto.telefono,
                    password: password.new
                };

                $('.wbFade').fadeOut(200, function () {
                    $('.wrpButton .btnLoader').fadeIn(200);
                    User.saveProfile(send).then(function (res) {
                        if (res.resultado == 1) {
                            var newData = {
                                contacto: {
                                    cumple: data.contacto.cumple,
                                    email: data.contacto.email,
                                    nombre: data.contacto.nombre,
                                    telefono: data.contacto.telefono
                                },
                                empresa: {
                                    nombre: data.empresa.nombre,
                                    ruc: data.empresa.ruc,
                                    direccion: data.empresa.direccion,
                                    ubicacion: location,
                                    aniversario: data.empresa.aniversario
                                }
                            };
                            $scope.dataRecovery = angular.copy(newData);
                            $('.wrpButton .btnLoader').fadeOut(200, function () {
                                $('.wrpButton .messageSuccess').fadeIn(200);
                                setTimeout(function () {
                                    $('.wrpButton .messageSuccess').fadeOut(200, function () {
                                        $('.wbFade').fadeIn(200);
                                    });
                                }, 2000);
                            });
                        }
                    });
                });

            } else {
                $scope.valPass = true;
            }
        },
        cancel: function () {
            marker.setPosition($scope.saveLatLng);
            $scope.password = {};
            $scope.valPass = false;
            $scope.profileData = angular.copy($scope.dataRecovery);
        }
    };

    $scope.profile.init();

    $scope.datePicker = {
        open: false,
        toggle: function () {
            var self = this;
            if (self.open) {
                self.close();
            } else {
                self.show();
            }
        },
        close: function () {
            var self = this;
            $("#datepicker").datepicker("destroy");
            self.open = false;
        },
        show: function () {
            var self = this;
            $("#datepicker").datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {
                    $scope.$apply(function () {
                        $scope.profileData.empresa.aniversario = date;
                        self.close();
                    });
                }
            });
            self.open = true;
        }
    };

    $scope.datePicker2 = {
        open: false,
        toggle: function () {
            var self = this;
            if (self.open) {
                self.close();
            } else {
                self.show();
            }
        },
        close: function () {
            var self = this;
            $("#datepicker2").datepicker("destroy");
            self.open = false;
        },
        show: function () {
            var self = this;
            $("#datepicker2").datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function (date) {
                    $scope.$apply(function () {
                        $scope.profileData.contacto.cumple = date;
                        self.close();
                    });
                }
            });
            self.open = true;
        }
    };


});
