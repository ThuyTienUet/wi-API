angular
    .module('myApp')
    .service('authentication', authentication);
authentication.$inject = ['$window', '$http'];
function authentication($window, $http) {
    var saveToken = function (token) {
        $window.localStorage['user-token'] = token;
    };
    var getToken = function () {
        return $window.localStorage['user-token'];
    };

    var login = function (user) {
        return $http.post('/api/login', user)
            .then(function successCallback(data) {
                saveToken(data.data.token);
            });
    };
    var logout = function () {
        $window.localStorage.removeItem('user-token');
    };
    var isLoggedIn = function () {
        var token = getToken();
        if (token == "admin") {           
            return true;
        } else {
            return false;
        }
    };
    
    return {
        saveToken: saveToken,
        getToken: getToken,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
    };
}