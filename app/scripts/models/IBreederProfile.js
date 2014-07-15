/// <reference path="IUser.ts" />

var Note = (function () {
    function Note() {
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
    }
    return Gallery;
})();
var BreederProfile = (function () {
    function BreederProfile() {
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
        this.Certifications = [];
        this.VetServices = false;
        this.Insurances = [];
        this.Shipping = false;

        this.IsShowEmail = true;
        this.IsShowPhoneNumber = true;
    }
    return BreederProfile;
})();

var Litter = (function () {
    function Litter() {
    }
    return Litter;
})();
