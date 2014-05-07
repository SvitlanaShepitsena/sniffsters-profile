/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />

/// <reference path="IndexCtrl.ts" />
interface IProfileEditScope extends IMainScope {
    edit:EditProfileCtrl;
    EditedUserProfile: IUserProfile;
}

class EditProfileCtrl {

    constructor(public $scope:IProfileEditScope) {
        $scope.edit = this;
        this.SetFields($scope.index.UserProfile);
    }

    EditedUserProfile:IUserProfile={
        FirstName:'',
        LastName : '',
        UserName : ''};

// method for copying values from UserProfile from IndexCtrl.
    SetFields(userProfile:IUserProfile) {

        this.EditedUserProfile.FirstName = userProfile.FirstName;
        this.EditedUserProfile.LastName = userProfile.LastName;
        this.EditedUserProfile.UserName = userProfile.UserName;
    }

    Save() {
        console.log('Save');
    }
}
