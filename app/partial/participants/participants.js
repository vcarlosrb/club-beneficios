angular.module('bbva').controller('ParticipantsCtrl', function ($scope, Participants, $state) {

    $scope.participant = {
        init: function () {
            this.request();
        },
        request: function () {
            Participants.getList().then(function (res) {
                if (res.resultado == 1) {
                    $scope.participants = res.data.participante;
                    $('.contLoad').fadeOut(300, function () {
                        $('.pagePromo').fadeIn(300);
                    });
                } else {
                    //error load
                }
            });
        },
        goDetail: function(id) {
            $state.go('app.private.participants.detail',{id: id});
        }
    };
    $scope.participant.init();

});
