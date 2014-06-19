/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IFeedback extends ng.IScope {
    test:string;
}

var feedback:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/feedback.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IFeedback, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
