angular
    .module('myApp')
    .controller('apiSOMCtrl', apiSOMCtrl);

function apiSOMCtrl($scope, $http, $window, dialogApiSOM) {
    $scope.data = [];

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
                $scope.a = $scope.data[0].payloadParams;
            }
        },
            function errorCallback(e) {
                console.log(e);
            })
    $scope.addApi = function () {
        dialogApiSOM.addApi();
    }

    $scope.editApi = function (apiSOM_id) {
        dialogApiSOM.editApi(apiSOM_id);
    }

    $scope.deleteApi = function (apiSOM_id) {
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
    };
}
