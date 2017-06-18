angular.module('bbva').controller('PanelCtrl', function ($scope, User) {

    $scope.panel = {
        menu: false,
        init: function () {
            this.validUser();
        },
        validUser: function () {
            $scope.vUser = User.getToken();
        },
        toggleMenu: function () {
            var self = this;
            if (!self.menu) {
                $('.mainmenu').css('width', '180px');
                setTimeout(function () {
                    self.menu = true;
                }, 50);
            } else {
                self.closeMenu();
            }
        },
        closeMenu: function () {
            var self = this;
            var width = $(window).width();
            if (width > 600) {
                $('.mainmenu').css('width', '50px');
            } else {
                $('.mainmenu').css('width', '0');
            }
            $(window).resize(function () {
                var width = $(window).width();
                if (width > 600) {
                    $('.mainmenu').css('width', '50px');
                } else {
                    $('.mainmenu').css('width', '0');
                }
            });
            self.menu = false;
        },
        logout: function () {
            User.logout().then(function(res) {
                $scope.vUser = false;
            });
        }
    };

    $scope.panel.init();

    $scope.$on("sendLogin", function (e, d) {
        $scope.panel.init();
    });

    $('body').on('click', function () {
        if ($scope.panel.menu) {
            $scope.panel.closeMenu();
        }
    });

});
