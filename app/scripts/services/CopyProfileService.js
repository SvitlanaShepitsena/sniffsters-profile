/// <reference path="../models/IBreederProfile.ts" />
var CopyProfileService = (function () {
    function CopyProfileService() {
        this.BreederProfile = new BreederProfile();
    }
    CopyProfileService.prototype.Clone = function (breederProfile) {
        for (var key in breederProfile) {
            if (breederProfile.hasOwnProperty(key)) {
                this.BreederProfile[key] = breederProfile[key];
            }
        }
    };

    CopyProfileService.prototype.GetProfile = function () {
        console.log('here');
        return this.BreederProfile;
    };
    return CopyProfileService;
})();
//# sourceMappingURL=CopyProfileService.js.map
