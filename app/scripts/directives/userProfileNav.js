var userProfileNav = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/user-profile-nav.html',
        transclude: true,
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
        }
    };
};