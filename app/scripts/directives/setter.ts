/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISetter extends IHomeScope {
    test:string;
    home:HomeCtrl;
}

var setter:() => ng.IDirective = () => {

    return{
        restrict: 'E',

        link: (scope:ISetter, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.home.IsHome = true;
            scope.home.IsSearchHidden = true;
        }
    }
}
