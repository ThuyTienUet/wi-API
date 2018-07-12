angular
    .module('myApp')
    .service('dialogWIPM', dialogUtils);

function dialogUtils(ModalService, $http) {
    let dialogUtils = {};

    dialogUtils.addApi = function (callback) {
        function addAPiCtrl($scope, $http, $window, close) {
            $scope.api = {};
            $scope.data = [];
            // $scope.count_param = 1;
            // $scope.count_sample = 1;
            // $scope.keys_param = [];
            // $scope.values_param = [];
            // $scope.keys_sample = [];
            // $scope.values_sample = [];

            // $scope.addCountParam = function () {
            //     $scope.count_param = $scope.count_param + 1;
            // }
            // $scope.subCountParam = function () {
            //     $scope.count_param = $scope.count_param - 1;
            // }
            // $scope.addCountSample = function () {
            //     $scope.count_sample = $scope.count_sample + 1;
            // }
            // $scope.subCountSample = function () {
            //     $scope.count_sample = $scope.count_sample - 1;
            // }

            this.onOkButtonClicked = function () {
                // let tmp_param = '{'
                // if ($scope.keys_param[0] === undefined && $scope.values_param[0] === undefined) {
                //     $scope.count_param = 0;
                // }
                // for (let i = 0; i < $scope.count_param; i++) {
                //     if ($scope.keys_param[i] === undefined) $scope.keys_param[i] = '';
                //     if ($scope.values_param[i] === undefined) $scope.values_param[i] = '';
                //     if (i == 0) {
                //         tmp_param = tmp_param + '"' + $scope.keys_param[i] + '":"' + $scope.values_param[i] + '"';
                //     } else {
                //         tmp_param = tmp_param + ', "' + $scope.keys_param[i] + '":"' + $scope.values_param[i] + '"';
                //     }
                // }
                // tmp_param = tmp_param + '}';
                // tmp_param = JSON.parse(tmp_param);

                // let tmp_sample = '{'
                // if ($scope.keys_sample[0] === undefined && $scope.values_sample[0] === undefined) {
                //     $scope.count_sample = 0;
                // }
                // for (let i = 0; i < $scope.count_sample; i++) {
                //     if ($scope.keys_sample[i] === undefined) $scope.keys_sample[i] = '';
                //     if ($scope.values_sample[i] === undefined) $scope.values_sample[i] = '';
                //     if (i == 0) {
                //         tmp_sample = tmp_sample + '"' + $scope.keys_sample[i] + '":"' + $scope.values_sample[i] + '"';
                //     } else {
                //         tmp_sample = tmp_sample + ', "' + $scope.keys_sample[i] + '":"' + $scope.values_sample[i] + '"';
                //     }
                // }
                // tmp_sample = tmp_sample + '}';
                // tmp_sample = JSON.parse(tmp_sample);
                if ($scope.payloadParams === undefined) $scope.payloadParams = "{}";
                if ($scope.samplePayload === undefined) $scope.samplePayload = "{}";
                if ($scope.response === undefined) $scope.response = "{}";
                $scope.api = {
                    name: $scope.name,
                    method: $scope.method,
                    route: $scope.route,
                    payloadParams: JSON.parse($scope.payloadParams),
                    samplePayload: JSON.parse($scope.samplePayload),
                    note: $scope.note,
                    response: JSON.parse($scope.response)
                }

                $http.post('/WIPM', $scope.api)
                    .then(function successCallback(data) {
                        $scope.api = {};
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

    dialogUtils.editApi = function (WIPM_id, callback) {
        function editApiCtrl($scope, $http, $window, close) {
            $scope.api = {};
            $scope.data = [];
            $scope.api = {};
            $scope.data = [];
            // $scope.count_param = 0;
            // $scope.count_sample = 0;
            // $scope.keys_param = [];
            // $scope.values_param = [];
            // $scope.keys_sample = [];
            // $scope.values_sample = [];

            // $scope.addCountParam = function () {
            //     $scope.count_param = $scope.count_param + 1;
            // }
            // $scope.subCountParam = function () {
            //     $scope.count_param = $scope.count_param - 1;
            // }
            // $scope.addCountSample = function () {
            //     $scope.count_sample = $scope.count_sample + 1;
            // }
            // $scope.subCountSample = function () {
            //     $scope.count_sample = $scope.count_sample - 1;
            // }

            $http.get('/WIPM/' + WIPM_id)
                .then(function successCallback(data) {
                    console.log(data.data);
                    $scope.name = data.data.name;
                    $scope.method = data.data.method;
                    $scope.route = data.data.route;
                    $scope.note = data.data.note;
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
                            count --;
                            let tmp = "";
                            for (let i = 0; i < count; i++) {
                                tmp+= "\t";
                            }
                            dest +=  tmp + "}";
                            return dest;
                        }
            
                        function cleaning(str) {
            
                            return str.replace(/\,(\s)+\}/g, '\n }');
                        }
                        return cleaning(toString(obj));
                       // return toString(obj);
                    }

                    $scope.payloadParams = objToStr(JSON.parse(data.data.payloadParams));
                    $scope.samplePayload = objToStr(JSON.parse(data.data.samplePayload));
                    $scope.response = objToStr(JSON.parse(data.data.response));
                    // let param = JSON.parse(data.data.payloadParams);
                    // let sample = JSON.parse(data.data.samplePayload)
                    // if (data.data.response != "{}") $scope.response = JSON.parse(data.data.response);
                    // else $scope.response = data.data.response;

                    // for (let key in param) {
                    //     $scope.count_param = $scope.count_param + 1;
                    //     const val = param[key];
                    //     $scope.keys_param.push(`${key}`);
                    //     $scope.values_param.push(`${val}`);
                    // }
                    // for (let key in sample) {
                    //     $scope.count_sample = $scope.count_sample + 1;
                    //     const val = sample[key];
                    //     $scope.keys_sample.push(`${key}`);
                    //     $scope.values_sample.push(`${val}`);
                    // }

                },
                    function errorCallback(e) {
                        console.log(e);
                    })
            this.onOkButtonClicked = function () {
                // let tmp_param = '{'
                // if ($scope.keys_param[0] === undefined && $scope.values_param[0] === undefined) {
                //     $scope.count_param = 0;
                // }
                // for (let i = 0; i < $scope.count_param; i++) {
                //     if ($scope.keys_param[i] === undefined) $scope.keys_param[i] = '';
                //     if ($scope.values_param[i] === undefined) $scope.values_param[i] = '';
                //     if (i == 0) {
                //         tmp_param = tmp_param + '"' + $scope.keys_param[i] + '":"' + $scope.values_param[i] + '"';
                //     } else {
                //         tmp_param = tmp_param + ', "' + $scope.keys_param[i] + '":"' + $scope.values_param[i] + '"';
                //     }
                // }
                // tmp_param = tmp_param + '}';
                // tmp_param = JSON.parse(tmp_param);

                // let tmp_sample = '{'
                // if ($scope.keys_sample[0] === undefined && $scope.values_sample[0] === undefined) {
                //     $scope.count_sample = 0;
                // }
                // for (let i = 0; i < $scope.count_sample; i++) {
                //     if ($scope.keys_sample[i] === undefined) $scope.keys_sample[i] = '';
                //     if ($scope.values_sample[i] === undefined) $scope.values_sample[i] = '';

                //     if (i == 0) {
                //         tmp_sample = tmp_sample + '"' + $scope.keys_sample[i] + '":"' + $scope.values_sample[i] + '"';
                //     } else {
                //         tmp_sample = tmp_sample + ', "' + $scope.keys_sample[i] + '":"' + $scope.values_sample[i] + '"';
                //     }
                // }
                // tmp_sample = tmp_sample + '}';
                // tmp_sample = JSON.parse(tmp_sample);
                if ($scope.payloadParams === undefined) $scope.payloadParams = "{}";
                if ($scope.samplePayload === undefined) $scope.samplePayload = "{}";
                if ($scope.response === undefined) $scope.response = "{}";
                $scope.api = {
                    name: $scope.name,
                    method: $scope.method,
                    route: $scope.route,
                    payloadParams: JSON.parse($scope.payloadParams),
                    samplePayload: JSON.parse($scope.samplePayload),
                    note: $scope.note,
                    response: JSON.parse($scope.response)
                }
                $http.put('/WIPM/' + WIPM_id, $scope.api)
                    .then(function successCallback(data) {
                        $scope.api = {};
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
