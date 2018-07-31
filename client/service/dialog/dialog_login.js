angular
    .module('myApp')
    .service('dialogLogin', dialogUtils);

function dialogUtils(ModalService, authentication, $window) {
    let dialogUtils = {};

    dialogUtils.login = function (callback) {
        // let saveToken = function (token) {
        //     $window.localStorage['user-token'] = token;
        // };

        function doLogin($scope, $http, close) {
            $scope.name = "";
            $scope.password = "";
            $scope.formError = "";
            this.onOkButtonClicked = function () {
                if ($scope.name == "" || $scope.password == "") {
                    $scope.formError = "All fields required, please try again";
                } else {
                    authentication.login({
                        username: $scope.name,
                        password: $scope.password
                    }, function (res) {
                        console.log(res);
                        $http.post('/login', res)
                            .then(function successCallback(data) { 
                                console.log(data);
                                if (data && (data.data.user.role == 0 || data.data.user.role == 1)) {
                                    window.localStorage.setItem('user', JSON.stringify(data.data.user));
                                    window.localStorage.setItem('token', data.data.token);
                                    close($scope.data);
                                    window.location.href;
                                    callback(1);
                                } else {
                                    toastr.error('Login fail')
                                }
                            },
                                function errorCallback(e) {
                                    console.log(e);
                                });
                        // console.log(res);
                        // if (res && (res.user.role == 0 || res.user.role == 1)) {
                        //     window.localStorage.setItem('user', JSON.stringify(res.user));
                        //     window.localStorage.setItem('token', res.token);
                        //     close($scope.data);
                        //     window.location.href;
                        //     callback(1);
                        // } else {
                        //     toastr.error('Login fail')
                        // }
                    })
                    // if ($scope.name != 'admin' || $scope.password != 'admin') {
                    //     $scope.formError = "User or password is incorrect";
                    // } else {
                    //     saveToken($scope.name);
                    //     close($scope.data);
                    //     window.location.href;
                    //     callback(1);
                    // }
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
