angular
    .module('myApp')
    .controller('apiSOMCtrl', apiSOMCtrl);

function apiSOMCtrl($scope, $http, $window, dialogApi, authentication) {
    $scope.data = [];
    let vm = this;
    $http.get('/apiSOM')
        .then(function successCallback(data) {
            $scope.data = data.data;
            for (let x = 0; x < $scope.data.length; x++) {
                let obj_param = JSON.parse($scope.data[x].payloadParams);
                let obj_sample = JSON.parse($scope.data[x].samplePayload);
                let obj_res = JSON.parse($scope.data[x].response);
                $scope.data[x].payloadParams = angular.toJson(obj_param, 2);
                $scope.data[x].samplePayload = angular.toJson(obj_sample, 2);
                $scope.data[x].response = angular.toJson(obj_res, 2);
            }
        },
            function errorCallback(e) {
                console.log(e);
            })
    $scope.addApi = function () {
        dialogApi.addApi('/apiSOM/');
    }

    $scope.editApi = function (apiSOM_id) {
        if (authentication.isLoggedIn() == true) {
            dialogApi.editApi('/apiSOM/', apiSOM_id);
        } else {
            alert('login required.')
        }
    }

    $scope.deleteApi = function (apiSOM_id) {
        if (authentication.isLoggedIn() == true) {
            if (confirm("You want to remove the API!")) {
                $http.delete('/apiSOM/' + apiSOM_id)
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
        $http.post('/fileApiSOM', $scope.data)
            .then(function successCallback(data) {
                console.log(data);
            },
                function errorCallback(e) {
                    console.log(e);
                })
    }

    $scope.dowload = false;
    $scope.exportData = function () {
        $http.post('/exportApiSOM', $scope.data)
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
