
var userInfoEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/user-info-edit.html',
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
