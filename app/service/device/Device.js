angular.module('bbva').factory('Device', function () {

    var Device = {
        getPlatform: function () {
            return 'web';
        },
        getOperatingSystem: function () {
            var OSName = "Unknown";
            if (window.navigator.userAgent.indexOf("Windows") != -1) OSName = "Windows";
            if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
            if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
            if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";

            return OSName;
        },
        getVersioOS: function () {
            return navigator.appVersion.split(" ")[0];
        },
        getNavigator: function () {
            var navName = "Unknown";
            var min = 10000;
            if (window.navigator.userAgent.indexOf("Chrome") != -1) {
                if (window.navigator.userAgent.indexOf("Chrome") < min) {
                    min = window.navigator.userAgent.indexOf("Chrome")
                    navName = "Chrome";
                }
            }
            if (window.navigator.userAgent.indexOf("Firefox") != -1) {
                if (window.navigator.userAgent.indexOf("Firefox") < min) {
                    min = window.navigator.userAgent.indexOf("Firefox")
                    navName = "Firefox";
                }
            }
            if (window.navigator.userAgent.indexOf("Safari") != -1) {
                if (window.navigator.userAgent.indexOf("Safari") < min) {
                    min = window.navigator.userAgent.indexOf("Safari")
                    navName = "Safari";
                }
            }
            if (window.navigator.userAgent.indexOf("Opera") != -1) {
                if (window.navigator.userAgent.indexOf("Opera") < min) {
                    min = window.navigator.userAgent.indexOf("Opera")
                    navName = "Opera";
                }
            }
            if (window.navigator.userAgent.indexOf("IE") != -1) {
                if (window.navigator.userAgent.indexOf("IE") < min) {
                    navName = "IE";
                }
            }
            
            return navName;
        },
        getImei: function () {
            return 'sadfg5fd654gdf56g4d56f4gf56d4g5fd6'
        }
    };

    return Device;
});
