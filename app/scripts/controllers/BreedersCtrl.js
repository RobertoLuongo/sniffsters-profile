/// <reference path="HomeCtrl.ts" />
var BreedersCtrl = (function () {
    function BreedersCtrl($scope, $modal, $stateParams, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$modal = $modal;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;

        $scope.modalContactSearch = {
            "title": "New Message",
            show: true
        };
        $scope.sortBy = [
            {
                name: 'Recent Litters',
                val: 'profile.LittersNumber'
            }
        ];
        $scope.sortFeature = {};

        $scope.breedersCtrl = this;

        $scope.searchLocation = ($stateParams.location == null || $stateParams.location == "") ? null : $stateParams.location;
        $scope.searchBreed = ($stateParams.breed == null || $stateParams.breed == "") ? null : $stateParams.breed;

        $scope.breeders = [];

        DataService.getAllProfiles().then(function (breedersArr) {
            var breeders = _.values(breedersArr);
            breeders.forEach(function (breeder) {
                if (!breeder.profile.isAdmin) {
                    if (!_.isNull($scope.searchLocation)) {
                        //                        console.log($scope.searchLocation);
                        //                        console.log(breeder.profile.Location);
                        if (_.isUndefined(breeder.profile) || _.isNull(breeder.profile.Location) || _.isUndefined(breeder.profile.Location) || breeder.profile.Location.indexOf($scope.searchLocation) == -1) {
                            return;
                        }
                    }
                    if (!_.isNull($scope.searchBreed)) {
                        if ((_.isUndefined(breeder.profile.breeds)) || _.values(breeder.profile.breeds).indexOf($scope.searchBreed) == -1) {
                            console.log(breeder);
                            return;
                        }
                    }

                    breeder.LittersNumber = breeder.hasOwnProperty('litters') ? _.values(breeder.litters).length : 0;
                    if (breeder.hasOwnProperty('feedbacks')) {
                        var total = 0;
                        var numb = 0;

                        _.values(breeder.feedbacks).forEach(function (feedback) {
                            if (feedback.hasOwnProperty('Evaluation') && feedback.Evaluation > 0) {
                                total += feedback.Evaluation;
                                numb++;
                            }
                        });

                        breeder.rating = numb > 0 ? Math.ceil(total / numb) : 0;
                    }

                    $scope.breeders.push(breeder);
                }
            });
        });
    }
    BreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    BreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return BreedersCtrl;
})();
