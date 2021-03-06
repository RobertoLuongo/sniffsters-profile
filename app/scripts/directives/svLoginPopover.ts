/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svLoginPopover = ($popover) => {

    return{
        restrict: 'E',
        template: '<button class="sniff-menu btn-link btn menu-modal">LOG IN</button>',
        replace: true,

        controller($scope) {
        },
        link: (scope, element, attrs) => {
            scope.lp = $popover(element, {template: '../../views/modals/login.html', placement: 'bottom', scope: scope});

            scope.$watch('lpShown', (lpShown) => {
                if (lpShown == false) {
                    scope.lp.hide();
                }

            });
        }
    }
}
