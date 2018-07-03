/**
 * Create controller
 * @module myApp
 */

angular
    .module('myApp')
    .controller('homeCtrl', homeCtrl);

/**
 * 
 * @param {*}  
 * @param {*}  
 * @param {*} dialogUtilService 
 */
function homeCtrl($scope, $http, dialogUtilService) {
    $scope.data = [];

    $http.get('/api/apiInsight')
        .then(function successCallback(data) {
            $scope.data = data.data;
            console.log($scope.data[0].payloadParams);
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
        dialogUtilService.addApi();
    }

    $scope.editApi = function (api_id) {
        dialogUtilService.editApi(api_id);
    }

    $scope.deleteApi = function (api_id) {
        if (confirm("You want to remove the API!")) {
            $http.delete('/api/apiInsight/' + api_id)
                .then(function successCallback() {
                    console.log("Delete success");
                },
                    function errorCallback(e) {
                        console.log(e);
                    });
            window.location = "http://localhost:3000";
        }
    };
}