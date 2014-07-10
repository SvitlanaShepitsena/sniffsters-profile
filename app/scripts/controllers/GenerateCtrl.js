/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
var GenerateCtrl = (function () {
    function GenerateCtrl($scope, $firebase, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope;
        this.$firebase = $firebase;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.generate = this;
        $scope.breeders = $firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders"));

        var breeders = this.GenerateBreeders();
        breeders.forEach(function (breeder) {
            var key = breeder.Email.replace(/\./g, '(p)');
            $scope.breeders[key] = { profile: breeder };
            $scope.breeders.$save();

            var breederRef = _this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key));
            var galleriesRef = breederRef.$child('galleries');

            var littersRef = breederRef.$child('litters');
            var litters = _this.GenerateLitters();

            litters.forEach(function (litter) {
                littersRef[litter.Id] = litter;
                littersRef.$save();
            });

            var feedbackRef = breederRef.$child('feedbacks');
            var feedbacks = _this.GenerateFeedbacks();

            feedbacks.forEach(function (feedback) {
                feedbackRef[feedback.Id] = feedback;
                feedbackRef.$save();
            });

            var galleries = _this.GenerateGalleries();
            galleries.forEach(function (gallery) {
                galleriesRef[gallery.Id] = gallery;
                galleriesRef.$save();
            });

            var messagesRef0 = breederRef.$child('messages');
            messagesRef0.$save();

            var breederMessagesRef = _this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/messages"));
            breederMessagesRef.$child('Inbox');
            breederMessagesRef.$save();

            var breederMessagesRef = _this.$firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders/" + key + "/messages/Inbox"));

            var messages = _this.GenerateMessages();
            var messages2 = _this.GenerateMessages();

            var sender = messages[0].Sender.replace(/\./g, '(p)');
            var sender2 = "breeder3@gmail(p)com";

            ///////////////////////
            var senderRef = breederMessagesRef.$child(sender);
            messages.forEach(function (message) {
                senderRef.$add({
                    amISender: (Math.random() < 0.5),
                    body: message.Body });
            });
            senderRef.$save();

            //////////////////////
            ///////////////////////
            var senderRef = breederMessagesRef.$child(sender2);
            messages2.forEach(function (message) {
                senderRef.$add({
                    amISender: (Math.random() < 0.5),
                    body: "Breeder 3 writing" });
            });
            senderRef.$save();

            //////////////////////
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

    GenerateCtrl.prototype.GenerateLitters = function () {
        var litters = [];

        var litter1 = new Litter();
        litter1.Id = 1;
        litter1.Title = "My First Litters";

        var photo1 = new Photo();
        photo1.Id = 1;
        photo1.Caption = "My Dogs.Litter1";
        photo1.FilePath = 'Picture1.jpg';

        var photo2 = new Photo();
        photo2.Id = 2;
        photo2.Caption = "My Dogs 2.Litter2";
        photo2.FilePath = 'Picture2.jpg';

        var photos = [];
        photos[photo1.Id] = photo1;
        photos[photo2.Id] = photo2;

        litter1.Colors = "Black & White";
        litter1.DateOfBirth = "03.23.2014";
        litter1.Photos = photos;

        litters[litter1.Id] = litter1;

        return litters;
    };

    GenerateCtrl.prototype.GenerateFeedbacks = function () {
        var feedbacks = [];
        var feedback1 = new Feedback();
        feedback1.Id = 1;
        feedback1.ClientName = "Dog looker 1";
        feedback1.FeedbackBody = "The best breeder I ever had. Lovely dogs!";

        var feedback2 = new Feedback();
        feedback2.Id = 2;
        feedback2.ClientName = "Dog looker 2";
        feedback2.FeedbackBody = "Excellent Service. Fast response. Thank you! A++";

        feedbacks[feedback1.Id] = feedback1;
        feedbacks[feedback2.Id] = feedback2;

        return feedbacks;
    };

    GenerateCtrl.prototype.GenerateMessages = function () {
        var messages = [];
        var message1 = new Message();
        message1.Sender = "breeder2@gmail.com";
        message1.Body = "Hello Breeder 1 from Breeder 2";

        var message2 = new Message();
        message2.Sender = "breeder2@gmail.com";
        message2.Body = "Hello Breeder 1. Hope everything is well.";

        var message3 = new Message();
        message3.Sender = "breeder2@gmail.com";
        message3.Body = "Hello Breeder 1. How are your dogs?";

        var message4 = new Message();
        message4.Sender = "breeder2@gmail.com";
        message4.Body = "Where have you been?";

        messages.push(message1);
        messages.push(message2);
        messages.push(message3);
        messages.push(message4);

        return messages;
    };

    GenerateCtrl.prototype.GenerateGalleries = function () {
        var galleries = [];
        var gallery1 = new Gallery();
        gallery1.Id = 1;
        gallery1.Title = "Gallery 1";
        gallery1.IsActive = true;

        var photo1 = new Photo();
        photo1.Id = 1;
        photo1.Caption = "My Dogs";
        photo1.FilePath = 'Picture1.jpg';

        var photo2 = new Photo();
        photo2.Id = 2;
        photo2.Caption = "My Dogs 2";
        photo2.FilePath = 'Picture2.jpg';
        var photos = [];
        photos[photo1.Id] = photo1;
        photos[photo2.Id] = photo2;

        gallery1.Photos = photos;

        galleries[gallery1.Id] = (gallery1);

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

        return breeders;
    };
    return GenerateCtrl;
})();
