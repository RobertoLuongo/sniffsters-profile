/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />

interface IPhotosScope extends IMainScope {
    photosCtrl:PhotosCtrl;
    index:IndexCtrl;
}
class PhotosCtrl {
    public Galleries:IGallery[];
    public GalleriesNew:IGallery[];
    public SelectedGallery:IGallery;
    public SelectedGalleryEdit:IGallery;

    constructor(public $scope:IPhotosScope, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService, public CopyProfileService:CopyProfileService) {
        var newGallery = new Gallery();
        this.GalleriesNew = new Array(newGallery);

        $scope.photosCtrl = this;
        $scope.index.url = "photos";
        DataService.getGalleries<IGallery>().then((data) => {
//            Success
            this.Galleries = data;
        }, () => {
//            Error
            this.ShowError('Error in getting Photo Galleries from the server');
        })
    }

    addGallery() {
        this.GalleriesNew.push(new Gallery());
    }

    setSelectedGallery(galid:number) {
        this.SelectedGallery = this.Galleries[galid];
        this.$state.go('profile.photos.galleries', {'id': galid});
//        console.log(this.SelectedGallery);
    }

    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    CreateSelectedGalleryClone() {
        this.SelectedGalleryEdit = new Gallery();
        for (var key in this.SelectedGallery) {
            if (this.SelectedGallery.hasOwnProperty(key)) {
                this.SelectedGalleryEdit[key] = this.SelectedGallery[key];
            }
        }
//        console.log(this.SelectedGalleryEdit);
//        console.log(this.SelectedGallery);
//        return dolly;
    }
}