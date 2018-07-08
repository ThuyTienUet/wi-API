angular
    .module('myApp')
    .directive('navigation', navigation);
function navigation() {
    return {
        restrict: 'EA',
        templateUrl: '/directives/navigation/navigation.template.html',
        controller: 'navigationCtrl'
    };
}
