var GenerateCtrl = function () {
    function GenerateCtrl($scope, $firebase, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.generate = this;
        $scope.breeders = $firebase(new Firebase('https://torid-fire-6526.firebaseio.com/breeders'));
        var breeders = this.GenerateBreeders();
        breeders.forEach(function (breeder) {
            var key = breeder.Email.replace(/\./g, '(p)');
            $scope.breeders[key] = { profile: breeder };
            $scope.breeders.$save();
            var breederRef = _this.$firebase(new Firebase('https://torid-fire-6526.firebaseio.com/breeders/' + key));
            var galleriesRef = breederRef.$child('galleries');
            var galleries = _this.GenerateGalleries();
            galleries.forEach(function (gallery) {
                galleriesRef[gallery.Id] = gallery;
                galleriesRef.$save();
            });
            breederRef.$save();
        });
        $scope.breeders.$save();
    }

    GenerateCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };
    GenerateCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    GenerateCtrl.prototype.GenerateGalleries = function () {
        var galleries = [];
        var gallery1 = new Gallery();
        gallery1.Id = 1;
        gallery1.Title = 'Gallery 1';
        gallery1.IsActive = true;
        var photo1 = new Photo();
        photo1.Id = 1;
        photo1.Caption = 'My Dogs';
        photo1.FilePath = 'Picture1.jpg';
        var photo2 = new Photo();
        photo2.Id = 2;
        photo2.Caption = 'My Dogs 2';
        photo2.FilePath = 'Picture2.jpg';
        var photos = [];
        photos[photo1.Id] = photo1;
        photos[photo2.Id] = photo2;
        gallery1.Photos = photos;
        galleries[gallery1.Id] = gallery1;
        return galleries;
    };
    GenerateCtrl.prototype.GenerateBreeders = function () {
        var breeders = [];
        var breeder1 = new BreederProfile();
        breeder1.FirstName = 'Jon';
        breeder1.LastName = 'Doe';
        breeder1.Website = 'www.dogs.com';
        breeder1.Email = 'breeder1@gmail.com';
        breeder1.Phone = '773-123-45-67';
        breeder1.KennelName = 'Dogs Paradise';
        breeder1.Story = 'My Dogs Story';
        breeder1.Parents = 'Great parents';
        breeder1.Boys = '3 pupies';
        breeder1.Girls = '2 puppies';
        breeder1.AddInfo = 'Add Info about dogs';
        breeder1.City = 'Chicago';
        breeder1.Zip = '60630';
        breeder1.State = 'IL';
        breeder1.Certifications = ['Cenrtification 1'];
        breeder1.VetServices = true;
        breeder1.Insurances = ['Insurance 1'];
        breeder1.Shipping = false;
        breeders.push(breeder1);
        return breeders;
    };
    return GenerateCtrl;
}();