var Feedback = (function () {
    function Feedback() {
        this.ClientName = "Client 1";
        this.FeedbackBody = "Best Breeder";
    }
    return Feedback;
})();

var Photo = (function () {
    function Photo() {
        this.Id = 1;
        this.Caption = "My Dogs";
        this.FilePath = "Picture1.jpg";
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
    }
    return BreederProfile;
})();

var Litter = (function () {
    function Litter() {
        this.Id = 1;
        this.Title = "Best Litter";
        this.DateOfBirth = "05.01.2014";
        this.Puppies = "My Best Puppies";
        this.Colors = "Black & WHite";

        this.Photos = [new Photo()];
    }
    return Litter;
})();
