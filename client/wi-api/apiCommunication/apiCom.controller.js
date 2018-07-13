angular
    .module('myApp')
    .controller('apiComCtrl', apiComCtrl);

function apiComCtrl($scope, $http, $window, dialogApi) {
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
        dialogApi.editApi('/apiCom/', apiCom_id);
    }

    $scope.deleteApi = function (apiCom_id) {
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
        let data;
        $http.get('/apiCom')
            .then(function successCallback(data) {
                data = data.data;
                console.log(typeof data);
                $http.post('/fileApiCom', data)
                    .then(function successCallback(data) {
                        console.log(data);
                    },
                        function errorCallback(e) {
                            console.log(e);
                        })
            },
                function errorCallback(e) {
                    console.log(e);
                })

    }
}
