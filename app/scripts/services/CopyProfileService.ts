/// <reference path="../models/IBreederProfile.ts" />
class CopyProfileService {
    constructor() {
    }

    BreederProfile:IBreederProfile = new BreederProfile();

    GetProfileClone() {

        var dolly:IBreederProfile = new BreederProfile();
        for (var key in this.BreederProfile) {
            if (this.BreederProfile.hasOwnProperty(key)) {
                dolly[key] = this.BreederProfile[key];
            }
        }
        return dolly;
    }

    SetProfile(breederProfile:IBreederProfile) {

        this.BreederProfile = breederProfile;
    }
}