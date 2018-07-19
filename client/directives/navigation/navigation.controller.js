
angular
    .module('myApp')
    .controller('navigationCtrl', navigationCtrl);

function navigationCtrl($scope, $window, dialogLogin, authentication) {

    $scope.isLoggedIn = false;
    $scope.name = "";

    $scope.logout = function () {
        $window.localStorage.removeItem('user-token');
        $scope.isLoggedIn = false;
        window.location.href;
    };

    $scope.isLoggedIn = authentication.isLoggedIn();
    
    if ($scope.isLoggedIn == true) {
        $scope.name = "admin";
    }

    $scope.doLogin = function () {
        dialogLogin.login(function (result) {
            if (result == 1) {
                $scope.isLoggedIn = true;
                $scope.name = "admin";
            }
        });
    }

    $scope.home = function () {
        window.location.href;
    }
}
