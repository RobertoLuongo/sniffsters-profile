/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotoGalleryEdit extends ng.IScope {
    test:string;
}

var photoGalleryEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            galleries: '=',
            id: '@',
            func: '&'
        },
        controller: ($scope, $stateParams, $upload, DataService:DataService, toastr:Toastr) => {
            var index:number = $stateParams.id;
            $scope.index = index;

            $scope.delete = (p:IPhoto, index:number) => {
                DataService.deletePhoto($scope.galleries[$scope.index].Id, p.Id).then(() => {
                    $scope.galleries[$scope.index].Photos.splice(index, 1);
                })
            }
            $scope.update = (p:IPhoto) => {
                DataService.updateCaption($scope.galleries[$scope.index].Id, p.Id, p.Caption).then(() => {
                    toastr.success('Changes have been successfully saved to Db');
                })
            }


           $scope.updateTitle=(newTitle:string) => {
               DataService.updateTitle($scope.galleries[$scope.index].Id, newTitle).then(() => {
                   toastr.success('Changes have been successfully saved to Db');
               });
           }

            $scope.onFileSelect = ($files) => {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        // method: 'POST' or 'PUT',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: {gallery: $scope.galleries[$scope.index].Id },
                        file: file // or list of files: $files for html5 only
                        /* set the file formData name ('Content-Desposition'). Default is 'file' */
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                        //formDataAppender: function(formData, key, val){}
                    }).progress((evt) => {
//                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success((data, status, headers, config) => {
                        // file is uploaded successfully
                        $scope.galleries[$scope.index].Photos.push(data);
//                        $scope.myModelObj = {};
//                        alert(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }
            }
        }
    }
}



