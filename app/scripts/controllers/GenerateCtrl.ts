/// <reference path="IndexCtrl.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/angularfire/angularfire.d.ts" />
interface IGenerateScope extends IMainScope {
    generate:GenerateCtrl;
    ctrl:IndexCtrl;
    breeders:AngularFire;

}
class GenerateCtrl {

    constructor(public $scope:IGenerateScope, $firebase, public $state:ng.ui.IStateService, public toastr:Toastr, public DataService:DataService) {
        $scope.generate = this;
        $scope.breeders = $firebase(new Firebase("https://torid-fire-6526.firebaseio.com/breeders"));

        var breeders:IBreederProfile[] = this.GenerateBreeders();

        breeders.forEach((breeder:IBreederProfile)=> {
            var key:string = breeder.Email.replace(/\./g, '(p)');

            $scope.breeders[key] = {profile: breeder};
            $scope.breeders.$save();
        })
    }


    ShowSuccess(note:string) {

        this.toastr.info(note);
    }

    ShowError(note:string) {
        this.toastr.error(note);
    }

    GenerateBreeders():IBreederProfile[] {
        var breeders:IBreederProfile[] = [];

        var breeder1 = new BreederProfile();
        breeder1.FirstName = "Jon";
        breeder1.LastName = "Doe";
        breeder1.Website = "www.dogs.com";
        breeder1.Email = "breeder1@gmail.com";
        breeder1.Phone = "773-123-45-67";
        breeder1.KennelName = "Dogs Paradise";
        breeder1.Story = "My Dogs Story";
        breeder1.Parents = "Great parents";
        breeder1.Boys = "3 pupies";
        breeder1.Girls = "2 puppies";
        breeder1.AddInfo = "Add Info about dogs";
        breeder1.City = "Chicago";
        breeder1.Zip = "60630";
        breeder1.State = "IL";
        breeder1.Certifications = ["Cenrtification 1"];
        breeder1.VetServices = true;
        breeder1.Insurances = ["Insurance 1"];
        breeder1.Shipping = false;

        breeders.push(breeder1);

        return breeders;
    }
}