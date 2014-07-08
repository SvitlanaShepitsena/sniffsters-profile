var CreateMessageCtrl = (function () {
    function CreateMessageCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope;
        this.$state = $state;
        this.toastr = toastr;
        this.DataService = DataService;
        $scope.createMessage = this;
    }
    CreateMessageCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note);
    };

    CreateMessageCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note);
    };
    return CreateMessageCtrl;
})();
