angular
    .module('myApp')
    .service('dialogModel', dialogUtils);

function dialogUtils(ModalService, $http) {
    let dialogUtils = {};

    dialogUtils.addModel = function (route, callback) {
        function addModelCtrl($scope, $http, $window, close) {
            $scope.model = {};
            $scope.data = [];

            this.onOkButtonClicked = function () {

                if ($scope.parameter === undefined) $scope.parameter = "{}";
                $scope.model = {
                    name: $scope.name,
                    parameter: JSON.parse($scope.parameter)
                }
                console.log(route);
                $http.post(route, $scope.model)
                    .then(function successCallback(data) {
                        $scope.model = {};
                        $scope.data = data.data;
                    },
                        function errorCallback(e) {
                            console.log(e);
                        });
                close($scope.data);
                 $window.location.reload();               
            };
            this.onCancelButtonClicked = function () {
                close(null);
            };
        }

        ModalService.showModal({
            templateUrl: '/service/modal/model-modal/add-model-modal.html',
            controller: addModelCtrl,
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
    
    dialogUtils.editModel = function (route, model_id, callback) {
        function editModelCtrl($scope, $http, $window, close) {
            $scope.model = {};
            $scope.data = [];
            console.log(route + model_id);
            $http.get(route + model_id)
                .then(function successCallback(data) {
                    $scope.name = data.data.name;
                    $scope.parameter = objToStr(JSON.parse(data.data.parameter));
                },
                    function errorCallback(e) {
                        console.log(e);
                    })
            this.onOkButtonClicked = function () {

                if ($scope.parameter === undefined) $scope.parameter = "{}";
                $scope.model = {
                    name: $scope.name,
                    parameter: JSON.parse($scope.parameter)
                }
                $http.put(route + model_id, $scope.model)
                    .then(function successCallback(data) {
                        $scope.model = {};
                        $scope.data = data.data;
                    },
                        function errorCallback(e) {
                            console.log(e);
                        });
                close($scope.data);
                $window.location.reload();
            };
            this.onCancelButtonClicked = function () {
                close(null);
            };
        }

        ModalService.showModal({
            templateUrl: '/service/modal/model-modal/edit-model-modal.html',
            controller: editModelCtrl,
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
function objToStr(obj) {
    let count = 0;
    let c = 0;
    function toString(obj) {
        count++;
        let dest = "{\n";
        for (let key in obj) {
            c++;
        }
        for (let key in obj) {
            c--;
            for (let i = 0; i < count; i++) {
                dest += "\t";
            }
            const val = obj[key];
            dest += `"${key}" : `
            if (typeof val !== 'object') {
                if (typeof val !== 'number') {
                    dest += `"${val}"`;
                } else {
                    dest += `${val}`;
                }
            } else {
                dest += `${toString(val)}`;

            }
            if (c != 0) {
                dest += ", \n";
            } else {
                dest += "\n"
            }
        }
        count--;
        let tmp = "";
        for (let i = 0; i < count; i++) {
            tmp += "\t";
        }
        dest += tmp + "}";
        return dest;
    }

    function cleaning(str) {

        return str.replace(/\,(\s)+\}/g, '\n }');
    }
    return cleaning(toString(obj));
    // return toString(obj);
}