angular
    .module('myApp')
    .service('authentication', authentication);
authentication.$inject = ['$window', '$http'];
function authentication($window, $http) {
    // var saveToken = function (token) {
    //     $window.localStorage['user-token'] = token;
    // };
    var getToken = function () {
        return $window.localStorage['token'];
    };

    var getUser = function () {
        return $window.localStorage['user']
    }

    var login = function (user, cb) {
        $http({
            method: 'POST',
            url: 'http://admin.dev.i2g.cloud/login',
            data: user
        }).then(function successCallback(response) {
             console.log(response);
            if (response.data.code != 200) {
                console.error(response.data.reason);
                cb();
            } else {
                cb(response.data.content);
            }
        }, function errorCallback(response) {
            // console.error(response);
            if(toastr) toastr.error(response); 
            cb();
        });
        // return $http.post('/api/login', user) 
        //     .then(function successCallback(data) {
        //         saveToken(data.data.token);
        //     });
    };
    var logout = function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
    };
    var isLoggedIn = function () {
        var user = getUser();
        console.log(user);

        if (user) {
            return true;
        } else {
            return false;
        }
    };

    return {
       // saveToken: saveToken,
        getToken: getToken,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
    };
}