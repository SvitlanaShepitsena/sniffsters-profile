/// <reference path="../models/IBreederProfile.ts" />
class CopyProfileService {

    constructor(){

    }
    private BreederProfile:IBreederProfile = new BreederProfile();

    Clone(breederProfile:IBreederProfile) {

        for (var key in breederProfile) {
            if (breederProfile.hasOwnProperty(key)) {
                this.BreederProfile[key] = breederProfile[key];
            }
        }
    }

    GetProfile(){
        console.log('here');
        return this.BreederProfile;
    }

}