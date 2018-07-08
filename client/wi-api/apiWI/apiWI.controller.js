angular
    .module('myApp')
    .controller('apiWICtrl', apiWICtrl);

function apiWICtrl($scope, $http, $window, dialogApiWI) {
    $scope.data = [];

    $http.get('/apiInsight')
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
        dialogApiWI.addApi();
    }

    $scope.editApi = function (api_id) {
        dialogApiWI.editApi(api_id);
    }

    $scope.deleteApi = function (api_id) {
        if (confirm("You want to remove the API!")) {
            $http.delete('/apiInsight/' + api_id)
                .then(function successCallback() {
                    console.log("Delete success");
                },
                    function errorCallback(e) {
                        console.log(e);
                    });
            $window.location.reload();
        }
    };
}
