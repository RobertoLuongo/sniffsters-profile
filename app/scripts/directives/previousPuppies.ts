/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
interface IPreviousPuppies extends ng.IScope {
    test:string;
}

var previousPuppies:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/previous-puppies.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $stateParams, $firebase, $filter)=> {
            var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
            $scope.galleries = $firebase(new Firebase(galleriesUrl));
            $scope.indexPrev = 0;
            $scope.showAddPhotosButton = false;

            $scope.addBtnShown = () => {
                $scope.showAddPhotosButton = true;
            }
            $scope.addBtnHidden = () => {
                $scope.showAddPhotosButton = false;
            }

            $scope.next = () => {
                $scope.indexPrev++;
                if ($scope.indexPrev >= $scope.expuppies.length) {
                    $scope.indexPrev = 0;
                }

            }
            $scope.prev = () => {
                $scope.indexPrev--;
                if ($scope.indexPrev < 0) {
                    $scope.indexPrev = $scope.expuppies.length - 1;
                }
            }
            $scope.selectPrevPictures = (galleries) => {
                var photosArr = [];
                galleries.$on('value', (snapshot:any)=> {
                    var galleries = snapshot.snapshot.value;
                    var galleriesArr = _.values($filter('orderByPriority')(galleries));

                    galleriesArr.forEach((gallery:any)=> {
                        if (!gallery.isPrevPuppy) {
                            return;
                        }
                        _.values(gallery.Photos).forEach((photo)=> {
                            if (photosArr.indexOf(photo) == -1) {

                                photosArr.push(photo);
                            }
                        })

                    });
                    $scope.expuppies = _.shuffle(photosArr = (_.uniq(photosArr, (photo)=> {
                        return photo.caption;
                    })));
                });

            }


            $scope.selectPrevPictures($scope.galleries);

            $scope.g = new Gallery();
            $scope.g.isPrevPuppy = true;

            $scope.g.Title = "Our Previous Puppies Photos";
            $scope.btnTitle = "Add Photos";

            $scope.$watch('g.Photos', (collection)=> {
                if (collection.length > 0) {
                    $scope.btnTitle = "Add More Photos";
                }
            }, true);


            $scope.savePrevPuppies = () => {
                var galleriesUrl = $scope.home.MainUrl + 'breeders/' + $scope.home.FireProcess($stateParams.uname) + '/galleries';
                $scope.galleries = $firebase(new Firebase(galleriesUrl));


                if ($scope.g.Title === "") {
                    $scope.g.Title = "Our Previous Puppies Photos";
                }
                var galleryShort = _.omit($scope.g, 'Photos');
                $scope.galleries.$add(galleryShort).then((key) => {
                    $scope.g.Photos.forEach((photo)=> {
                        $scope.galleries.$child(key.name()).$child('Photos').$add(_.omit(photo, 'isSized'));
                    })
                    $scope.g = new Gallery();
                    $scope.g.Title = "Our Previous Puppies Photos";
                    $scope.btnTitle = "Add Photos";
                });


            }

        },
        link: (scope:IPreviousPuppies, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {

        }
    }
}
