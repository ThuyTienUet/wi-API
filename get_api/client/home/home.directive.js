angular
    .module('myApp')
    .directive('home', home);
function home() {
    return {
        restrict: 'EA',
        templateUrl: '/home/home.template.html',
        controller: 'homeCtrl'
    }
}