angular.module('bbva').controller('ServicesCtrl', function ($scope, Services, $state) {

    $scope.service = {
        init: function () {
            this.request();
        },
        request: function () {
            Services.getList().then(function (res) {
                if (res.resultado == 1) {
                    $scope.services = res.data.servicio_vip;
                    $('.contLoad').fadeOut(300, function () {
                        $('.pagePromo').fadeIn(300);
                    });
                } else {
                    //error load
                }
            });
        },
        goDetail: function (id) {
            $state.go('app.private.services.detail',{id: id});
        }
    };
    $scope.service.init();

});
