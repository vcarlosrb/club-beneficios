angular.module('bbva').controller('HomeCtrl', function ($scope, Benefits, $state) {

    $scope.home = {
        menu: false,
        init: function () {
            this.getBenefits();
        },
        getBenefits: function () {
            $('.emptyContent').css('display', 'none');
            Benefits.getList().then(function (res) {
                if (res.resultado == 1) {
                    $scope.categories = res.data.categoria;
                    $scope.benefits = res.data.beneficio;
                    if (res.data.beneficio.length == 0) {
                        $scope.loader.hideDash(function () {
                            $('.emptyContent').fadeIn(200);
                        });
                    } else {
                        $scope.loader.hideDash();
                    }
                } else {
                    if (res.resultado == 0) {
                        //message: Cannot get benefits
                    }
                    $scope.loader.hideDash();
                }
            }, function (err) {
                $scope.loader.hideDash();
            });
        },
        getOnlyBanafits: function () {
            $('.emptyContent').css('display', 'none');
            Benefits.getList().then(function (res) {
                if (res.resultado == 1) {
                    $scope.benefits = res.data.beneficio;
                    if (res.data.beneficio.length == 0) {
                        $scope.loader.hideDash(function () {
                            $('.emptyContent').fadeIn(200);
                        });
                    } else {
                        $scope.loader.hideDash();
                    }
                } else {
                    if (res.resultado == 0) {
                        //message: Cannot get benefits
                    }
                    $scope.loader.hideDash();
                }
            }, function (err) {
                $scope.loader.hideDash();
            });
        },
        toggleMenu: function () {
            var self = this;
            if (self.menu) {
                $('.respCategory').slideUp(200);
                self.menu = false;
            } else {
                $('.respCategory').slideDown(200);
                self.menu = true;
            }
        },
        closeMenu: function () {
            $('.respCategory').slideUp(200);
            this.menu = false;
        },
        goDetail: function (id) {
            $state.go('app.private.benefits.detail', {id: id});
        }
    };
    $scope.home.init();

    $scope.search = {
        keyPress: function (event) {
            var self = this;
            if (event.keyCode == 13) {
                var data = $(event.currentTarget).val();
                if (data != '') {
                    $scope.home.closeMenu();
                    $('.emptyContent').css('display', 'none');
                    $('.pagePromo').fadeOut(300, function () {
                        $('#loadList').fadeIn(300);
                        self.request(data);
                    });
                }
            }
        },
        request: function (data) {
            Benefits.search(data).then(function (res) {
                if (res.resultado == 1) {
                    $scope.benefits = res.data.beneficio;
                    if (res.data.beneficio.length == 0) {
                        $scope.loader.hideDash(function () {
                            $('.emptyContent').fadeIn(200);
                        });
                    } else {
                        $scope.loader.hideDash();
                    }
                } else {
                    if (res.resultado == 0) {
                        //message: Cannot get benefits
                    }
                    $scope.loader.hideDash();
                }
            }, function (err) {
                $scope.loader.hideDash();
            });
        }
    };

    $scope.category = {
        select: function (event, data) {
            var self = this;
            $scope.home.closeMenu();
            $('.emptyContent').css('display', 'none');
            $('.listCateg li').removeClass('btnAct');
            $(event.currentTarget).addClass('btnAct');
            $('.pagePromo').fadeOut(300, function () {
                $('#loadList').fadeIn(300);
                if (data == 0) {
                    $scope.home.getOnlyBanafits();
                } else {
                    self.request(data);
                }
            });
        },
        request: function (data) {
            Benefits.category(data).then(function (res) {
                if (res.resultado == 1) {
                    $scope.benefits = res.data.beneficio;
                    if (res.data.beneficio.length == 0) {
                        $scope.loader.hideDash(function () {
                            $('.emptyContent').fadeIn(200);
                        });
                    } else {
                        $scope.loader.hideDash();
                    }
                } else {
                    if (res.resultado == 0) {
                        //message: Cannot get benefits
                    }
                    $scope.loader.hideDash();
                }

            }, function (err) {
                $scope.loader.hideDash();
            });
        }
    };

    $scope.loader = {
        showDash: function () {

        },
        hideDash: function (callback) {
            if (callback && typeof callback == "function") {
                $('#loadList').fadeOut(300, function () {
                    $('.pagePromo').fadeIn(300, function () {
                        callback();
                    });
                });
            } else {
                $('#loadList').fadeOut(300, function () {
                    $('.pagePromo').fadeIn(300);
                });
            }
        }
    }

});
