/// <reference path="HomeCtrl.ts" />
var BreedersCtrl = (function () {
    function BreedersCtrl($scope, $stateParams, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.home.IsSearchHidden = false;
        $scope.breedersCtrl = this;

        $scope.searchLocation = ($stateParams.location == null || $stateParams.location == "") ? null : $stateParams.location;
        $scope.searchBreed = ($stateParams.breed == null || $stateParams.breed == "") ? null : $stateParams.breed;

        $scope.breeders = [];
        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                DataService.getAllProfiles().then(function (breedersArr) {
                    var breeders = _.values(breedersArr);
                    breeders.forEach(function (breeder) {
                        if (!_.isNull($scope.searchLocation)) {
                            if (_.isNull(breeder.profile.Location) || $scope.searchLocation != breeder.profile.Location) {
                                return;
                            }
                        }

                        if (!_.isNull($scope.searchBreed)) {
                            if ((_.isUndefined(breeder.profile.breeds)) || _.values(breeder.profile.breeds).indexOf($scope.searchBreed) == -1) {
                                console.log(breeder);
                                return;
                            }
                        }
                        $scope.breeders.push(breeder);
                    });
                });
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
