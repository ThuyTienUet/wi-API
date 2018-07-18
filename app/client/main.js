angular
    .module('myApp', ['angularModalService', 'ngRoute'])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'wi-api/home/home.template.html',
                controller: 'homeCtrl'
            })
            .when('/apiWI', {
                templateUrl: 'wi-api/apiWI/apiWI.template.html',
                controller: 'apiWICtrl'
            })
            .when('/apiAuth', {
                templateUrl: 'wi-api/apiAuth/apiAuth.template.html',
                controller: 'apiAuthCtrl'
            })
            .when('/apiCom', {
                templateUrl: 'wi-api/apiCommunication/apiCom.template.html',
                controller: 'apiComCtrl'
            })
            .when('/wiOnline', {
                templateUrl: 'wi-api/wiOnl/wiOnl.template.html',
                controller: 'wiOnlCtrl'
            })
            .when('/apiSOM', {
                templateUrl: 'wi-api/apiSOM/apiSOM.template.html',
                controller: 'apiSOMCtrl'
            })
            .when('/WIPM', {
                templateUrl: 'wi-api/WIPM/WIPM.template.html',
                controller: 'WIPMCtrl'
            })
            .when('/login', {
                templateUrl:''
            })
            .otherwise({ redirectTo: '/' });
    }])
