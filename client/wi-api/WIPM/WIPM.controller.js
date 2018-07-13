angular
    .module('myApp')
    .controller('WIPMCtrl', WIPMCtrl);

function WIPMCtrl($scope, $http, $window, dialogApi) {
    $scope.data = [];
    $scope.regression = ['LinearRegression',
        'Lasso',
        'RandomForestRegressor',
        'SupportVectorMachine',
        'XGBoost',
        'NeuralNetwork',
        'DecisionTreeRegressor',
        'HuberRegressor'];
    $scope.classi = ['NeuralNetClassifier',
        'DecisionTreeClassifier',
        'KNN',
        'LogisticRegression',
        'RandomForestClassifier'
    ];
    $scope.crp = ['crp'];
    $scope.showModel = function () {
        
    }
    $http.get('/WIPM')
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
        dialogApi.addApi('/WIPM/');
    }

    $scope.editApi = function (WIPM_id) {
        dialogApi.editApi('/WIPM/', WIPM_id);
    }

    $scope.deleteApi = function (WIPM_id) {
        if (confirm("You want to remove the API!")) {
            $http.delete('/WIPM/' + WIPM_id)
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
        let data;
        $http.get('/WIPM')
            .then(function successCallback(data) {
                data = data.data;
                console.log(typeof data);
                $http.post('/fileWIPM', data)
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
