/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="IndexCtrl.ts" />

var EditProfileCtrl = (function () {
    function EditProfileCtrl($scope) {
        this.$scope = $scope;
        this.EditedUserProfile = {
            FirstName: '',
            LastName: '',
            UserName: '' };
        $scope.edit = this;
        this.SetFields($scope.index.UserProfile);
    }
    // method for copying values from UserProfile from IndexCtrl.
    EditProfileCtrl.prototype.SetFields = function (userProfile) {
        this.EditedUserProfile.FirstName = userProfile.FirstName;
        this.EditedUserProfile.LastName = userProfile.LastName;
        this.EditedUserProfile.UserName = userProfile.UserName;
    };

    EditProfileCtrl.prototype.Save = function () {
        console.log('Save');
    };
    return EditProfileCtrl;
})();
//# sourceMappingURL=EditProfileCtrl.js.map
