angular
    .module('myApp')
    .controller('apiComCtrl', apiComCtrl);

function apiComCtrl($scope, $http, $window, dialogApi, authentication) {
    $scope.data = [];

    $http.get('/apiCom')
        .then(function successCallback(data) {
            $scope.data = data.data;
            for (let x = 0; x < $scope.data.length; x++) {
                let obj_param = JSON.parse($scope.data[x].payloadParams);
                let obj_sample = JSON.parse($scope.data[x].samplePayload);
                let obj_res = JSON.parse($scope.data[x].response);
                $scope.data[x].payloadParams = angular.toJson(obj_param, 2);
                $scope.data[x].samplePayload = angular.toJson(obj_sample, 2);
                $scope.data[x].response = angular.toJson(obj_res, 2);
                $scope.a = $scope.data[0].payloadParams;
            }
        },
            function errorCallback(e) {
                console.log(e);
            })
    $scope.addApi = function () {
        dialogApi.addApi('/apiCom/');
    }

    $scope.editApi = function (apiCom_id) {
        if (authentication.isLoggedIn() == true) {
            dialogApi.editApi('/apiCom/', apiCom_id);
        } else {
            toastr.error('Login required.');
        }

    }

    $scope.deleteApi = function (apiCom_id) {

        if (authentication.isLoggedIn() == true) {
            if (confirm("You want to remove the API!")) {
                $http.delete('/apiCom/' + apiCom_id)
                    .then(function successCallback() {
                        console.log("Delete success");
                    },
                        function errorCallback(e) {
                            console.log(e);
                        });
                $window.location.reload();
            }
        } else {
            toastr.error('Login required.');
        }

    };
    $scope.updateJSdoc = function () {
        $http.get('/apiCom')
            .then(function successCallback(data) {
                $scope.data = data.data;

            },
                function errorCallback(e) {
                    console.log(e);
                })
    }
    $scope.updateJSdoc = function () {
        $http.post('/fileApiCom', $scope.data)
            .then(function successCallback(data) {
                console.log(data);
            },
                function errorCallback(e) {
                    console.log(e);
                })

    }

    $scope.dowload = false;
    $scope.exportData = function () {
        $http.post('/exportApiCom', $scope.data)
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
