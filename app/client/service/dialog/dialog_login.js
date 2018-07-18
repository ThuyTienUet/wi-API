angular
    .module('myApp')
    .service('dialogLogin', dialogUtils);

function dialogUtils(ModalService, $window) {
    let dialogUtils = {};

    dialogUtils.login = function (callback) {
        let saveToken = function (token) {
            $window.localStorage['user-token'] = token;
        };

        function doLogin($scope, close) {
            $scope.name = "";
            $scope.password = "";
            $scope.formError = "";
            this.onOkButtonClicked = function () {
                if ($scope.name == "" || $scope.password == "") {
                    $scope.formError = "All fields required, please try again";
                } else {
                    if ($scope.name != 'admin' || $scope.password != 'admin') {
                        $scope.formError = "User or password is incorrect";
                    } else {
                        saveToken($scope.name);
                        close($scope.data);
                        window.location.href;
                        callback(1);
                    }
                }
            };
            this.onCancelButtonClicked = function () {
                close(null);
            };

        }

        ModalService.showModal({
            templateUrl: '/service/modal/login/login.html',
            controller: doLogin,
            controllerAs: "wiModal"
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (data) {
                $('.modal-backdrop').last().remove();
                $('body').removeClass('modal-open');
                //if (data) console.log("imported", api);
            });
        });
    }
    return dialogUtils;
}
