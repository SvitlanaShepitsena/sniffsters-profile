/// <reference path="../models/IBreederProfile.ts" />
var CopyProfileService = (function () {
    function CopyProfileService() {
        this.BreederProfile = new BreederProfile();
    }

    CopyProfileService.prototype.GetProfileClone = function () {
        var dolly = new BreederProfile();
        for (var key in this.BreederProfile) {
            if (this.BreederProfile.hasOwnProperty(key)) {
                dolly[key] = this.BreederProfile[key];
            }
        }
        return dolly;
    };

    CopyProfileService.prototype.SetProfile = function (breederProfile) {
        this.BreederProfile = breederProfile;
    };
    return CopyProfileService;
})();
