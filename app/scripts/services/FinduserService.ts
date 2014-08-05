/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/firebase/firebase.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />
class FinduserService {
    constructor(public $firebase, public settings, public $filter, public $q:ng.IQService) {
    }

    find(userName:string) {
        userName = this.FireProcess(userName);
        var d = this.$q.defer();
        var mainRef = this.$firebase(new Firebase(this.settings.mainUrl));
        this.getUser(mainRef, 'breeders', userName).then((user)=> {
            d.resolve(user);
        }, (user)=> {
            this.getUser(mainRef, 'lookers', userName).then((user)=> {
                d.resolve(user);
            }, (user)=> {
                d.reject(null)
            })
        });
        return d.promise;
    }


    getUser(mainRef, type:string, userName:string) {
        var d = this.$q.defer();
        var breeders = mainRef.$child(type);
        breeders.$on('value', (snapshot:any)=> {
            var bs = snapshot.snapshot.value;

            var userNames = _.pluck(this.$filter('orderByPriority')(bs), 'profile');
            var foundUser = _.find(userNames, (user)=> {
                if (_.isUndefined(user)) {
                    return false;
                }
                return user.UserName == userName;
            });
            if (_.isUndefined(foundUser)) {
                d.reject(null);
            } else {
                d.resolve(foundUser)
            }

        });
        return d.promise;
    }

    findByEmail(email:string) {
        email = this.FireProcess(email);
        console.log(email);
        var d = this.$q.defer();
        var mainRef = this.$firebase(new Firebase(this.settings.mainUrl));
        this.getUserByEmail(mainRef, 'breeders', email).then((user:any)=> {
            d.resolve(user.profile);
        }, (user)=> {
            this.getUserByEmail(mainRef, 'lookers', email).then((user:any)=> {
                d.resolve(user.profile);
            }, (user)=> {
                d.reject(null)
            })
        });
        return d.promise;
    }


    getUserByEmail(mainRef, type:string, email:string) {
        var d = this.$q.defer();
        email = this.FireProcess(email);

        var breeders = mainRef.$child(type);
        var keys = breeders.$getIndex();
        var wasFound = false;
        keys.forEach((key)=> {
            if (key == email) {
                wasFound = true;
                d.resolve(breeders[key]);
            }
        })
        if (!wasFound) {
            d.reject(null);
        }

        return d.promise;
    }

    FireProcess(userName:string) {
        return userName.replace(/\./g, '(p)');
    }

    FireUnProcess(userName:string) {
        return userName.replace(/\(p\)/g, '.');

    }
}
