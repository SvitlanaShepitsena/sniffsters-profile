/// <reference path="IUser.ts" />

var Feature = (function () {
    function Feature() {
        this.free = 0;
        this.monthly = 0;
        this.annually = 0;
    }
    return Feature;
})();

var Plan = (function () {
    function Plan() {
    }
    return Plan;
})();

var SImage = (function () {
    function SImage(isSized, fileName, file64) {
        this.isSized = isSized;
        this.fileName = fileName;
        if (file64) {
            this.file64 = file64;
        }
        this.caption = fileName.split('.')[0] + ' image';
    }
    return SImage;
})();

var Note = (function () {
    function Note() {
        this.isUnread = true;
    }
    return Note;
})();

var Message = (function () {
    function Message() {
    }
    return Message;
})();

var Feedback = (function () {
    function Feedback() {
        this.ClientName = "";
        this.FeedbackBody = "";
        this.Evaluation = 0;
        this.AddedAt = Date.now();
    }
    return Feedback;
})();

var Photo = (function () {
    function Photo() {
    }
    return Photo;
})();

var Gallery = (function () {
    function Gallery() {
        this.Photos = [];
        this.isTemp = true;
    }
    return Gallery;
})();
var BreederProfile = (function () {
    function BreederProfile() {
        this.LittersNumber = 0;

        this.isBreeder = true;
        this.isAdmin = false;

        this.FirstName = "";
        this.LastName = "";
        this.Website = "";
        this.Email = "";
        this.Phone = "";
        this.KennelName = "";
        this.Story = "";
        this.Parents = "";
        this.Boys = "";
        this.Girls = "";
        this.AddInfo = "";
        this.City = "";
        this.Zip = "";
        this.State = "";
        this.Certifications = "";

        //        this.VetServices = false;
        this.Insurances = [];

        //        this.Shipping = false;
        this.IsShowEmail = true;
        this.IsShowPhoneNumber = true;
        this.Breeds = [];
    }
    return BreederProfile;
})();

var Litter = (function () {
    function Litter() {
        this.Photos = [];
    }
    return Litter;
})();
