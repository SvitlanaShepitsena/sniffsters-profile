/// <reference path="IndexCtrl.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../models/ILookerProfile.ts" />
var GenerateCtrl = (function () {
    function GenerateCtrl($scope, $firebase, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.generate = this;

        var plan1 = new Plan();
        plan1.name = 'Free';
        plan1.comment = 'First 2 months';

        var plan2 = new Plan();
        plan2.name = 'Monthly';
        plan2.price = 19.99;

        var plan3 = new Plan();
        plan3.name = 'Annually';
        plan3.price = 225.99;
        plan3.discount = 10;

        $scope.plans = $scope.home.MainRefFire.$child('subscriptions').$child('plans');
        $scope.plans.$remove();

        $scope.plans.$add(plan1);
        $scope.plans.$add(plan2);
        $scope.plans.$add(plan3);

        $scope.breeders = $firebase(new Firebase($scope.home.MainUrl + "/breeders"));

        var breeders = this.GenerateBreeders();
        breeders.forEach(function (breeder) {
            var key = breeder.Email.replace(/\./g, '(p)');
            $scope.breeders[key] = { profile: breeder };
            $scope.breeders.$save();

            var breederRef = _this.$firebase(new Firebase($scope.home.MainUrl + "breeders/" + key));
            var galleriesRef = breederRef.$child('galleries');

            //            var littersRef = breederRef.$child('litters');
            //            var litters:ILitter[] = this.GenerateLitters();
            //            var littersUrl = $scope.home.MainUrl + 'breeders/' + key + '/litters/';
            //            console.log(littersUrl);
            //            litters.forEach((litter:ILitter)=> {
            //                var newLitter = _.omit(litter, 'Photos');
            //                littersRef.$add(newLitter).then((keyChild) => {
            //                    var litterRef = this.$firebase(new Firebase(littersUrl + keyChild.name()));
            //                    var photosRef = litterRef.$child('photos');
            //                    litter.Photos.forEach((photo)=> {
            //                        photosRef.$add(photo)
            //                    })
            //                });
            //            })
            var feedbackRef = breederRef.$child('feedbacks');
            var feedbacks = _this.GenerateFeedbacks();

            feedbacks.forEach(function (feedback) {
                feedbackRef.$add(feedback);

                feedbackRef.$save();
            });

            var messagesRef = breederRef.$child('messages');
            var notes = _this.GenerateMessages();

            notes.forEach(function (note) {
                messagesRef.$add(note);
            });

            var followersRef = breederRef.$child('followers');
            var followingsRef = breederRef.$child('followings');

            //=followings
            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder5@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder6@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder7@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });

            //=followers
            followersRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder2@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followersRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder3@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followersRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder4@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });

            //            followersRef.$add({
            //                FirstName: "John",
            //                LastName: "Doe",
            //                City: "Chicago",
            //                State: "IL"
            //            });
            followingsRef.$save();
            followersRef.$save();
            breederRef.$save();
        });

        $scope.breeders.$save();
        this.CreateLookers();
    }
    GenerateCtrl.prototype.CreateLookers = function () {
        var _this = this;
        this.$scope.generate = this;

        this.$scope.lookers = this.$firebase(new Firebase(this.$scope.home.MainUrl + "lookers"));

        var lookers = this.GenerateLookers();
        lookers.forEach(function (looker) {
            var key = looker.Email.replace(/\./g, '(p)');
            _this.$scope.lookers[key] = { profile: looker };
            _this.$scope.lookers.$save();

            var lookerRef = _this.$firebase(new Firebase(_this.$scope.home.MainUrl + "lookers/" + key));

            var messagesRef = lookerRef.$child('messages');
            var notes = _this.GenerateMessages();

            notes.forEach(function (note) {
                messagesRef.$add(note);
            });

            var followingsRef = lookerRef.$child('followings');

            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder2@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder3@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followingsRef.$add({
                KennelName: "Dogs Paradise",
                Email: "breeder4@gmail.com",
                City: "Chicago",
                State: "IL",
                Website: "www.dogsparadise.com",
                Phone: '773-123-45-67'
            });
            followingsRef.$save();
            lookerRef.$save();
        });

        this.$scope.lookers.$save();
    };

    GenerateCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    GenerateCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };

    GenerateCtrl.prototype.GenerateLitters = function () {
        var litters = [];

        var litter1 = new Litter();
        litter1.Title = "My First Litters";
        var photo1 = new Photo();
        photo1.Caption = "My Dogs.Litter1";
        photo1.FilePath = 'Picture1.jpg';

        var photo2 = new Photo();
        photo2.Caption = "My Dogs 2.Litter2";
        photo2.FilePath = 'Picture2.jpg';

        var photos = [];
        photos.push(photo1);
        photos.push(photo2);

        litter1.Colors = "Black & White";
        litter1.DateOfBirth = "03.23.2014";
        litter1.Photos = photos;

        litters.push(litter1);

        return litters;
    };

    GenerateCtrl.prototype.GenerateFeedbacks = function () {
        var feedbacks = [];
        var feedback1 = new Feedback();
        feedback1.ClientName = "Dog looker 1";
        feedback1.FeedbackBody = "The best breeder I ever had. Lovely dogs!";

        var feedback2 = new Feedback();
        feedback2.ClientName = "Dog looker 2";
        feedback2.FeedbackBody = "Excellent Service. Fast response. Thank you! A++";

        feedbacks.push(feedback1);
        feedbacks.push(feedback2);

        return feedbacks;
    };

    GenerateCtrl.prototype.GenerateMessages = function () {
        var notes = [];

        for (var i = 1; i <= 5; i++) {
            var note = new Note();
            note.amISender = (Math.random() < 0.5);
            note.isTrash = false;
            note.userName = "breeder" + i + "@gmail(p)com";
            note.body = "Hello, This is breeder" + 1;
            note.sent = Date.now();
            notes.push(note);
        }

        return notes;
    };

    GenerateCtrl.prototype.GenerateGalleries = function () {
        var galleries = [];
        var gallery1 = new Gallery();
        gallery1.Title = "Gallery 1";

        var photo1 = new Photo();
        photo1.Caption = "My Dogs";
        photo1.FilePath = 'Picture1.jpg';

        var photo2 = new Photo();
        photo2.Caption = "My Dogs 2";
        photo2.FilePath = 'Picture2.jpg';
        var photos = [];
        photos.push(photo1);
        photos.push(photo2);

        gallery1.Photos = photos;

        return galleries;
    };

    GenerateCtrl.prototype.GenerateBreeders = function () {
        var breeders = [];

        var breeder1 = new BreederProfile();
        breeder1.FirstName = "Jon";
        breeder1.LastName = "Doe";
        breeder1.Website = "www.dogs.com";
        breeder1.Email = "breeder1@gmail.com";
        breeder1.Phone = "773-123-45-67";
        breeder1.KennelName = "Dogs Paradise";
        breeder1.Story = "My Dogs Story";
        breeder1.Parents = "Great parents";
        breeder1.Boys = "3 pupies";
        breeder1.Girls = "2 puppies";
        breeder1.AddInfo = "Add Info about dogs";
        breeder1.City = "Chicago";
        breeder1.Location = "Chicago,IL";
        breeder1.Zip = "60630";
        breeder1.State = "IL";
        breeder1.Certifications = ["Cenrtification 1"];
        breeder1.VetServices = true;
        breeder1.Insurances = ["Insurance 1"];
        breeder1.Shipping = false;

        breeders.push(breeder1);

        var breeder2 = new BreederProfile();
        breeder2.FirstName = "Jon";
        breeder2.LastName = "Doe";
        breeder2.Website = "www.dogs.com";
        breeder2.Email = "breeder2@gmail.com";
        breeder2.Phone = "773-123-45-67";
        breeder2.KennelName = "Dogs Paradise";
        breeder2.Story = "My Dogs Story";
        breeder2.Parents = "Great parents";
        breeder2.Boys = "3 pupies";
        breeder2.Girls = "2 puppies";
        breeder2.AddInfo = "Add Info about dogs";
        breeder2.City = "Chicago";
        breeder2.Zip = "60630";
        breeder2.State = "IL";
        breeder2.Certifications = ["Cenrtification 1"];
        breeder2.VetServices = true;
        breeder2.Insurances = ["Insurance 1"];
        breeder2.Shipping = false;

        breeders.push(breeder2);

        var breeder3 = new BreederProfile();
        breeder3.FirstName = "Jon";
        breeder3.LastName = "Doe";
        breeder3.Website = "www.dogs.com";
        breeder3.Email = "breeder3@gmail.com";
        breeder3.Phone = "773-123-45-67";
        breeder3.KennelName = "Dogs Paradise";
        breeder3.Story = "My Dogs Story";
        breeder3.Parents = "Great parents";
        breeder3.Boys = "3 pupies";
        breeder3.Girls = "2 puppies";
        breeder3.AddInfo = "Add Info about dogs";
        breeder3.City = "Chicago";
        breeder3.Zip = "60630";
        breeder3.State = "IL";
        breeder3.Certifications = ["Cenrtification 1"];
        breeder3.VetServices = true;
        breeder3.Insurances = ["Insurance 1"];
        breeder3.Shipping = false;

        breeders.push(breeder3);

        var breeder4 = new BreederProfile();
        breeder4.FirstName = "Jon";
        breeder4.LastName = "Doe";
        breeder4.Website = "www.dogs.com";
        breeder4.Email = "breeder4@gmail.com";
        breeder4.Phone = "773-123-45-67";
        breeder4.KennelName = "Dogs Paradise";
        breeder4.Story = "My Dogs Story";
        breeder4.Parents = "Great parents";
        breeder4.Boys = "3 pupies";
        breeder4.Girls = "2 puppies";
        breeder4.AddInfo = "Add Info about dogs";
        breeder4.City = "Chicago";
        breeder4.Zip = "60630";
        breeder4.State = "IL";
        breeder4.Certifications = ["Cenrtification 1"];
        breeder4.VetServices = true;
        breeder4.Insurances = ["Insurance 1"];
        breeder4.Shipping = false;

        breeders.push(breeder4);

        var breeder5 = new BreederProfile();
        breeder5.FirstName = "Jon";
        breeder5.LastName = "Doe";
        breeder5.Website = "www.dogs.com";
        breeder5.Email = "breeder5@gmail.com";
        breeder5.Phone = "773-123-45-67";
        breeder5.KennelName = "Dogs Paradise";
        breeder5.Story = "My Dogs Story";
        breeder5.Parents = "Great parents";
        breeder5.Boys = "3 pupies";
        breeder5.Girls = "2 puppies";
        breeder5.AddInfo = "Add Info about dogs";
        breeder5.City = "Chicago";
        breeder5.Zip = "60630";
        breeder5.State = "IL";
        breeder5.Certifications = ["Cenrtification 1"];
        breeder5.VetServices = true;
        breeder5.Insurances = ["Insurance 1"];
        breeder5.Shipping = false;

        breeders.push(breeder5);

        var breeder6 = new BreederProfile();
        breeder6.FirstName = "Jon";
        breeder6.LastName = "Doe";
        breeder6.Website = "www.dogs.com";
        breeder6.Email = "breeder6@gmail.com";
        breeder6.Phone = "773-123-45-67";
        breeder6.KennelName = "Dogs Paradise";
        breeder6.Story = "My Dogs Story";
        breeder6.Parents = "Great parents";
        breeder6.Boys = "3 pupies";
        breeder6.Girls = "2 puppies";
        breeder6.AddInfo = "Add Info about dogs";
        breeder6.City = "Chicago";
        breeder6.Zip = "60630";
        breeder6.State = "IL";
        breeder6.Certifications = ["Cenrtification 1"];
        breeder6.VetServices = true;
        breeder6.Insurances = ["Insurance 1"];
        breeder6.Shipping = false;

        breeders.push(breeder6);

        var breeder7 = new BreederProfile();
        breeder7.FirstName = "Jon";
        breeder7.LastName = "Doe";
        breeder7.Website = "www.dogs.com";
        breeder7.Email = "breeder7@gmail.com";
        breeder7.Phone = "773-123-45-67";
        breeder7.KennelName = "Dogs Paradise";
        breeder7.Story = "My Dogs Story";
        breeder7.Parents = "Great parents";
        breeder7.Boys = "3 pupies";
        breeder7.Girls = "2 puppies";
        breeder7.AddInfo = "Add Info about dogs";
        breeder7.City = "Chicago";
        breeder7.Zip = "60630";
        breeder7.State = "IL";
        breeder7.Certifications = ["Cenrtification 1"];
        breeder7.VetServices = true;
        breeder7.Insurances = ["Insurance 1"];
        breeder7.Shipping = false;

        breeders.push(breeder7);

        var breeder8 = new BreederProfile();
        breeder8.FirstName = "Jon";
        breeder8.LastName = "Doe";
        breeder8.Website = "www.dogs.com";
        breeder8.Email = "breeder8@gmail.com";
        breeder8.Phone = "773-123-45-67";
        breeder8.KennelName = "Dogs Paradise";
        breeder8.Story = "My Dogs Story";
        breeder8.Parents = "Great parents";
        breeder8.Boys = "3 pupies";
        breeder8.Girls = "2 puppies";
        breeder8.AddInfo = "Add Info about dogs";
        breeder8.City = "Chicago";
        breeder8.Zip = "60630";
        breeder8.State = "IL";
        breeder8.Certifications = ["Cenrtification 1"];
        breeder8.VetServices = true;
        breeder8.Insurances = ["Insurance 1"];
        breeder8.Shipping = false;

        breeders.push(breeder8);

        var breeder9 = new BreederProfile();
        breeder9.FirstName = "Jon";
        breeder9.LastName = "Doe";
        breeder9.Website = "www.dogs.com";
        breeder9.Email = "breeder9@gmail.com";
        breeder9.Phone = "773-123-45-67";
        breeder9.KennelName = "Dogs Paradise";
        breeder9.Story = "My Dogs Story";
        breeder9.Parents = "Great parents";
        breeder9.Boys = "3 pupies";
        breeder9.Girls = "2 puppies";
        breeder9.AddInfo = "Add Info about dogs";
        breeder9.City = "Chicago";
        breeder9.Zip = "60630";
        breeder9.State = "IL";
        breeder9.Certifications = ["Cenrtification 1"];
        breeder9.VetServices = true;
        breeder9.Insurances = ["Insurance 1"];
        breeder9.Shipping = false;

        breeders.push(breeder9);

        var breeder10 = new BreederProfile();
        breeder10.FirstName = "Jon";
        breeder10.LastName = "Doe";
        breeder10.Website = "www.dogs.com";
        breeder10.Email = "breeder10@gmail.com";
        breeder10.Phone = "773-123-45-67";
        breeder10.KennelName = "Dogs Paradise";
        breeder10.Story = "My Dogs Story";
        breeder10.Parents = "Great parents";
        breeder10.Boys = "3 pupies";
        breeder10.Girls = "2 puppies";
        breeder10.AddInfo = "Add Info about dogs";
        breeder10.City = "Chicago";
        breeder10.Zip = "60630";
        breeder10.State = "IL";
        breeder10.Certifications = ["Cenrtification 1"];
        breeder10.VetServices = true;
        breeder10.Insurances = ["Insurance 1"];
        breeder10.Shipping = false;

        breeders.push(breeder10);
        return breeders;
    };

    GenerateCtrl.prototype.GenerateLookers = function () {
        var lookers = [];

        var looker1 = new LookerProfile();
        looker1.FirstName = "Jon";
        looker1.LastName = "Doe";
        looker1.Email = "looker1@gmail.com";
        looker1.Phone = "773-123-45-67";
        looker1.City = "Chicago";
        looker1.Zip = "60630";
        looker1.State = "IL";

        lookers.push(looker1);

        var looker2 = new LookerProfile();
        looker2.FirstName = "Jon";
        looker2.LastName = "Doe";
        looker2.Email = "looker2@gmail.com";
        looker2.Phone = "773-123-45-67";
        looker2.City = "Chicago";
        looker2.Zip = "60630";
        looker2.State = "IL";

        lookers.push(looker2);

        var looker3 = new LookerProfile();
        looker3.FirstName = "Jon";
        looker3.LastName = "Doe";
        looker3.Email = "looker3@gmail.com";
        looker3.Phone = "773-123-45-67";
        looker3.City = "Chicago";
        looker3.Zip = "60630";
        looker3.State = "IL";

        lookers.push(looker3);

        var looker4 = new LookerProfile();
        looker4.FirstName = "Jon";
        looker4.LastName = "Doe";
        looker4.Email = "looker4@gmail.com";
        looker4.Phone = "773-123-45-67";
        looker4.City = "Chicago";
        looker4.Zip = "60630";
        looker4.State = "IL";

        lookers.push(looker4);

        var looker5 = new LookerProfile();
        looker5.FirstName = "Jon";
        looker5.LastName = "Doe";
        looker5.Email = "looker5@gmail.com";
        looker5.Phone = "773-123-45-67";
        looker5.City = "Chicago";
        looker5.Zip = "60630";
        looker5.State = "IL";

        lookers.push(looker5);

        var looker6 = new LookerProfile();
        looker6.FirstName = "Jon";
        looker6.LastName = "Doe";
        looker6.Email = "looker6@gmail.com";
        looker6.Phone = "773-123-45-67";
        looker6.City = "Chicago";
        looker6.Zip = "60630";
        looker6.State = "IL";

        lookers.push(looker6);

        var looker7 = new LookerProfile();
        looker7.FirstName = "Jon";
        looker7.LastName = "Doe";
        looker7.Email = "looker7@gmail.com";
        looker7.Phone = "773-123-45-67";
        looker7.City = "Chicago";
        looker7.Zip = "60630";
        looker7.State = "IL";

        lookers.push(looker7);

        var looker8 = new LookerProfile();
        looker8.FirstName = "Jon";
        looker8.LastName = "Doe";
        looker8.Email = "looker8@gmail.com";
        looker8.Phone = "773-123-45-67";
        looker8.City = "Chicago";
        looker8.Zip = "60630";
        looker8.State = "IL";

        lookers.push(looker8);

        var looker9 = new LookerProfile();
        looker9.FirstName = "Jon";
        looker9.LastName = "Doe";
        looker9.Email = "looker9@gmail.com";
        looker9.Phone = "773-123-45-67";
        looker9.City = "Chicago";
        looker9.Zip = "60630";
        looker9.State = "IL";

        lookers.push(looker9);

        var looker10 = new LookerProfile();
        looker10.FirstName = "Jon";
        looker10.LastName = "Doe";
        looker10.Email = "looker10@gmail.com";
        looker10.Phone = "773-123-45-67";
        looker10.City = "Chicago";
        looker10.Zip = "60630";
        looker10.State = "IL";

        lookers.push(looker10);

        return lookers;
    };
    return GenerateCtrl;
})();
