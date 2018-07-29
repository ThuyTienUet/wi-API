angular
    .module('myApp')
    .service('dialogApi', dialogUtils);

function dialogUtils(ModalService, $http) {
    let dialogUtils = {};

    dialogUtils.addApi = function (route, callback) {
        function addAPiCtrl($scope, $http, $window, close) {
            $scope.api = {};
            $scope.data = [];

            this.onOkButtonClicked = function () {

                if ($scope.payloadParams === undefined) $scope.payloadParams = "{}";
                if ($scope.samplePayload === undefined) $scope.samplePayload = "{}";
                if ($scope.response === undefined) $scope.response = "{}";
                let errName = $scope.name.search("-");
                let errParams = checkParam(JSON.parse($scope.payloadParams), null);
                if (errName > -1 || errParams > -1) {
                    if (errName > -1) {
                        toastr.error('Name is incorrect!');
                    } else {
                        toastr.error('Params is incorrect!');
                    }
                } else {
                    $scope.api = {
                        name: $scope.name,
                        method: $scope.method,
                        route: $scope.route,
                        payloadParams: JSON.parse($scope.payloadParams),
                        samplePayload: JSON.parse($scope.samplePayload),
                        note: $scope.note,
                        response: JSON.parse($scope.response)
                    }

                    $http.post(route, $scope.api)
                        .then(function successCallback(data) {
                            $scope.api = {};
                            $scope.data = data.data;
                        },
                            function errorCallback(e) {
                                console.log(e);
                            });
                    close($scope.data);
                    $window.location.reload();
                }

            };
            this.onCancelButtonClicked = function () {
                close(null);
            };
        }

        ModalService.showModal({
            templateUrl: '/service/modal/api-modal/add-api-modal.html',
            controller: addAPiCtrl,
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

    dialogUtils.editApi = function (route, api_id, callback) {
        function editApiCtrl($scope, $http, $window, close) {
            $scope.api = {};
            $scope.data = [];


            $http.get(route + api_id)
                .then(function successCallback(data) {
                    $scope.name = data.data.name;
                    $scope.method = data.data.method;
                    $scope.route = data.data.route;
                    $scope.note = data.data.note;

                    $scope.payloadParams = objToStr(JSON.parse(data.data.payloadParams));
                    $scope.samplePayload = objToStr(JSON.parse(data.data.samplePayload));
                    $scope.response = objToStr(JSON.parse(data.data.response));

                },
                    function errorCallback(e) {
                        console.log(e);
                    })
            this.onOkButtonClicked = function () {

                if ($scope.payloadParams === undefined) $scope.payloadParams = "{}";
                if ($scope.samplePayload === undefined) $scope.samplePayload = "{}";
                if ($scope.response === undefined) $scope.response = "{}";
                let errName = $scope.name.search("-");
                let errParams = checkParam(JSON.parse($scope.payloadParams), null);
                if (errName > -1 || errParams > -1) {
                    if (errName > -1) {
                        toastr.error('Name is incorrect!');
                    } else {
                        toastr.error('Params is incorrect!');
                    }
                } else {
                    $scope.api = {
                        name: $scope.name,
                        method: $scope.method,
                        route: $scope.route,
                        payloadParams: JSON.parse($scope.payloadParams),
                        samplePayload: JSON.parse($scope.samplePayload),
                        note: $scope.note,
                        response: JSON.parse($scope.response)
                    }
                    $http.put(route + api_id, $scope.api)
                        .then(function successCallback(data) {
                            $scope.api = {};
                            $scope.data = data.data;
                        },
                            function errorCallback(e) {
                                console.log(e);
                            });
                    close($scope.data);
                    $window.location.reload();
                }
            };
            this.onCancelButtonClicked = function () {
                close(null);
            };
        }

        ModalService.showModal({
            templateUrl: '/service/modal/api-modal/edit-api-modal.html',
            controller: editApiCtrl,
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

function checkParam(obj, parent) {
    function param(obj, parent) {
        let dest = -1;

        for (let key in obj) {
            const val = obj[key];
           
            if (typeof val !== 'object') {
                if (parent != null) {
                    dest = val.search(' ');
                    if (dest > -1) return dest;
                } else
                    dest = val.search(' ');
                   if (dest > -1) return dest;
            } else {
                dest = param(val, key);
            }
        }
        return dest;
    }

    return param(obj, parent);
}
