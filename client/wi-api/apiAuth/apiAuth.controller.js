angular
    .module('myApp')
    .controller('apiAuthCtrl', apiAuthCtrl);

function apiAuthCtrl($scope, $http, $window, dialogApiAuth, authentication) {
    $scope.data = [];

    $http.get('/apiAuth')
        .then(function successCallback(data) {
            $scope.data = data.data;
            for (let x = 0; x < $scope.data.length; x++) {
                let obj_param = JSON.parse($scope.data[x].payloadParams);
                let obj_errRes = JSON.parse($scope.data[x].errResponse);
                let obj_res = JSON.parse($scope.data[x].response);
                $scope.data[x].payloadParams = angular.toJson(obj_param, 2);
                $scope.data[x].errResponse = angular.toJson(obj_errRes, 2);
                $scope.data[x].response = angular.toJson(obj_res, 2);
            }
        },
            function errorCallback(e) {
                console.log(e);
            })
    $scope.addApi = function () {
        dialogApiAuth.addApi();
    }

    $scope.editApi = function (apiAuth_id) {
        if (authentication.isLoggedIn() == true) {
            dialogApiAuth.editApi(apiAuth_id);
        } else {
            alert('login required.')
        }

    }

    $scope.deleteApi = function (apiAuth_id) {
        if (authentication.isLoggedIn() == true) {
            if (confirm("You want to remove the API!")) {
                $http.delete('/apiAuth/' + apiAuth_id)
                    .then(function successCallback() {
                        console.log("Delete success");
                    },
                        function errorCallback(e) {
                            console.log(e);
                        });
                $window.location.reload();
            }
        } else {
            alert('login required.')
        }

    };

    $scope.updateJSdoc = function () {
        $http.post('/fileApiAuth', $scope.data)
            .then(function successCallback(data) {
                console.log("ok");
            },
                function errorCallback(e) {
                    console.log(e);
                })
        $window.open('http://localhost:8080/index.html');

    }

    $scope.dowload = false;
    $scope.exportData = function () {
        $http.post('/exportApiAuth', $scope.data)
            .then(function successCallback(data) {
                if (data.data == '1') {
                    $scope.dowload = true;
                } else {
                    console.log("error");
                }
            },
                function errorCallback(e) {
                    console.log(e);
                })
        
    };
}
