angular.module('bbva').controller('DetailserviceCtrl', function ($scope, $stateParams, Services) {

    $scope.service = {
        init: function () {
            this.request();
        },
        request: function () {
            var self = this;
            Services.detail($stateParams.id).then(function (res) {
                if (res.resultado == 1) {
                    $scope.serviceData = res.data;
                    $('.pageDetails .contLoad').fadeOut(300, function () {
                        $('.pageDetails .pdContent').fadeIn(300);
                        var location = res.data.local.ubicacion.split(',');
                        var LatLng = {lat: parseFloat(location[0]), lng: parseFloat(location[1])};
                        self.map(LatLng);
                    });
                } else {
                    $('.pageDetails .contLoad').fadeOut(300, function () {
                        $('.pageDetails .pdContent').fadeIn(300);
                    });
                }
            });
        },
        map: function (LatLng) {
            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {
                center: LatLng,
                zoom: 14
            });
            var marker = new google.maps.Marker({
                position: LatLng,
                map: map
            });
        },
        goBack: function () {
            window.history.back();
        }

    };
    $scope.service.init();

});
