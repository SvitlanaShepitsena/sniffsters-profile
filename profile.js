var AboutCtrl = function () {
    function AboutCtrl($scope, FinduserService, $state, toastr, DataService) {
        this.$scope = $scope, this.FinduserService = FinduserService, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1, $scope.about = this
    }

    return AboutCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, AboutCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, AboutCtrl
}(), AdminPanelCtrl = function () {
    function AdminPanelCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.home.IsSearchHidden = !1, $scope.adminPanel = this
    }

    return AdminPanelCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, AdminPanelCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, AdminPanelCtrl
}(), AdvertiseCtrl = function () {
    function AdvertiseCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.advertise = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1
    }

    return AdvertiseCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, AdvertiseCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, AdvertiseCtrl
}(), BreedersCtrl = function () {
    function BreedersCtrl($scope, $modal, $filter, $firebase, $stateParams, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope, this.$modal = $modal, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1, $scope.modalContactSearch = {title: "New Message", show: !0}, $scope.sortBy = [
            {name: "Recent Litters", val: "-LittersNumber"},
            {name: "Rating", val: "-rating"}
        ], $scope.sortFeature = {}, $scope.breedersCtrl = this, $scope.searchLocation = null == $stateParams.location || "" == $stateParams.location ? null : $stateParams.location, $scope.searchBreed = null == $stateParams.breed || "" == $stateParams.breed ? null : $stateParams.breed, $scope.breeders = [], $scope.isDataLoading = !0, this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _.isNull(user) && (user = {email: "no"}), _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                var url = $scope.home.MainUrl + "breeders", breedersRef = $firebase(new Firebase(url));
                breedersRef.$on("value", function (snapshot) {
                    var breedersArr = $filter("orderByPriority")(snapshot.snapshot.value);
                    breedersArr.forEach(function (breeder) {
                        if (!_.isUndefined(breeder.profile) && !breeder.profile.isAdmin) {
                            if (!_.isNull($scope.searchLocation) && (_.isUndefined(breeder.profile) || _.isNull(breeder.profile.Location) || _.isUndefined(breeder.profile.Location) || -1 == breeder.profile.Location.indexOf($scope.searchLocation)))return;
                            if (!_.isNull($scope.searchBreed) && (_.isUndefined(breeder.profile.breeds) || -1 == _.values(breeder.profile.breeds).indexOf($scope.searchBreed)))return;
                            if (breeder.LittersNumber = breeder.hasOwnProperty("litters") ? _.values(breeder.litters).length : 0, breeder.hasOwnProperty("feedbacks")) {
                                var total = 0, numb = 0;
                                _.values(breeder.feedbacks).forEach(function (feedback) {
                                    feedback.hasOwnProperty("Evaluation") && feedback.Evaluation > 0 && (total += feedback.Evaluation, numb++)
                                }), breeder.rating = numb > 0 ? Math.ceil(total / numb) : 0
                            } else breeder.rating = 0;
                            $scope.breeders.push(breeder)
                        }
                        $scope.isDataLoading = !1
                    })
                })
            })
        })
    }

    return BreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, BreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, BreedersCtrl
}(), BreedsCtrl = function () {
    function BreedsCtrl($scope, $modal, $stateParams, $state, toastr, $firebase) {
        this.$scope = $scope, this.$stateParams = $stateParams, this.$state = $state, this.toastr = toastr, this.$firebase = $firebase, $scope.breeds = this, $scope.newBreed = {}, $scope.saveBreed = function (breed) {
            $scope.breeds.$add(breed)
        }, $scope.saveLocation = function (location) {
            $scope.locations.$add(location)
        }, $scope.remove = function (key) {
            $scope.breeds.$remove(key)
        }, $scope.breeds = $firebase(new Firebase($scope.home.MainUrl + "breeds")), $scope.locations = $firebase(new Firebase($scope.home.MainUrl + "locations"))
    }

    return BreedsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, BreedsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, BreedsCtrl
}(), ContactCtrl = function () {
    function ContactCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.contact = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1
    }

    return ContactCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, ContactCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, ContactCtrl
}(), CreateMessageCtrl = function () {
    function CreateMessageCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.createMessage = this
    }

    return CreateMessageCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, CreateMessageCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, CreateMessageCtrl
}(), DogsCtrl = function () {
    function DogsCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.dogs = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1
    }

    return DogsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, DogsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, DogsCtrl
}(), ExploreCtrl = function () {
    function ExploreCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.explore = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1
    }

    return ExploreCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, ExploreCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, ExploreCtrl
}(), FollowersCtrl = function () {
    function FollowersCtrl($scope, settings, $firebase, $state, toastr, DataService) {
        this.$scope = $scope, this.settings = settings, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.followersCtrl = this, $scope.followers = [], $scope.noFollowers = settings.noFollowers, $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var followersUrl = $scope.home.MainUrl;
                followersUrl += $scope.home.isBreeder ? "breeders/" : "lookers/", followersUrl += $scope.home.FireProcess(user.email) + "/followers", $scope.followersRef = $firebase(new Firebase(followersUrl)), $scope.followersKeys = $scope.followersRef.$getIndex(), $scope.followersKeys.forEach(function (key) {
                    var isBreeder = _.values($scope.followersRef[key])[0], userType = isBreeder ? "breeders" : "lookers", userUrl = $scope.home.MainUrl + userType + "/" + key, userRef = $firebase(new Firebase(userUrl));
                    userRef.$on("value", function (snapshot) {
                        var breeder = snapshot.snapshot.value;
                        $scope.followers.push({userName: breeder.profile.Email, nickName: breeder.profile.UserName, avatar: breeder.profile.images ? _.values(breeder.profile.images.avatar)[0] : null})
                    })
                })
            })
        })
    }

    return FollowersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, FollowersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, FollowersCtrl
}(), FollowingsCtrl = function () {
    function FollowingsCtrl($scope, settings, $firebase, $state, toastr, DataService) {
        this.$scope = $scope, this.settings = settings, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.followingsCtrl = this, $scope.followings = [], $scope.noFollowing = settings.noFollowing, $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var followingsUrl = $scope.home.MainUrl;
                followingsUrl += $scope.home.isBreeder ? "breeders/" : "lookers/", followingsUrl += $scope.home.FireProcess(user.email) + "/followings", $scope.followingsKeys = _.uniq($firebase(new Firebase(followingsUrl)).$getIndex()), $scope.followingsKeys.forEach(function (key) {
                    var breederUrl = $scope.home.MainUrl + "breeders/" + key, breederRef = $firebase(new Firebase(breederUrl));
                    breederRef.$on("value", function (snapshot) {
                        var breeder = snapshot.snapshot.value;
                        $scope.followings.push({userName: breeder.profile.Email, nickName: breeder.profile.UserName, avatar: breeder.profile.images ? _.values(breeder.profile.images.avatar)[0] : null})
                    })
                })
            })
        })
    }

    return FollowingsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, FollowingsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, FollowingsCtrl
}(), ForBreedersCtrl = function () {
    function ForBreedersCtrl($scope, $stateParams, $state, toastr, DataService, $location, $anchorScroll) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.forBreeders = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1, $stateParams.scroll && ($location.hash("upgrade"), $anchorScroll())
    }

    return ForBreedersCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, ForBreedersCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, ForBreedersCtrl
}(), GenerateCtrl = function () {
    function GenerateCtrl($scope, $firebase, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope, this.$firebase = $firebase, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.generate = this;
        var plan1 = new Plan;
        plan1.name = "Free", plan1.comment = "First 2 months";
        var plan2 = new Plan;
        plan2.name = "Monthly", plan2.price = 19.99;
        var plan3 = new Plan;
        plan3.name = "Annually", plan3.price = 225.99, plan3.discount = 10, $scope.plans = $scope.home.MainRefFire.$child("subscriptions").$child("plans"), $scope.plans.$remove(), $scope.plans.$add(plan1), $scope.plans.$add(plan2), $scope.plans.$add(plan3), $scope.breeders = $firebase(new Firebase($scope.home.MainUrl + "/breeders"));
        var breeders = this.GenerateBreeders();
        breeders.forEach(function (breeder) {
            breeder.Location = breeder.City + ", " + breeder.State, breeder.UserName = breeder.Email.split("@")[0], "breeder1" == breeder.UserName && (breeder.isAdmin = !0, breeder.UserName = "Admin");
            var key = breeder.Email.replace(/\./g, "(p)");
            $scope.breeders[key] = {profile: breeder}, $scope.breeders.$save();
            var breederRef = _this.$firebase(new Firebase($scope.home.MainUrl + "breeders/" + key)), feedbackRef = (breederRef.$child("galleries"), breederRef.$child("feedbacks")), feedbacks = _this.GenerateFeedbacks();
            feedbacks.forEach(function (feedback) {
                feedbackRef.$add(feedback), feedbackRef.$save()
            }), breederRef.$save()
        }), $scope.breeders.$save(), this.CreateLookers()
    }

    return GenerateCtrl.prototype.CreateLookers = function () {
        var _this = this;
        this.$scope.generate = this, this.$scope.lookers = this.$firebase(new Firebase(this.$scope.home.MainUrl + "lookers"));
        var lookers = this.GenerateLookers();
        lookers.forEach(function (looker) {
            looker.UserName = looker.Email.split("@")[0];
            var key = looker.Email.replace(/\./g, "(p)");
            _this.$scope.lookers[key] = {profile: looker}, _this.$scope.lookers.$save();
            var lookerRef = _this.$firebase(new Firebase(_this.$scope.home.MainUrl + "lookers/" + key)), messagesRef = lookerRef.$child("messages"), notes = _this.GenerateMessages();
            notes.forEach(function (note) {
                messagesRef.$add(note)
            }), lookerRef.$save()
        }), this.$scope.lookers.$save()
    }, GenerateCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, GenerateCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, GenerateCtrl.prototype.GenerateLitters = function () {
        var litters = [], litter1 = new Litter;
        litter1.Title = "My First Litters";
        var photo1 = new Photo;
        photo1.Caption = "My Dogs.Litter1", photo1.FilePath = "Picture1.jpg";
        var photo2 = new Photo;
        photo2.Caption = "My Dogs 2.Litter2", photo2.FilePath = "Picture2.jpg";
        var photos = [];
        return photos.push(photo1), photos.push(photo2), litter1.Colors = "Black & White", litter1.DateOfBirth = "03.23.2014", litter1.Photos = photos, litters.push(litter1), litters
    }, GenerateCtrl.prototype.GenerateFeedbacks = function () {
        var feedbacks = [], feedback1 = new Feedback;
        feedback1.ClientName = "Dog looker 1", feedback1.FeedbackBody = "The best breeder I ever had. Lovely dogs!";
        var feedback2 = new Feedback;
        return feedback2.ClientName = "Dog looker 2", feedback2.FeedbackBody = "Excellent Service. Fast response. Thank you! A++", feedbacks.push(feedback1), feedbacks.push(feedback2), feedbacks
    }, GenerateCtrl.prototype.GenerateMessages = function () {
        for (var notes = [], i = 1; 5 >= i; i++) {
            var note = new Note;
            note.amISender = Math.random() < .5, note.isTrash = !1, note.userName = "breeder" + i + "@gmail(p)com", note.nickName = "breeder" + i, note.body = "Hello, This is breeder1", note.sent = Date.now(), notes.push(note)
        }
        return notes
    }, GenerateCtrl.prototype.GenerateGalleries = function () {
        var galleries = [], gallery1 = new Gallery;
        gallery1.Title = "Gallery 1";
        var photo1 = new Photo;
        photo1.Caption = "My Dogs", photo1.FilePath = "Picture1.jpg";
        var photo2 = new Photo;
        photo2.Caption = "My Dogs 2", photo2.FilePath = "Picture2.jpg";
        var photos = [];
        return photos.push(photo1), photos.push(photo2), gallery1.Photos = photos, galleries
    }, GenerateCtrl.prototype.GenerateBreeders = function () {
        var breeders = [], breeder1 = new BreederProfile;
        breeder1.FirstName = "Jon", breeder1.LastName = "Doe", breeder1.Website = "www.dogs.com", breeder1.Email = "breeder1@gmail.com", breeder1.Phone = "773-123-45-67", breeder1.KennelName = "Dogs Paradise", breeder1.Story = "My Dogs Story", breeder1.Parents = "Great parents", breeder1.Boys = "3 pupies", breeder1.Girls = "2 puppies", breeder1.AddInfo = "Add Info about dogs", breeder1.City = "Chicago", breeder1.Location = "Chicago,IL", breeder1.Zip = "60630", breeder1.State = "IL", breeder1.Certifications = "Certification 1", breeder1.VetServices = !0, breeder1.Insurances = "Insurance 1", breeder1.Shipping = !1, breeders.push(breeder1);
        var breeder2 = new BreederProfile;
        breeder2.FirstName = "Jon", breeder2.LastName = "Doe", breeder2.Website = "www.dogs.com", breeder2.Email = "breeder2@gmail.com", breeder2.Phone = "773-123-45-67", breeder2.KennelName = "Dogs Paradise", breeder2.Story = "My Dogs Story", breeder2.Parents = "Great parents", breeder2.Boys = "3 pupies", breeder2.Girls = "2 puppies", breeder2.AddInfo = "Add Info about dogs", breeder2.City = "Chicago", breeder2.Zip = "60630", breeder2.State = "IL", breeder2.Certifications = "Certification 1", breeder2.VetServices = !0, breeder2.Insurances = "Insurance 1", breeder2.Shipping = !1, breeders.push(breeder2);
        var breeder3 = new BreederProfile;
        breeder3.FirstName = "Jon", breeder3.LastName = "Doe", breeder3.Website = "www.dogs.com", breeder3.Email = "breeder3@gmail.com", breeder3.Phone = "773-123-45-67", breeder3.KennelName = "Dogs Paradise", breeder3.Story = "My Dogs Story", breeder3.Parents = "Great parents", breeder3.Boys = "3 pupies", breeder3.Girls = "2 puppies", breeder3.AddInfo = "Add Info about dogs", breeder3.City = "Chicago", breeder3.Zip = "60630", breeder3.State = "IL", breeder3.Certifications = "Certification 1", breeder3.VetServices = !0, breeder3.Insurances = "Insurance 1", breeder3.Shipping = !1, breeders.push(breeder3);
        var breeder4 = new BreederProfile;
        breeder4.FirstName = "Jon", breeder4.LastName = "Doe", breeder4.Website = "www.dogs.com", breeder4.Email = "breeder4@gmail.com", breeder4.Phone = "773-123-45-67", breeder4.KennelName = "Dogs Paradise", breeder4.Story = "My Dogs Story", breeder4.Parents = "Great parents", breeder4.Boys = "3 pupies", breeder4.Girls = "2 puppies", breeder4.AddInfo = "Add Info about dogs", breeder4.City = "Chicago", breeder4.Zip = "60630", breeder4.State = "IL", breeder4.Certifications = "Certification 1", breeder4.VetServices = !0, breeder4.Insurances = "Insurance 1", breeder4.Shipping = !1, breeders.push(breeder4);
        var breeder5 = new BreederProfile;
        breeder5.FirstName = "Jon", breeder5.LastName = "Doe", breeder5.Website = "www.dogs.com", breeder5.Email = "breeder5@gmail.com", breeder5.Phone = "773-123-45-67", breeder5.KennelName = "Dogs Paradise", breeder5.Story = "My Dogs Story", breeder5.Parents = "Great parents", breeder5.Boys = "3 pupies", breeder5.Girls = "2 puppies", breeder5.AddInfo = "Add Info about dogs", breeder5.City = "Chicago", breeder5.Zip = "60630", breeder5.State = "IL", breeder5.Certifications = "Certification 1", breeder5.VetServices = !0, breeder5.Insurances = "Insurance 1", breeder5.Shipping = !1, breeders.push(breeder5);
        var breeder6 = new BreederProfile;
        breeder6.FirstName = "Jon", breeder6.LastName = "Doe", breeder6.Website = "www.dogs.com", breeder6.Email = "breeder6@gmail.com", breeder6.Phone = "773-123-45-67", breeder6.KennelName = "Dogs Paradise", breeder6.Story = "My Dogs Story", breeder6.Parents = "Great parents", breeder6.Boys = "3 pupies", breeder6.Girls = "2 puppies", breeder6.AddInfo = "Add Info about dogs", breeder6.City = "Chicago", breeder6.Zip = "60630", breeder6.State = "IL", breeder6.Certifications = "Certification 1", breeder6.VetServices = !0, breeder6.Insurances = "Insurance 1", breeder6.Shipping = !1, breeders.push(breeder6);
        var breeder7 = new BreederProfile;
        breeder7.FirstName = "Jon", breeder7.LastName = "Doe", breeder7.Website = "www.dogs.com", breeder7.Email = "breeder7@gmail.com", breeder7.Phone = "773-123-45-67", breeder7.KennelName = "Dogs Paradise", breeder7.Story = "My Dogs Story", breeder7.Parents = "Great parents", breeder7.Boys = "3 pupies", breeder7.Girls = "2 puppies", breeder7.AddInfo = "Add Info about dogs", breeder7.City = "Chicago", breeder7.Zip = "60630", breeder7.State = "IL", breeder7.Certifications = "Certification 1", breeder7.VetServices = !0, breeder7.Insurances = "Insurance 1", breeder7.Shipping = !1, breeders.push(breeder7);
        var breeder8 = new BreederProfile;
        breeder8.FirstName = "Jon", breeder8.LastName = "Doe", breeder8.Website = "www.dogs.com", breeder8.Email = "breeder8@gmail.com", breeder8.Phone = "773-123-45-67", breeder8.KennelName = "Dogs Paradise", breeder8.Story = "My Dogs Story", breeder8.Parents = "Great parents", breeder8.Boys = "3 pupies", breeder8.Girls = "2 puppies", breeder8.AddInfo = "Add Info about dogs", breeder8.City = "Chicago", breeder8.Zip = "60630", breeder8.State = "IL", breeder8.Certifications = "Certification 1", breeder8.VetServices = !0, breeder8.Insurances = "Insurance 1", breeder8.Shipping = !1, breeders.push(breeder8);
        var breeder9 = new BreederProfile;
        return breeder9.FirstName = "Jon", breeder9.LastName = "Doe", breeder9.Website = "www.dogs.com", breeder9.Email = "breeder9@gmail.com", breeder9.Phone = "773-123-45-67", breeder9.KennelName = "Dogs Paradise", breeder9.Story = "My Dogs Story", breeder9.Parents = "Great parents", breeder9.Boys = "3 pupies", breeder9.Girls = "2 puppies", breeder9.AddInfo = "Add Info about dogs", breeder9.City = "Chicago", breeder9.Zip = "60630", breeder9.State = "IL", breeder9.Certifications = "Certification 1", breeder9.VetServices = !0, breeder9.Insurances = "Insurance 1", breeder9.Shipping = !1, breeders.push(breeder9), breeders
    }, GenerateCtrl.prototype.GenerateLookers = function () {
        var lookers = [], looker1 = new LookerProfile;
        looker1.FirstName = "Jon", looker1.LastName = "Doe", looker1.Email = "looker1@gmail.com", looker1.Phone = "773-123-45-67", looker1.City = "Chicago", looker1.Zip = "60630", looker1.State = "IL", lookers.push(looker1);
        var looker2 = new LookerProfile;
        looker2.FirstName = "Jon", looker2.LastName = "Doe", looker2.Email = "looker2@gmail.com", looker2.Phone = "773-123-45-67", looker2.City = "Chicago", looker2.Zip = "60630", looker2.State = "IL", lookers.push(looker2);
        var looker3 = new LookerProfile;
        looker3.FirstName = "Jon", looker3.LastName = "Doe", looker3.Email = "looker3@gmail.com", looker3.Phone = "773-123-45-67", looker3.City = "Chicago", looker3.Zip = "60630", looker3.State = "IL", lookers.push(looker3);
        var looker4 = new LookerProfile;
        looker4.FirstName = "Jon", looker4.LastName = "Doe", looker4.Email = "looker4@gmail.com", looker4.Phone = "773-123-45-67", looker4.City = "Chicago", looker4.Zip = "60630", looker4.State = "IL", lookers.push(looker4);
        var looker5 = new LookerProfile;
        looker5.FirstName = "Jon", looker5.LastName = "Doe", looker5.Email = "looker5@gmail.com", looker5.Phone = "773-123-45-67", looker5.City = "Chicago", looker5.Zip = "60630", looker5.State = "IL", lookers.push(looker5);
        var looker6 = new LookerProfile;
        looker6.FirstName = "Jon", looker6.LastName = "Doe", looker6.Email = "looker6@gmail.com", looker6.Phone = "773-123-45-67", looker6.City = "Chicago", looker6.Zip = "60630", looker6.State = "IL", lookers.push(looker6);
        var looker7 = new LookerProfile;
        looker7.FirstName = "Jon", looker7.LastName = "Doe", looker7.Email = "looker7@gmail.com", looker7.Phone = "773-123-45-67", looker7.City = "Chicago", looker7.Zip = "60630", looker7.State = "IL", lookers.push(looker7);
        var looker8 = new LookerProfile;
        looker8.FirstName = "Jon", looker8.LastName = "Doe", looker8.Email = "looker8@gmail.com", looker8.Phone = "773-123-45-67", looker8.City = "Chicago", looker8.Zip = "60630", looker8.State = "IL", lookers.push(looker8);
        var looker9 = new LookerProfile;
        looker9.FirstName = "Jon", looker9.LastName = "Doe", looker9.Email = "looker9@gmail.com", looker9.Phone = "773-123-45-67", looker9.City = "Chicago", looker9.Zip = "60630", looker9.State = "IL", lookers.push(looker9);
        var looker10 = new LookerProfile;
        return looker10.FirstName = "Jon", looker10.LastName = "Doe", looker10.Email = "looker10@gmail.com", looker10.Phone = "773-123-45-67", looker10.City = "Chicago", looker10.Zip = "60630", looker10.State = "IL", lookers.push(looker10), lookers
    }, GenerateCtrl
}(), HomeCtrl = function () {
    function HomeCtrl($rootScope, $popover, $scope, $modal, FinduserService, settings, $filter, $stateParams, $q, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        var _this = this;
        this.$rootScope = $rootScope, this.$popover = $popover, this.$scope = $scope, this.$modal = $modal, this.FinduserService = FinduserService, this.settings = settings, this.$filter = $filter, this.$stateParams = $stateParams, this.$q = $q, this.$firebase = $firebase, this.$firebaseSimpleLogin = $firebaseSimpleLogin, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.isLoggedIn = !1, $scope.lpShown = !0, $scope.rpShown = !0, $scope.registerPopover = function () {
            $scope.rpShown = !0, $scope.lpShown = !1
        }, $scope.loginPopover = function () {
            $scope.lpShown = !0, $scope.rpShown = !1
        }, this.Followings = [], $scope.searchLocation = {}, $scope.searchBreed = {}, $scope.username = {}, $scope.userExists = !1, $rootScope.$on("$stateChangeSuccess", function (event, toState) {
            this.url2 = toState.name
        }), $scope.home = this, $scope.usernameFb = {}, $scope.isBreederFb = {}, $scope.setUsernameFb = function (userNameFb, isBreederFb) {
            FinduserService.find(userNameFb).then(function () {
                $scope.userExists = !0, _this.ShowError(settings.userExists)
            }, function () {
                if (isBreederFb) {
                    var breederGenerator = new BreederGenerator;
                    breederGenerator.create($scope.home.FireProcess($scope.facebookUid), _this.MainUrl, _this.$firebase, userNameFb)
                } else {
                    var lookerGenerator = new LookerGenerator;
                    lookerGenerator.create($scope.home.FireProcess($scope.facebookUid), _this.MainUrl, _this.$firebase, userNameFb)
                }
                _this.Breedership(_this.FireProcess(userNameFb)), _this.nickName = userNameFb, _this.nickNameFire = _this.FireProcess(userNameFb), _this.userName = _this.$scope.facebookUid, _this.userNameFire = _this.FireProcess(_this.$scope.facebookUid), _this.isLoggedIn = !0, _this.isBreeder = isBreederFb, _this.$scope.modal.hide(), isBreederFb && _this.$state.go("user.profile.about1", {uname: _this.userName}), isBreederFb || _this.$state.go("looker.account", {uname: _this.userName}), _this.$scope.modal.hide()
            })
        }, $scope.register = function (email, pass, confpass, isBreeder) {
            return pass.length < 5 ? void _this.ShowError("Password should be not less than 5 symbols") : pass !== confpass ? void _this.ShowError("Passwords do not match") : void FinduserService.findByEmail(email).then(function () {
                $scope.userExists = !0, _this.ShowError(settings.userExists)
            }, function () {
                $scope.emailReg = email, $scope.passwordReg = pass, $scope.isNewBreederReg = isBreeder, $scope.username.val = email.split("@")[0], $scope.modalUser = $modal({scope: $scope, title: "Choose your username", template: "../views/modals/choose-username.html", show: !0})
            })
        }, $scope.setUsername = function (username) {
            FinduserService.find(username).then(function () {
                $scope.userExists = !0, _this.ShowError(settings.userExists)
            }, function () {
                $scope.home.auth.$createUser($scope.emailReg, $scope.passwordReg).then(function () {
                    if ($scope.isNewBreederReg) {
                        var breederGenerator = new BreederGenerator;
                        breederGenerator.create($scope.home.FireProcess($scope.emailReg), $scope.home.MainUrl, _this.$firebase, username)
                    } else {
                        var lookerGenerator = new LookerGenerator;
                        lookerGenerator.create($scope.home.FireProcess($scope.emailReg), $scope.home.MainUrl, _this.$firebase, username)
                    }
                    $scope.home.Signin($scope.emailReg, $scope.passwordReg)
                }, function (error) {
                    _this.ShowError(error)
                }), $scope.modalUser.hide()
            })
        }, $scope.fetchDog = function () {
            if (!_.isUndefined($scope.searchLocation.val) && $scope.searchLocation.val.length > 2) {
                var locationShort = _.where($scope.states, {name: $scope.searchLocation.val})[0];
                $scope.searchLocation.val = locationShort
            }
            $state.go("sniff.breeders", {breed: $scope.searchBreed.val, location: $scope.searchLocation.val})
        }, this.MainUrl = settings.mainUrl, this.MainRef = new Firebase(this.MainUrl), this.MainRefFire = $firebase(new Firebase(this.MainUrl));
        var breedsRef = $firebase(new Firebase(this.MainUrl + "breeds"));
        breedsRef.$on("value", function (snapshot) {
            var breeds = snapshot.snapshot.value;
            $scope.breeds = $filter("orderByPriority")(breeds)
        }), $scope.states = [
            {name: "ALABAMA", abbreviation: "AL"},
            {name: "ALASKA", abbreviation: "AK"},
            {name: "AMERICAN SAMOA", abbreviation: "AS"},
            {name: "ARIZONA", abbreviation: "AZ"},
            {name: "ARKANSAS", abbreviation: "AR"},
            {name: "CALIFORNIA", abbreviation: "CA"},
            {name: "COLORADO", abbreviation: "CO"},
            {name: "CONNECTICUT", abbreviation: "CT"},
            {name: "DELAWARE", abbreviation: "DE"},
            {name: "DISTRICT OF COLUMBIA", abbreviation: "DC"},
            {name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM"},
            {name: "FLORIDA", abbreviation: "FL"},
            {name: "GEORGIA", abbreviation: "GA"},
            {name: "GUAM", abbreviation: "GU"},
            {name: "HAWAII", abbreviation: "HI"},
            {name: "IDAHO", abbreviation: "ID"},
            {name: "ILLINOIS", abbreviation: "IL"},
            {name: "INDIANA", abbreviation: "IN"},
            {name: "IOWA", abbreviation: "IA"},
            {name: "KANSAS", abbreviation: "KS"},
            {name: "KENTUCKY", abbreviation: "KY"},
            {name: "LOUISIANA", abbreviation: "LA"},
            {name: "MAINE", abbreviation: "ME"},
            {name: "MARSHALL ISLANDS", abbreviation: "MH"},
            {name: "MARYLAND", abbreviation: "MD"},
            {name: "MASSACHUSETTS", abbreviation: "MA"},
            {name: "MICHIGAN", abbreviation: "MI"},
            {name: "MINNESOTA", abbreviation: "MN"},
            {name: "MISSISSIPPI", abbreviation: "MS"},
            {name: "MISSOURI", abbreviation: "MO"},
            {name: "MONTANA", abbreviation: "MT"},
            {name: "NEBRASKA", abbreviation: "NE"},
            {name: "NEVADA", abbreviation: "NV"},
            {name: "NEW HAMPSHIRE", abbreviation: "NH"},
            {name: "NEW JERSEY", abbreviation: "NJ"},
            {name: "NEW MEXICO", abbreviation: "NM"},
            {name: "NEW YORK", abbreviation: "NY"},
            {name: "NORTH CAROLINA", abbreviation: "NC"},
            {name: "NORTH DAKOTA", abbreviation: "ND"},
            {name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP"},
            {name: "OHIO", abbreviation: "OH"},
            {name: "OKLAHOMA", abbreviation: "OK"},
            {name: "OREGON", abbreviation: "OR"},
            {name: "PALAU", abbreviation: "PW"},
            {name: "PENNSYLVANIA", abbreviation: "PA"},
            {name: "PUERTO RICO", abbreviation: "PR"},
            {name: "RHODE ISLAND", abbreviation: "RI"},
            {name: "SOUTH CAROLINA", abbreviation: "SC"},
            {name: "SOUTH DAKOTA", abbreviation: "SD"},
            {name: "TENNESSEE", abbreviation: "TN"},
            {name: "TEXAS", abbreviation: "TX"},
            {name: "UTAH", abbreviation: "UT"},
            {name: "VERMONT", abbreviation: "VT"},
            {name: "VIRGIN ISLANDS", abbreviation: "VI"},
            {name: "VIRGINIA", abbreviation: "VA"},
            {name: "WASHINGTON", abbreviation: "WA"},
            {name: "WEST VIRGINIA", abbreviation: "WV"},
            {name: "WISCONSIN", abbreviation: "WI"},
            {name: "WYOMING", abbreviation: "WY"}
        ], this.auth = this.$firebaseSimpleLogin(this.MainRef), this.auth.$getCurrentUser().then(function (user) {
            _this.isLoggedIn = !0, null !== user && (_.isUndefined(user.email) && (user.email = user.id), _this.Breedership(_this.FireProcess(user.email)).then(function () {
                _this.userName = user.email, _this.isLoggedIn = !0, _this.userNameFire = _this.FireProcess(_this.userName)
            }))
        })
    }

    return HomeCtrl.prototype.FacebookSignin = function () {
        var _this = this;
        this.auth.$login("facebook", {rememberMe: !1}).then(function (user) {
            user ? (_this.$scope.facebookUid = user.id, _this.FinduserService.findByEmail(user.id).then(function (userProfile) {
                _this.nickName = userProfile.UserName, _this.nickNameFire = _this.FireProcess(_this.nickName), _this.userName = userProfile.Email, _this.userNameFire = _this.FireProcess(_this.userName), _this.isLoggedIn = !0, _this.isBreeder = userProfile.isBreeder, 1 == _this.isBreeder && _this.$state.go("user.profile.about1", {uname: userProfile.Email}), 0 == _this.isBreeder && _this.$state.go("looker.account", {uname: userProfile.Email})
            }, function () {
                _this.$scope.modal = _this.$modal({scope: _this.$scope, title: "Choose username", template: "../views/modals/choose-username-facebook.html", show: !0})
            })) : (_this.isLoggedIn = !1, _this.auth.user = null)
        }, function (error) {
            _this.ShowError(error)
        })
    }, HomeCtrl.prototype.Signin = function (email, pass) {
        var _this = this;
        this.auth = this.$firebaseSimpleLogin(this.MainRef), this.auth.$login("password", {email: email, password: pass}).then(function (user) {
            _.isUndefined(_this.$scope.modalLogin) || _this.$scope.modalLogin.hide(), _this.Breedership(_this.FireProcess(user.email)).then(function () {
                _this.userName = user.email, _this.isLoggedIn = !0, _this.userNameFire = _this.FireProcess(_this.userName), _this.isLoggedIn = !0, _this.isBreeder === !0 && _this.$state.go("user.profile.about1", {uname: user.email}, {reload: !0}), _this.isBreeder === !1 && _this.$state.go("looker.account", {uname: user.email}, {reload: !0})
            })
        }, function () {
            _this.ShowError("Your login or password was entered incorrectly."), _this.$scope.incorrectCredentials = !0
        })
    }, HomeCtrl.prototype.Breedership = function (email) {
        var _this = this, d = this.$q.defer();
        "no" == email && d.resolve();
        var breederUrl = this.MainUrl + "breeders/" + email, lookerUrl = this.MainUrl + "lookers/" + email, breederRef = this.$firebase(new Firebase(breederUrl)), lookerRef = this.$firebase(new Firebase(lookerUrl));
        return breederRef.$on("value", function (snapshot) {
            var breeder = snapshot.snapshot.value;
            if (!_.isNull(breeder) && !_.isUndefined(breeder.profile)) {
                breeder.hasOwnProperty("followings") && (_this.Followings = _.map(_.keys(breeder.followings), function (key) {
                    return _this.FireUnProcess(key)
                })), _this.nickName = breeder.profile.UserName, _this.nickNameFire = _this.FireProcess(_this.nickName), _this.isBreeder = !0, _this.isAdmin = breeder.profile.isAdmin;
                var subscriptionUrl = _this.MainUrl + "breeders/" + _this.FireProcess(breeder.profile.Email) + "/subscriptions", subscriptionRef = _this.$firebase(new Firebase(subscriptionUrl));
                subscriptionRef.$on("value", function (snapshot) {
                    var subscription = snapshot.snapshot.value;
                    _this.subscription = _this.$filter("orderByPriority")(subscription)[0]
                }), d.resolve()
            }
        }), lookerRef.$on("value", function (snapshot) {
            var looker = snapshot.snapshot.value;
            _.isNull(looker) || _.isUndefined(looker.profile) || (_this.nickName = looker.profile.UserName, _this.nickNameFire = _this.FireProcess(_this.nickName), _this.isBreeder = !1, looker.hasOwnProperty("followings") && (_this.Followings = _.map(_.keys(looker.followings), function (key) {
                return _this.FireUnProcess(key)
            })), d.resolve())
        }), d.promise
    }, HomeCtrl.prototype.followUser = function (loggedUser, follower) {
        var _this = this;
        this.DataService.followUser(loggedUser, follower, this.$scope.home.isBreeder).then(function () {
            _this.$scope.home.AddToFollowings(follower)
        })
    }, HomeCtrl.prototype.unFollowUser = function (loggedUser, follower) {
        var _this = this;
        this.DataService.unFollowUser(loggedUser, follower, this.$scope.home.isBreeder).then(function () {
            _this.$scope.home.RemoveFromFollowings(follower)
        })
    }, HomeCtrl.prototype.AddToFollowings = function (userName) {
        this.Followings.push(this.FireUnProcess(userName))
    }, HomeCtrl.prototype.RemoveFromFollowings = function (userName) {
        var index = this.Followings.indexOf(this.FireUnProcess(userName));
        this.Followings.splice(index, 1)
    }, HomeCtrl.prototype.FireProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\./g, "(p)")
    }, HomeCtrl.prototype.FireUnProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\(p\)/g, ".")
    }, HomeCtrl.prototype.animationDirection = function (menuIndex) {
        return menuIndex > this.menuIndex ? "slide-left" : "slide-right"
    }, HomeCtrl.prototype.Logout = function () {
        this.auth.$logout(), this.isLoggedIn = !1, this.auth.user = null, this.userName = null, this.userNameFire = null, this.isOwner = null, this.isAdmin = null, this.nickName = null, this.nickNameFire = null, this.$state.go("home", {}, {reload: !0})
    }, HomeCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, HomeCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, HomeCtrl.prototype.Ownership = function (notOwner) {
        if (1 == notOwner)return this.isOwner = !1, !1;
        var breederUserName = this.$stateParams.uname;
        return null === this.auth.user ? !1 : (this.isOwner = breederUserName === this.auth.user.email || breederUserName === this.auth.user.id, this.isOwner)
    }, HomeCtrl.prototype.navigate = function (menuIndex) {
        this.$scope.slide = this.animationDirection(menuIndex), 1 == menuIndex && (this.menuIndex = 1, this.$state.go("user.profile.about1")), 2 == menuIndex && (this.menuIndex = 2, this.$state.go("user.profile.photos2")), 3 == menuIndex && (this.url = "puppies", this.menuIndex = 3, this.$state.go("user.profile.puppies3")), 4 == menuIndex && (this.url = "details", this.menuIndex = 4, this.$state.go("user.profile.details4")), 5 == menuIndex && (this.url = "testimonials", this.menuIndex = 5, this.$state.go("user.profile.testimonials5"))
    }, HomeCtrl
}(), IndexCtrl = function () {
    function IndexCtrl($scope, $firebase, $filter, settings, $location, $stateParams, $rootScope, $window, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope, this.$firebase = $firebase, this.$filter = $filter, this.settings = settings, this.$rootScope = $rootScope, this.$window = $window, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, $scope.index = this, $scope.home.IsSearchHidden = !1, $scope.home.url = "about", $scope.home.hideMenu = !1, $scope.slide = "", this.spinner = !0;
        var breederProfile, requestEmail = $stateParams.uname, requestEmailFire = $scope.home.FireProcess(requestEmail), requestedBreederRef = $firebase(new Firebase($scope.home.MainUrl + "breeders/" + requestEmailFire + "/profile"));
        requestedBreederRef.$on("value", function (snapshot) {
            breederProfile = snapshot.snapshot.value, _this.BreederProfile = breederProfile, _this.error = !1, _this.BreederProfile = breederProfile, _this.CopyProfileService.SetProfile(breederProfile), _this.BreederProfileEdit = CopyProfileService.GetProfileClone(), _this.spinner = !1, $scope.home.isLoadFinished = !0
        }), this.$scope.home.auth.$getCurrentUser().then(function (user) {
            if (!_.isNull(user)) {
                _.isUndefined(user.email) && (user.email = user.id), _this.spinner = !1;
                var viewAsUser;
                _.isUndefined($stateParams.asuser) || "/as-user" != $stateParams.asuser || (viewAsUser = !0);
                var ownership = $scope.home.Ownership(viewAsUser);
                if (ownership) {
                    _this.subscription = $scope.home.subscription;
                    var messagesUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/messages", messagesRef = $firebase(new Firebase(messagesUrl)), galleriesUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/galleries", galleriesRef = $firebase(new Firebase(galleriesUrl));
                    galleriesRef.$on("value", function (snapshot) {
                        _this.galleriesNumber = _.values(snapshot.snapshot.value).length
                    });
                    var littersUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/litters", littersRef = $firebase(new Firebase(littersUrl));
                    littersRef.$on("value", function (snapshot) {
                        _this.littersNumber = _.values(snapshot.snapshot.value).length
                    }), messagesRef.$on("value", function (snapshot) {
                        var messages = snapshot.snapshot.value, messagesArr = $filter("orderByPriority")(messages);
                        _this.messagesNumber = messagesArr.length;
                        var unReadMessages = _.where(messagesArr, {isUnread: !0});
                        _this.unReadMessagesNumber = unReadMessages.length
                    })
                }
                var feedbacksUrl = $scope.home.MainUrl + "breeders/" + _this.$scope.home.FireProcess(requestEmail) + "/feedbacks", feedbacksRef = $firebase(new Firebase(feedbacksUrl)), feedbacksKeys = feedbacksRef.$getIndex(), total = 0, numb = 0;
                feedbacksKeys.forEach(function (key) {
                    var feedback = feedbacksRef[key];
                    feedback.hasOwnProperty("Evaluation") && feedback.Evaluation > 0 && (total += feedback.Evaluation, numb++)
                }), _this.rating = numb > 0 ? Math.ceil(total / numb) : 0
            }
        })
    }

    return IndexCtrl.prototype.GetBreederName = function () {
        return this.BreederProfile
    }, IndexCtrl.prototype.SaveKennelName = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName, breederProfileOriginal.Story = this.BreederProfileEdit.Story, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SavePersonalInfo = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.KennelName = this.BreederProfileEdit.KennelName, breederProfileOriginal.Website = this.BreederProfileEdit.Website, breederProfileOriginal.Email = this.BreederProfileEdit.Email, breederProfileOriginal.Phone = this.BreederProfileEdit.Phone, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveLocation = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.City = this.BreederProfileEdit.City, breederProfileOriginal.Zip = this.BreederProfileEdit.Zip, breederProfileOriginal.State = this.BreederProfileEdit.State, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.SaveSpecifics = function () {
        var breederProfileOriginal = this.CopyProfileService.GetProfileClone();
        breederProfileOriginal.Certifications = this.BreederProfileEdit.Certifications, breederProfileOriginal.Insurances = this.BreederProfileEdit.Insurances, this.Save(breederProfileOriginal)
    }, IndexCtrl.prototype.ShowError = function (errorMessage) {
        this.toastr.error(errorMessage)
    }, IndexCtrl.prototype.ShowSuccess = function (successMessage) {
        this.toastr.success(successMessage)
    }, IndexCtrl.prototype.Clone = function () {
        this.BreederProfileCopy = this.CopyProfileService.GetProfileClone()
    }, IndexCtrl.prototype.GetClone = function () {
        return this.CopyProfileService.GetProfileClone()
    }, IndexCtrl.prototype.UpdateBreederProfile = function (breederProfile) {
        this.BreederProfile = breederProfile
    }, IndexCtrl.prototype.Save = function (breederProfile) {
        var _this = this;
        breederProfile.Location = "" != breederProfile.City && "" != breederProfile.State ? breederProfile.City + ", " + breederProfile.State : "", this.DataService.updateProfile(breederProfile).then(function () {
            _this.CopyProfileService.SetProfile(breederProfile), _this.UpdateBreederProfile(breederProfile), _this.ShowSuccess(_this.settings.dataSaved)
        }, function () {
            _this.ShowError(_this.settings.dbError)
        })
    }, IndexCtrl
}(), LitterInfoCtrl = function () {
    function LitterInfoCtrl($scope, $modal, $stateParams, $firebase, $state, toastr, DataService) {
        this.$scope = $scope, this.$modal = $modal, this.$stateParams = $stateParams, this.$firebase = $firebase, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.litterInfo = this, $scope.files = [];
        var litterId = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var litterUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/litters/" + litterId;
                $scope.l = $firebase(new Firebase(litterUrl))
            })
        }), $scope.saveLitter = function () {
            var photos = $scope.l.$child("Photos");
            $scope.files.forEach(function (photo) {
                photos.$add(photo)
            }), $scope.l.$save().then(function () {
                $state.go("^")
            })
        }
    }

    return LitterInfoCtrl.prototype.deleteLitter = function () {
        var _this = this, modalInstance = this.$modal.open({template: '<div><div class="modal-body">Delete this Litter?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div></div>', size: "sm", controller: function ($scope, $modalInstance) {
            $scope.ok = function () {
                $modalInstance.close(!0)
            }, $scope.cancel = function () {
                $modalInstance.close(!1)
            }
        }});
        modalInstance.result.then(function (confirmation) {
            confirmation && (_this.$scope.litter.$remove(), _this.$state.go("^"))
        })
    }, LitterInfoCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LitterInfoCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LitterInfoCtrl
}(), LoginCtrl = function () {
    function LoginCtrl($scope, $firebase, $firebaseSimpleLogin, $state, toastr, DataService) {
        this.$scope = $scope, this.$firebase = $firebase, this.$firebaseSimpleLogin = $firebaseSimpleLogin, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.login = this, $scope.home.IsSearchHidden = !1, this.email = "", this.pass = "123456"
    }

    return LoginCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LoginCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LoginCtrl
}(), LookerAccountCtrl = function () {
    function LookerAccountCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.lookerAccount = this
    }

    return LookerAccountCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LookerAccountCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LookerAccountCtrl
}(), LookerAccountEditCtrl = function () {
    function LookerAccountEditCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.lookerAccountEdit = this
    }

    return LookerAccountEditCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LookerAccountEditCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LookerAccountEditCtrl
}(), LookerCtrl = function () {
    function LookerCtrl($scope, $firebase, $stateParams, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope, this.$firebase = $firebase, this.$stateParams = $stateParams, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.ResetAllFields = function () {
            _this.$scope.looker = ""
        }, $scope.home.IsSearchHidden = !1, $scope.lookerCtrl = this;
        var lookerEmail = this.$stateParams.uname, lookerUrl = $scope.home.MainUrl + "lookers/" + $scope.home.FireProcess(lookerEmail);
        $scope.looker = $firebase(new Firebase(lookerUrl)), $scope.save = function () {
            $scope.looker.$save()
        }
    }

    return LookerCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LookerCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LookerCtrl
}(), LookerProfileCtrl = function () {
    function LookerProfileCtrl($scope, $firebase, $stateParams, $state, toastr, DataService) {
        this.$scope = $scope, this.$firebase = $firebase, this.$stateParams = $stateParams, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.lprofile = this, this.lookersUrl = "https://torid-fire-6526.firebaseio.com/lookers/";
        var lookerEmail = this.$stateParams.uname, lookerUrl = this.lookersUrl + $scope.home.FireProcess(lookerEmail);
        console.log(lookerUrl), $scope.looker = $firebase(new Firebase(lookerUrl))
    }

    return LookerProfileCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LookerProfileCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LookerProfileCtrl
}(), LookingForDogCtrl = function () {
    function LookingForDogCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.lookingForDog = this, $scope.home.IsSearchHidden = !0
    }

    return LookingForDogCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, LookingForDogCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, LookingForDogCtrl
}(), ManageBreederAccountCtrl = function () {
    function ManageBreederAccountCtrl($scope, settings, $state, toastr, $firebase) {
        var _this = this;
        this.$scope = $scope, this.settings = settings, this.$state = $state, this.toastr = toastr, this.$firebase = $firebase, $scope.manageBreederAccount = this, this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                var subscriptionUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/subscriptions";
                $scope.subscription = $firebase(new Firebase(subscriptionUrl)), $scope.subscription.$on("value", function (snapshot) {
                    $scope.hasSubscription = !_.isEmpty(snapshot.snapshot.value)
                });
                var breederUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email);
                $scope.breeder = $firebase(new Firebase(breederUrl))
            })
        }), $scope.remove = function () {
            $scope.breeder.$remove().then(function () {
                $scope.home.Logout()
            })
        }, $scope.cancelSubscription = function () {
            $scope.subscription.$remove().then(function () {
                _this.ShowSuccess(_this.settings.delSubscriptionNotice)
            })
        }, $scope.popoverCancelSubscription = {title: "Deactivate your subscription plan?", template: "../../views/modals/cancel-subscription.html"}
    }

    return ManageBreederAccountCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, ManageBreederAccountCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, ManageBreederAccountCtrl
}(), MessagesCtrl = function () {
    function MessagesCtrl($scope, FinduserService, $firebase, settings, $filter, $firebaseSimpleLogin, $modal, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope, this.FinduserService = FinduserService, this.$firebase = $firebase, this.settings = settings, this.$filter = $filter, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.noMessages = settings.noMessages, $scope.noSuchUser = !1, $scope.messages = this, $scope.reply = {}, $scope.home.hideMenu = !0, $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var type, messagesUrl = $scope.home.MainUrl;
                $scope.home.isBreeder === !0 && (type = "breeders/"), $scope.home.isBreeder === !1 && (type = "lookers/"), messagesUrl = messagesUrl + type + $scope.home.FireProcess(user.email) + "/messages", _this.messagesRef = $firebase(new Firebase(messagesUrl)), _this.fireMessages = _this.messagesRef, _this.SetSelectedUser(0)
            })
        })
    }

    return MessagesCtrl.prototype.Delete = function () {
        var _this = this;
        this.DataService.deleteConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _.where(_this.fireMessages, {isTrash: !1, userName: _this.selectedUser.userName}).forEach(function (message) {
                message.isTrash = !0
            }), _this.SetSelectedUser(0)
        })
    }, MessagesCtrl.prototype.Recover = function () {
        var _this = this;
        this.DataService.recoverConversation(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _.where(_this.fireMessages, {isTrash: !0, userName: _this.selectedUser.userName}).forEach(function (message) {
                message.isTrash = !1
            }), _this.SetSelectedUser(0)
        })
    }, MessagesCtrl.prototype.DeleteForever = function () {
        var _this = this;
        this.DataService.deleteForever(this.$scope.home.userName, this.selectedUser.userName, this.$scope.home.isBreeder).then(function () {
            _this.fireMessages = _.without(_this.fireMessages, _.findWhere(_this.fireMessages, {isTrash: !0, userName: _this.selectedUser.userName})), _this.SetSelectedUser(0)
        })
    }, MessagesCtrl.prototype.SendNewMessage = function (to, body, levelUp) {
        var _this = this;
        this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                _this.FinduserService.find(to).then(function (userToProfile) {
                    _this.$scope.home.isBreeder === !0 && _this.DataService.sendReply(_this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body, !0).then(function () {
                    }), _this.$scope.home.isBreeder === !1 && _this.DataService.sendLookerReply(_this.$scope.home.userName, userToProfile.Email, userToProfile.UserName, body, !0).then(function () {
                    }), userToProfile.isBreeder === !0 && _this.DataService.sendReply(userToProfile.Email, _this.$scope.home.userName, _this.$scope.home.nickName, body, !1).then(function () {
                        _this.SetSelectedUser(0), levelUp && _this.$state.go("^"), _this.$scope.reply.body = "", _this.ShowSuccess(_this.settings.messageSuccessNotice)
                    }), userToProfile.isBreeder === !1 && _this.DataService.sendLookerReply(userToProfile.Email, _this.$scope.home.userName, _this.$scope.home.nickName, body, !1).then(function () {
                        _this.SetSelectedUser(0), levelUp && _this.$state.go("^"), _this.$scope.note.body = "", _this.$scope.note.to = "", _this.$scope.reply.body = "", _this.ShowSuccess(_this.settings.messageSuccessNotice)
                    })
                }, function () {
                    _this.ShowError(_this.settings.noSuchUser), _this.$scope.noSuchUser = !0
                })
            })
        })
    }, MessagesCtrl.prototype.SetSelectedUser = function (arrIndex) {
        var _this = this;
        this.selectedUserIndex = arrIndex;
        var notes = this.fireMessages;
        notes = _.sortBy(notes, function (note) {
            return-note.sent
        });
        var userNames = _.map(_.uniq(_.filter(notes, function (note) {
            return _.isNull(note) ? void 0 : note.isTrash === _this.isTrash
        })), function (message) {
            return{userName: message.userName, nickName: message.nickName}
        });
        userNames = _.uniq(userNames, !1, function (user) {
            return user.userName
        }), this.selectedUser = userNames[this.selectedUserIndex], _.isUndefined(this.fireMessages) || _.isUndefined(this.selectedUser) || (this.messagesRef.$getIndex().forEach(function (key) {
            var message = _this.messagesRef[key];
            message.nickName == _this.selectedUser.nickName && (message.isUnread = !1)
        }), this.messagesRef.$save())
    }, MessagesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, MessagesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, MessagesCtrl
}(), PaymentCancelAnnuallyCtrl = function () {
    function PaymentCancelAnnuallyCtrl($scope, $state, toastr, $firebase) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.$firebase = $firebase, $scope.paymentCancelAnnually = this
    }

    return PaymentCancelAnnuallyCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PaymentCancelAnnuallyCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PaymentCancelAnnuallyCtrl
}(), PaymentCancelCtrl = function () {
    function PaymentCancelCtrl($scope, $state, toastr, $firebase) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.$firebase = $firebase, $scope.paymentCancel = this
    }

    return PaymentCancelCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PaymentCancelCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PaymentCancelCtrl
}(), PaymentSuccessAnnuallyCtrl = function () {
    function PaymentSuccessAnnuallyCtrl($scope, $filter, settings, $state, toastr, PlankeeperService, $firebase) {
        var _this = this;
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.PlankeeperService = PlankeeperService, this.$firebase = $firebase, $scope.paymentSuccess = this, $scope.startNewPlan = function (userName, planName) {
            var subscriptionsUrl = $scope.home.MainUrl + "subscriptions", plansUrl = subscriptionsUrl + "/plans", featuresUrl = subscriptionsUrl + "/features", featuresRef = $firebase(new Firebase(featuresUrl));
            featuresRef.$on("value", function (snapshot) {
                var expirationDate, months, featuresFire = snapshot.snapshot.value, feautures = $filter("orderByPriority")(featuresFire), today = new Date, plansRef = $firebase(new Firebase(plansUrl));
                plansRef.$on("value", function (snapshot) {
                    var plans = snapshot.snapshot.value, plansArr = $filter("orderByPriority")(plans);
                    plansArr.forEach(function (planElement) {
                        if (planName == planElement.name) {
                            if (planElement.hasOwnProperty("comment")) {
                                var comments = planElement.comment.split(" ");
                                comments.forEach(function (comment) {
                                    var commentParsed = parseInt(comment);
                                    if (!_.isNaN(commentParsed)) {
                                        months = commentParsed;
                                        var days = 31 * months;
                                        expirationDate = new Date(today.getTime() + 24 * days * 60 * 60 * 1e3)
                                    }
                                })
                            }
                            "Monthly" == planElement.name && (expirationDate = new Date(today.getTime() + 2592e6)), "Annually" == planElement.name && (expirationDate = new Date(today.getTime() + 31536e6));
                            var userSubscriptions = {name: planElement.name, startDate: new Date(Date.now()), expirationDate: expirationDate};
                            feautures.forEach(function (feauture) {
                                var feautureRestriction, feautureName = feauture.name, keys = _.keys(feauture);
                                keys.forEach(function (key) {
                                    key.toLowerCase() == planName.toLocaleLowerCase() && (feautureRestriction = feauture[key])
                                }), userSubscriptions[feautureName] = feautureRestriction
                            });
                            var breederUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(userName) + "/subscriptions";
                            console.log(breederUrl);
                            var breederRef = $firebase(new Firebase(breederUrl));
                            breederRef.$remove(), breederRef.$add(userSubscriptions).then(function () {
                                toastr.success(settings.annualSubscriptionNotice)
                            })
                        }
                    })
                })
            })
        }, this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                $scope.startNewPlan(user.email, "Annually"), $state.go("user.profile.about1", {uname: user.email})
            })
        })
    }

    return PaymentSuccessAnnuallyCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PaymentSuccessAnnuallyCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PaymentSuccessAnnuallyCtrl
}(), PaymentSuccessCtrl = function () {
    function PaymentSuccessCtrl($scope, $filter, settings, $state, toastr, PlankeeperService, $firebase) {
        var _this = this;
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.PlankeeperService = PlankeeperService, this.$firebase = $firebase, $scope.paymentSuccess = this, $scope.startNewPlan = function (userName, planName) {
            var subscriptionsUrl = $scope.home.MainUrl + "subscriptions", plansUrl = subscriptionsUrl + "/plans", featuresUrl = subscriptionsUrl + "/features", featuresRef = $firebase(new Firebase(featuresUrl));
            featuresRef.$on("value", function (snapshot) {
                var expirationDate, months, featuresFire = snapshot.snapshot.value, feautures = $filter("orderByPriority")(featuresFire), today = new Date, plansRef = $firebase(new Firebase(plansUrl));
                plansRef.$on("value", function (snapshot) {
                    var plans = snapshot.snapshot.value, plansArr = $filter("orderByPriority")(plans);
                    plansArr.forEach(function (planElement) {
                        if (planName == planElement.name) {
                            if (planElement.hasOwnProperty("comment")) {
                                var comments = planElement.comment.split(" ");
                                comments.forEach(function (comment) {
                                    var commentParsed = parseInt(comment);
                                    if (!_.isNaN(commentParsed)) {
                                        months = commentParsed;
                                        var days = 31 * months;
                                        expirationDate = new Date(today.getTime() + 24 * days * 60 * 60 * 1e3)
                                    }
                                })
                            }
                            "Monthly" == planElement.name && (expirationDate = new Date(today.getTime() + 2592e6)), "Annually" == planElement.name && (expirationDate = new Date(today.getTime() + 31536e6));
                            var userSubscriptions = {name: planElement.name, startDate: new Date(Date.now()), expirationDate: expirationDate};
                            feautures.forEach(function (feauture) {
                                var feautureRestriction, feautureName = feauture.name, keys = _.keys(feauture);
                                keys.forEach(function (key) {
                                    key.toLowerCase() == planName.toLowerCase() && (feautureRestriction = feauture[key])
                                }), userSubscriptions[feautureName] = feautureRestriction
                            });
                            var breederUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(userName) + "/subscriptions";
                            console.log(breederUrl);
                            var breederRef = $firebase(new Firebase(breederUrl));
                            breederRef.$remove(), breederRef.$add(userSubscriptions).then(function () {
                                toastr.success(settings.monthlySubscriptionNotice)
                            })
                        }
                    })
                })
            })
        }, this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                $scope.startNewPlan(user.email, "Monthly"), $state.go("user.profile.about1", {uname: user.email})
            })
        })
    }

    return PaymentSuccessCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PaymentSuccessCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PaymentSuccessCtrl
}(), PhotosCtrl = function () {
    function PhotosCtrl($scope, $filter, $firebase, $stateParams, $state, settings) {
        var _this = this;
        this.$scope = $scope, this.$filter = $filter, this.$firebase = $firebase, this.$state = $state, $scope.home.menuIndex = 2, $scope.noGalleryNotice = settings.noGalleryNotice, $scope.$watch("photosCtrl.GalleriesNew", function () {
            for (var i = 0; i < _this.GalleriesNew.length; i++) {
                var gallery = _this.GalleriesNew[i];
                if (!("undefined" != typeof gallery.Title && gallery.Title.length < 250)) {
                    _this.$scope.isOk = !0;
                    break
                }
                _this.$scope.isOk = !1
            }
        }, !0);
        var newGallery = new Gallery;
        this.GalleriesNew = new Array(newGallery), $scope.photosCtrl = this, $scope.home.url = "photos";
        var galleriesUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess($stateParams.uname) + "/galleries";
        $scope.galleries = $firebase(new Firebase(galleriesUrl)), $scope.newGalleries = [], this.$scope.home.auth.$getCurrentUser().then(function (user) {
            return null == user ? void($scope.home.isLoadFinished = !0) : void _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                $scope.home.isLoadFinished = !0
            })
        }), $scope.onNewFileSelect = function ($files, galleryId) {
            var photos = $scope.galleries.$child(galleryId).$child("photos");
            console.log(galleryId), $files.forEach(function (file) {
                var reader = new FileReader;
                reader.onload = function (loadEvent) {
                    var image = loadEvent.target.result;
                    photos.$add({caption: "picture1", file64: image})
                }, reader.readAsDataURL(file)
            }), photos.$save()
        }
    }

    return PhotosCtrl.prototype.saveNewGalleries = function () {
        var _this = this;
        this.$scope.newGalleries.forEach(function (gallery) {
            "" === gallery.Title && (gallery.Title = "New Gallery");
            var galleryShort = _.omit(gallery, "Photos");
            _this.$scope.galleries.$add(galleryShort).then(function (key) {
                gallery.Photos.forEach(function (photo) {
                    _this.$scope.galleries.$child(key.name()).$child("Photos").$add(_.omit(photo, "isSized"))
                })
            })
        }), this.$scope.newGalleries = []
    }, PhotosCtrl.prototype.cancelGalleries = function () {
        this.$scope.newGalleries = []
    }, PhotosCtrl.prototype.addGallery = function () {
        this.$scope.addGallTemplate = !0;
        var gallery = new Gallery;
        gallery.Title = "My New Photo Gallery", gallery.isTemp = !0, this.$scope.newGalleries.unshift(gallery)
    }, PhotosCtrl
}(), PuppiesCtrl = function () {
    function PuppiesCtrl($scope, $firebase, $modal, $stateParams, $state, toastr, DataService, CopyProfileService, settings) {
        var _this = this;
        this.$scope = $scope, this.$firebase = $firebase, this.$modal = $modal, this.$stateParams = $stateParams, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, this.settings = settings, $scope.noLitterNotice = settings.noLitterNotice;
        var username = $scope.home.FireProcess($stateParams.uname), litterUrl = $scope.home.MainUrl + "breeders/" + username + "/litters";
        $scope.litters = $firebase(new Firebase(litterUrl)), this.$scope.home.auth.$getCurrentUser().then(function (user) {
            _this.$scope.home.Breedership(_this.$scope.home.FireProcess(user.email)).then(function () {
                $scope.home.isLoadFinished = !0
            })
        }), this.LittersNew = [], $scope.home.url = "puppies", $scope.puppies = this, $scope.isOk = !1, $scope.$watch("puppies.LittersNew", function () {
            for (var i = 0; i < _this.LittersNew.length; i++) {
                var litter = _this.LittersNew[i];
                if (!("undefined" != typeof litter.Title && litter.Title.length < 250 && "undefined" != typeof litter.Puppies && litter.Puppies.length < 250 && "undefined" != typeof litter.Colors && litter.Colors.length < 250)) {
                    _this.$scope.isOk = !0;
                    break
                }
                _this.$scope.isOk = !1
            }
        }, !0)
    }

    return PuppiesCtrl.prototype.addNewLitter = function () {
        this.LittersNew.unshift(new Litter)
    }, PuppiesCtrl.prototype.saveNewLitters = function () {
        var _this = this;
        this.LittersNew.forEach(function (litter) {
            var litterShort = _.omit(litter, "Photos");
            _this.$scope.litters.$add(litterShort).then(function (key) {
                litter.Photos.forEach(function (photo) {
                    _this.$scope.litters.$child(key.name()).$child("Photos").$add(_.omit(photo, "isSized"))
                })
            })
        }), this.LittersNew = []
    }, PuppiesCtrl.prototype.cancelLitters = function () {
        this.LittersNew = []
    }, PuppiesCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PuppiesCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PuppiesCtrl
}(), PuppiesLitterCtrl = function () {
    function PuppiesLitterCtrl($scope, $state, toastr, DataService, CopyProfileService, settings) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, this.settings = settings, $scope.puppiesLitter = this
    }

    return PuppiesLitterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, PuppiesLitterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, PuppiesLitterCtrl
}(), RegisterCtrl = function () {
    function RegisterCtrl($scope, $modal, settings, $firebase, $filter, $state, toastr, FinduserService) {
        this.$scope = $scope, this.$firebase = $firebase, this.$state = $state, this.toastr = toastr, this.FinduserService = FinduserService, $scope.register = this, $scope.home.IsSearchHidden = !1, this.isBreeder = !1
    }

    return RegisterCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, RegisterCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, RegisterCtrl
}(), SubscriptionsCtrl = function () {
    function SubscriptionsCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.subscriptions = this
    }

    return SubscriptionsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, SubscriptionsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, SubscriptionsCtrl
}(), TermsCtrl = function () {
    function TermsCtrl($scope, $state, toastr, DataService) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.terms = this, $scope.home.IsSearchHidden = !1, $scope.home.IsHome = !1
    }

    return TermsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, TermsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, TermsCtrl
}(), TestimonialsCtrl = function () {
    function TestimonialsCtrl($scope, $stateParams, settings, $filter, $firebase, $modal, $state, toastr, DataService, CopyProfileService) {
        var _this = this;
        this.$scope = $scope, this.settings = settings, this.$firebase = $firebase, this.$modal = $modal, this.$state = $state, this.toastr = toastr, this.DataService = DataService, this.CopyProfileService = CopyProfileService, $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var feedbackUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess($stateParams.uname) + "/feedbacks";
                $scope.feedbacks = $firebase(new Firebase(feedbackUrl))
            })
        }), $scope.rating = 0, this.FeedbacksNew = [], $scope.home.url = "testimonials", $scope.testimonials = this, $scope.isOk = !1, $scope.$watch("testimonials.FeedbacksNew", function () {
            for (var i = 0; i < _this.FeedbacksNew.length; i++) {
                var feedback = _this.FeedbacksNew[i];
                if (!(feedback.ClientName.length > 0 && feedback.FeedbackBody.length > 0) && feedback.ClientName.length < 250 && feedback.FeedbackBody.length < 500) {
                    _this.$scope.isOk = !0;
                    break
                }
                _this.$scope.isOk = !1
            }
        }, !0), $scope.remove = function (key) {
            _this.$scope.feedbacks.$remove(key)
        }
    }

    return TestimonialsCtrl.prototype.cancelNew = function () {
        this.FeedbacksNew = []
    }, TestimonialsCtrl.prototype.addNewTestimonial = function () {
        var feedback = new Feedback;
        this.$scope.home.isOwner || (feedback.ClientName = this.$scope.home.nickName), this.FeedbacksNew.unshift(feedback)
    }, TestimonialsCtrl.prototype.saveNewTestimonials = function () {
        var _this = this;
        this.FeedbacksNew.forEach(function (feedback) {
            _this.$scope.feedbacks.$add(feedback)
        }), this.FeedbacksNew = [], this.ShowSuccess(this.settings.dataSaved)
    }, TestimonialsCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, TestimonialsCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, TestimonialsCtrl
}(), UpgradeCtrl = function () {
    function UpgradeCtrl($scope, $state, toastr, $firebase) {
        this.$scope = $scope, this.$state = $state, this.toastr = toastr, this.$firebase = $firebase, $scope.upgrade = this
    }

    return UpgradeCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, UpgradeCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, UpgradeCtrl
}(), UserManagementCtrl = function () {
    function UserManagementCtrl($scope, settings, $filter, $modal, $timeout, $firebase, $state, toastr, DataService) {
        var _this = this;
        this.$scope = $scope, this.$modal = $modal, this.$firebase = $firebase, this.$state = $state, this.toastr = toastr, this.DataService = DataService, $scope.message = {}, this.urlRef = $scope.home.MainUrl + "breeders", this.breeders = $firebase(new Firebase(this.urlRef)), this.urlRef = $scope.home.MainUrl + "lookers", this.lookers = $firebase(new Firebase(this.urlRef)), $scope.management = this, $scope.showMessages = [], $scope.plan = {}, $scope.modal = {title: "New Message", show: !0}, $scope.popoverDelete = {title: "Delete Forever?", template: "../../views/modals/delete-confirmation.html"}, $scope.popoverPlans = {title: "Breeder Plans", template: "../../views/modals/subscriptions.html"}, $scope.changeS = function (plan) {
            $scope.plan.val = plan
        }, $scope.changePlan = function (userName, plan) {
            if (userName = $scope.home.FireProcess(userName), 0 == plan) {
                var breederUrl = $scope.home.MainUrl + "breeders/" + userName + "/subscriptions", breederRef = $firebase(new Firebase(breederUrl));
                breederRef.$remove(), toastr.success("Subscription plan has been changed.")
            } else $scope.startNewPlan(userName, plan)
        }, $scope.startNewPlan = function (userName, planName) {
            var subscriptionsUrl = $scope.home.MainUrl + "subscriptions", plansUrl = subscriptionsUrl + "/plans", featuresUrl = subscriptionsUrl + "/features", featuresRef = $firebase(new Firebase(featuresUrl));
            featuresRef.$on("value", function (snapshot) {
                var expirationDate, months, featuresFire = snapshot.snapshot.value, feautures = $filter("orderByPriority")(featuresFire), today = new Date, plansRef = $firebase(new Firebase(plansUrl));
                plansRef.$on("value", function (snapshot) {
                    var plans = snapshot.snapshot.value, plansArr = $filter("orderByPriority")(plans);
                    plansArr.forEach(function (planElement) {
                        if (planName == planElement.name) {
                            if (planElement.hasOwnProperty("comment")) {
                                var comments = planElement.comment.split(" ");
                                comments.forEach(function (comment) {
                                    var commentParsed = parseInt(comment);
                                    if (!_.isNaN(commentParsed)) {
                                        months = commentParsed;
                                        var days = 31 * months;
                                        expirationDate = new Date(today.getTime() + 24 * days * 60 * 60 * 1e3)
                                    }
                                })
                            }
                            "Monthly" == planElement.name && (expirationDate = new Date(today.getTime() + 2592e6)), "Annually" == planElement.name && (expirationDate = new Date(today.getTime() + 31536e6));
                            var userSubscriptions = {name: planElement.name, startDate: new Date(Date.now()), expirationDate: expirationDate};
                            feautures.forEach(function (feauture) {
                                var feautureRestriction, feautureName = feauture.name, keys = _.keys(feauture);
                                keys.forEach(function (key) {
                                    key == planName && (feautureRestriction = feauture[key])
                                }), userSubscriptions[feautureName] = feautureRestriction
                            });
                            var breederUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(userName) + "/subscriptions", breederRef = $firebase(new Firebase(breederUrl));
                            breederRef.$remove(), breederRef.$add(userSubscriptions).then(function () {
                                toastr.success("Subscription plan has been changed.")
                            })
                        }
                    })
                })
            })
        }, $scope.remove = function (key) {
            _.isUndefined(key) || _.isNull(key) || (_this.breeders.$remove(key), _this.lookers.$remove(key))
        }, $scope.sendNewMessage = function (sender, addressat, isBreeder) {
            $scope.addressat = addressat, $scope.admin = "Admin";
            var messageTo = new Note;
            messageTo.body = $scope.message.body, messageTo.userName = $scope.admin, messageTo.isTrash = !1, messageTo.sent = Date.now(), messageTo.amISender = !1;
            var userType = isBreeder ? "breeders" : "lookers", receiverMessages = $scope.home.MainRefFire.$child(userType).$child($scope.addressat.replace(/\./g, "(p)")).$child("messages");
            receiverMessages.$add(messageTo);
            var messageFrom = new Note;
            messageFrom.body = $scope.message.body, messageFrom.userName = $scope.addressat, messageFrom.isTrash = !1, messageFrom.sent = Date.now(), messageFrom.amISender = !0;
            var senderMessages = $scope.home.MainRefFire.$child("admins").$child("messages");
            senderMessages.$add(messageFrom).then(function () {
                toastr.success(settings.messageSuccessNotice)
            })
        }
    }

    return UserManagementCtrl.prototype.ShowSuccess = function (note) {
        this.toastr.info(note)
    }, UserManagementCtrl.prototype.ShowError = function (note) {
        this.toastr.error(note)
    }, UserManagementCtrl
}(), breederDetails = function () {
    return{restrict: "E", templateUrl: "views/directives/breeder-details.html", replace: !0, link: function (scope) {
        scope.IsEdit = !1, scope.b = {}, scope.b.profile = {}, scope.b.profile.UserName = scope.index.BreederName, scope.Edit = function () {
            scope.index.Clone(), scope.IsEdit = !0
        }, scope.Cancel = function () {
            scope.IsEdit = !1
        }, scope.Save = function () {
            scope.index.Save(scope.index.BreederProfileCopy), scope.IsEdit = !1
        }
    }, controller: function ($scope) {
        $scope.message = {}
    }}
}, aboutInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/about-info.html", replace: !0, link: function (scope) {
        scope.home.url = "about"
    }}
}, aboutInfoEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/about-info-edit.html", transclude: !0, replace: !0, scope: {ctrl: "=", isOwner: "=", text: "@", func: "&", home: "=", breedsa: "="}, controller: function ($scope, $stateParams, $firebase) {
        var id = $scope.home.FireProcess($stateParams.uname);
        $scope.newBreed = {}, $scope.addNewBreeds = function (breeds) {
            breeds.forEach(function (breedName) {
                $scope.breeds.$add(breedName)
            }), $scope.breeder.breeds = []
        }, $scope.popoverDelete = {title: "Delete?", template: "../../views/modals/delete-confirmation.html"}, $scope.remove = function (key) {
            $scope.breeds.$remove(key)
        }, $scope.breeds = $firebase(new Firebase($scope.home.MainUrl + "/breeders/" + id + "/profile/breeds"))
    }, link: function (scope) {
        scope.ResetAllFields = function () {
            scope.ctrl.BreederProfileEdit.KennelName = "", scope.ctrl.BreederProfileEdit.Story = "", scope.ctrl.BreederProfileEdit.Parents = "", scope.ctrl.BreederProfileEdit.Boys = "", scope.ctrl.BreederProfileEdit.Girls = "", scope.ctrl.BreederProfileEdit.AddInfo = "", scope.form.$setDirty()
        }, scope.Next = function () {
        }
    }}
}, breedInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/breed-info.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, breederProfileNav = function () {
    return{restrict: "E", templateUrl: "views/directives/breeder-profile-nav.html", replace: !0, link: function (scope) {
        scope.showMenu = !0
    }}
}, button = function () {
    return{restrict: "E", template: "<button>Test</button>", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, cover = function () {
    return{restrict: "E", templateUrl: "views/directives/cover.html", replace: !0, controller: function ($scope, $firebase, $filter, $modal, $stateParams) {
        $scope.profileModal = $modal({scope: $scope, template: "../views/modals/profile-picture.html", animation: "am-fade-and-scale", placement: "center", show: !1}), $scope.showProfile = function () {
            $scope.profileModal.$promise.then($scope.profileModal.show)
        }, $scope.showChangeBtn = !1, $scope.files = [], $scope.chgBtnShown = function () {
            $scope.showChangeBtn = !0
        }, $scope.chgBtnHidden = function () {
            $scope.showChangeBtn = !1
        }, $scope.showChangeCoverBtn = !1, $scope.chgCoverBtnShown = function () {
            $scope.showChangeCoverBtn = !0
        }, $scope.chgCoverBtnHidden = function () {
            $scope.showChangeCoverBtn = !1
        }, $scope.show64 = function () {
            console.log("test12")
        };
        var requestEmail = $stateParams.uname, profilePicUrl = $scope.home.MainUrl;
        profilePicUrl += $scope.home.FireProcess(requestEmail) + "breeders/profile/images/avatar", $scope.avatar = $firebase(new Firebase(profilePicUrl)), $scope.avatar.$on("value", function (snapshot) {
            $scope.isAvatarChanged = !_.isEmpty(snapshot.snapshot.value), $scope.avatarsrc = _.values(snapshot.snapshot.value)[0]
        });
        var coverPicUrl = $scope.home.MainUrl;
        coverPicUrl += "breeders/profile/", coverPicUrl += $scope.home.FireProcess(requestEmail) + "/images/cover", $scope.cover = $firebase(new Firebase(coverPicUrl)), $scope.cover.$on("value", function (snapshot) {
            $scope.isCoverChanged = !_.isEmpty(snapshot.snapshot.value), $scope.coversrc = _.values(snapshot.snapshot.value)[0]
        })
    }}
}, currentLitters = function () {
    return{restrict: "E", templateUrl: "views/directives/current-litters.html", replace: !0, link: function () {
    }}
}, detailsInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/details-info.html", replace: !0, link: function (scope) {
        scope.home.menuIndex = 4, scope.home.url = "details"
    }}
}, detailsInfoEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/details-info-edit.html", transclude: !0, replace: !0, scope: {ctrl: "=", isOwner: "=", text: "@", func: "&"}, link: function (scope) {
        scope.ResetAllFields = function () {
            scope.ctrl.BreederProfileEdit.KennelName = "", scope.ctrl.BreederProfileEdit.Website = "", scope.ctrl.BreederProfileEdit.Email = "", scope.ctrl.BreederProfileEdit.Phone = "", scope.ctrl.BreederProfileEdit.Location = "", scope.ctrl.BreederProfileEdit.State = "", scope.ctrl.BreederProfileEdit.Zip = "", scope.ctrl.BreederProfileEdit.City = "", scope.ctrl.BreederProfileEdit.Shipping = !1
        }, scope.SaveKennelName = function () {
            var breederProfileOriginal = scope.ctrl.GetClone();
            breederProfileOriginal.KennelName = scope.ctrl.BreederProfileEdit.KennelName, breederProfileOriginal.Story = scope.ctrl.BreederProfileEdit.Story, scope.ctrl.Save(breederProfileOriginal)
        }
    }, controller: function ($scope) {
        $scope.states = [
            {name: "ALABAMA", abbreviation: "AL"},
            {name: "ALASKA", abbreviation: "AK"},
            {name: "AMERICAN SAMOA", abbreviation: "AS"},
            {name: "ARIZONA", abbreviation: "AZ"},
            {name: "ARKANSAS", abbreviation: "AR"},
            {name: "CALIFORNIA", abbreviation: "CA"},
            {name: "COLORADO", abbreviation: "CO"},
            {name: "CONNECTICUT", abbreviation: "CT"},
            {name: "DELAWARE", abbreviation: "DE"},
            {name: "DISTRICT OF COLUMBIA", abbreviation: "DC"},
            {name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM"},
            {name: "FLORIDA", abbreviation: "FL"},
            {name: "GEORGIA", abbreviation: "GA"},
            {name: "GUAM", abbreviation: "GU"},
            {name: "HAWAII", abbreviation: "HI"},
            {name: "IDAHO", abbreviation: "ID"},
            {name: "ILLINOIS", abbreviation: "IL"},
            {name: "INDIANA", abbreviation: "IN"},
            {name: "IOWA", abbreviation: "IA"},
            {name: "KANSAS", abbreviation: "KS"},
            {name: "KENTUCKY", abbreviation: "KY"},
            {name: "LOUISIANA", abbreviation: "LA"},
            {name: "MAINE", abbreviation: "ME"},
            {name: "MARSHALL ISLANDS", abbreviation: "MH"},
            {name: "MARYLAND", abbreviation: "MD"},
            {name: "MASSACHUSETTS", abbreviation: "MA"},
            {name: "MICHIGAN", abbreviation: "MI"},
            {name: "MINNESOTA", abbreviation: "MN"},
            {name: "MISSISSIPPI", abbreviation: "MS"},
            {name: "MISSOURI", abbreviation: "MO"},
            {name: "MONTANA", abbreviation: "MT"},
            {name: "NEBRASKA", abbreviation: "NE"},
            {name: "NEVADA", abbreviation: "NV"},
            {name: "NEW HAMPSHIRE", abbreviation: "NH"},
            {name: "NEW JERSEY", abbreviation: "NJ"},
            {name: "NEW MEXICO", abbreviation: "NM"},
            {name: "NEW YORK", abbreviation: "NY"},
            {name: "NORTH CAROLINA", abbreviation: "NC"},
            {name: "NORTH DAKOTA", abbreviation: "ND"},
            {name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP"},
            {name: "OHIO", abbreviation: "OH"},
            {name: "OKLAHOMA", abbreviation: "OK"},
            {name: "OREGON", abbreviation: "OR"},
            {name: "PALAU", abbreviation: "PW"},
            {name: "PENNSYLVANIA", abbreviation: "PA"},
            {name: "PUERTO RICO", abbreviation: "PR"},
            {name: "RHODE ISLAND", abbreviation: "RI"},
            {name: "SOUTH CAROLINA", abbreviation: "SC"},
            {name: "SOUTH DAKOTA", abbreviation: "SD"},
            {name: "TENNESSEE", abbreviation: "TN"},
            {name: "TEXAS", abbreviation: "TX"},
            {name: "UTAH", abbreviation: "UT"},
            {name: "VERMONT", abbreviation: "VT"},
            {name: "VIRGIN ISLANDS", abbreviation: "VI"},
            {name: "VIRGINIA", abbreviation: "VA"},
            {name: "WASHINGTON", abbreviation: "WA"},
            {name: "WEST VIRGINIA", abbreviation: "WV"},
            {name: "WISCONSIN", abbreviation: "WI"},
            {name: "WYOMING", abbreviation: "WY"}
        ]
    }}
}, events = function () {
    return{restrict: "E", templateUrl: "views/directives/events.html", replace: !0, link: function () {
    }}
}, feedback = function () {
    return{restrict: "E", templateUrl: "views/directives/feedback.html", replace: !0, link: function () {
    }}
}, feedbackEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/feedback-edit.html", replace: !0, controller: function ($scope, $stateParams, $firebase, $state) {
        var id = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var feedbackUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/feedbacks/" + id;
                $scope.feedback = $firebase(new Firebase(feedbackUrl))
            })
        }), $scope.updateFeedback = function (clientName, evaluation, body) {
            var feedbackNew = new Feedback;
            feedbackNew.ClientName = clientName, feedbackNew.FeedbackBody = body, feedbackNew.Evaluation = evaluation, $scope.feedback.$set({ClientName: clientName, Evaluation: evaluation, FeedbackBody: body}).then(function () {
                $state.go("^")
            })
        }
    }}
}, galleryNew = function () {
    return{restrict: "E", templateUrl: "views/directives/gallery-new.html", replace: !0, link: function () {
    }}
}, litterNew = function () {
    return{restrict: "E", templateUrl: "views/directives/litter-new.html", replace: !0, scope: {l: "="}, controller: function ($scope) {
        $scope.files = []
    }, link: function () {
    }}
}, lookerProfileNav = function () {
    return{restrict: "E", templateUrl: "views/directives/looker-profile-nav.html", replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, messageNavMenu = function () {
    return{restrict: "E", templateUrl: "views/directives/message-nav-menu.html", replace: !0, link: function () {
    }}
}, newMessage = function () {
    return{restrict: "E", templateUrl: "views/directives/new-message.html", replace: !0}
}, photoGallery = function () {
    return{restrict: "E", templateUrl: "views/directives/photo-gallery.html", replace: !0, controller: function ($scope, $firebase, $modal, DataService, $stateParams, $state) {
        $scope.home.isLoadFinished = !1;
        var galleryId = $stateParams.id, username = $scope.home.FireProcess($stateParams.uname), galleryUrl = $scope.home.MainUrl + "breeders/" + username + "/galleries/" + galleryId;
        $scope.gallery = $firebase(new Firebase(galleryUrl)), $scope.home.auth.$getCurrentUser().then(function (user) {
            return null == user ? void($scope.home.isLoadFinished = !0) : void $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                $scope.home.isLoadFinished = !0
            })
        }), $scope.remove = function (key) {
            $scope.gallery.$remove(key).then(function () {
                $state.go("^")
            })
        }
    }, link: function () {
    }}
}, photoGalleryEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/photo-gallery-edit.html", replace: !0, controller: function ($scope, $state) {
        $scope.files = [], $scope.saveGallery = function () {
            var photos = $scope.gallery.$child("Photos");
            $scope.files.forEach(function (photo) {
                photos.$add(photo)
            }), $scope.gallery.$save().then(function () {
                $state.go("^")
            })
        }, $scope.saveTitle = function () {
            $scope.gallery.$save("Title").then(function () {
            })
        }, $scope.remove = function (key) {
            $scope.gallery.$child("Photos").$child(key).$remove()
        }
    }}
}, previousPuppies = function () {
    return{restrict: "E", templateUrl: "views/directives/previous-puppies.html", transclude: !0, replace: !0, controller: function ($scope, $stateParams, $firebase) {
        var galleriesUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess($stateParams.uname) + "/galleries";
        $scope.galleries = $firebase(new Firebase(galleriesUrl)), $scope.indexPrev = 0, $scope.showAddPhotosButton = !1, $scope.addBtnShown = function () {
            $scope.showAddPhotosButton = !0
        }, $scope.addBtnHidden = function () {
            $scope.showAddPhotosButton = !1
        }, $scope.next = function () {
            $scope.indexPrev++, $scope.indexPrev >= $scope.expuppies.length && ($scope.indexPrev = 0)
        }, $scope.prev = function () {
            $scope.indexPrev--, $scope.indexPrev < 0 && ($scope.indexPrev = $scope.expuppies.length - 1)
        }, $scope.selectPrevPictures = function (galleries) {
            var photosArr = [];
            galleries.$on("value", function (snapshot) {
                var galleriesArr = (snapshot.snapshot.value, galleries.$getIndex());
                galleriesArr.forEach(function (key) {
                    var gallery = galleries[key];
                    gallery.isPrevPuppy && _.values(gallery.Photos).forEach(function (photo) {
                        -1 == photosArr.indexOf(photo) && (photo = _.extend(photo, {gid: key}), photosArr.push(photo))
                    })
                }), $scope.expuppies = _.shuffle(photosArr = _.uniq(photosArr, function (photo) {
                    return photo.caption
                }))
            })
        }, $scope.selectPrevPictures($scope.galleries), $scope.g = new Gallery, $scope.g.isPrevPuppy = !0, $scope.g.Title = "Our Previous Puppies Photos", $scope.btnTitle = "Add Photos", $scope.$watch("g.Photos", function (collection) {
            collection.length > 0 && ($scope.btnTitle = "Add More Photos")
        }, !0), $scope.savePrevPuppies = function () {
            var galleriesUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess($stateParams.uname) + "/galleries";
            $scope.galleries = $firebase(new Firebase(galleriesUrl)), "" === $scope.g.Title && ($scope.g.Title = "Our Previous Puppies Photos");
            var galleryShort = _.omit($scope.g, "Photos");
            $scope.galleries.$add(galleryShort).then(function (key) {
                $scope.g.Photos.forEach(function (photo) {
                    $scope.galleries.$child(key.name()).$child("Photos").$add(_.omit(photo, "isSized"))
                }), $scope.g = new Gallery, $scope.g.Title = "Our Previous Puppies Photos", $scope.btnTitle = "Add Photos"
            })
        }
    }, link: function () {
    }}
}, randomGallery = function () {
    return{restrict: "E", templateUrl: "views/directives/random-gallery.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, setter = function () {
    return{restrict: "E", link: function (scope) {
        scope.home.IsHome = !0
    }}
}, setterIshome = function () {
    return{restrict: "E", link: function (scope) {
        scope.home.IsSearchHidden = !0
    }}
}, spinDiv = function () {
    return{restrict: "E", templateUrl: "views/directives/spin-div.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, subscriptionPlans = function ($popover, $state, $filter, $firebase, settings, PlankeeperService) {
    return{restrict: "E", templateUrl: "views/directives/subscription-plans.html", scope: {home: "=", isAdmin: "="}, replace: !0, controller: function ($scope, toastr) {
        $scope.features = $scope.home.MainRefFire.$child("subscriptions").$child("features"), $scope.plans = $scope.home.MainRefFire.$child("subscriptions").$child("plans"), $scope.home.auth.$getCurrentUser().then(function (user) {
            return _.isNull(user) ? void($scope.isLoggedIn = !1) : ($scope.isLoggedIn = !0, _.isUndefined(user.email) && (user.email = user.id), void $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                $scope.feature = {}, $scope.popover = {title: "Add New Subscription Feature"}, $scope.popoverDelete = {title: "Delete forever?", template: "../../views/modals/delete-confirmation.html"}
            }))
        }), $scope.setPlanToPay = function (planName) {
            PlankeeperService.setPlan(planName)
        }, $scope.startPlan = function (planName) {
            var subscriptionsUrl = $scope.home.MainUrl + "subscriptions", plansUrl = subscriptionsUrl + "/plans", featuresUrl = subscriptionsUrl + "/features", featuresRef = $firebase(new Firebase(featuresUrl));
            featuresRef.$on("value", function (snapshot) {
                var expirationDate, months, featuresFire = snapshot.snapshot.value, feautures = $filter("orderByPriority")(featuresFire), today = new Date, plansRef = $firebase(new Firebase(plansUrl));
                plansRef.$on("value", function (snapshot) {
                    var plans = snapshot.snapshot.value, plansArr = $filter("orderByPriority")(plans);
                    plansArr.forEach(function (plan) {
                        if (planName.toLowerCase() == plan.name.toLowerCase()) {
                            if (!plan.hasOwnProperty("comment"))return;
                            var comments = plan.comment.split(" ");
                            comments.forEach(function (comment) {
                                var commentParsed = parseInt(comment);
                                if (!_.isNaN(commentParsed)) {
                                    months = commentParsed;
                                    var days = 31 * months;
                                    expirationDate = new Date(today.getTime() + 24 * days * 60 * 60 * 1e3);
                                    var userSubscriptions = {name: plan.name, startDate: new Date(Date.now()), expirationDate: expirationDate};
                                    feautures.forEach(function (feauture) {
                                        var feautureRestriction, feautureName = feauture.name, keys = _.keys(feauture);
                                        keys.forEach(function (key) {
                                            key == planName && (feautureRestriction = feauture[key])
                                        }), userSubscriptions[feautureName] = feautureRestriction
                                    });
                                    var breederUrl = $scope.home.MainUrl + "breeders/" + $scope.home.userNameFire + "/subscriptions", breederRef = $firebase(new Firebase(breederUrl));
                                    breederRef.$remove(), breederRef.$add(userSubscriptions).then(function () {
                                        toastr.success(userSubscriptions.name + " plan is activated"), $state.go("user.profile.manage")
                                    })
                                }
                            })
                        }
                    })
                })
            })
        }, $scope.addNewFeature = function () {
            var newFeature = new Feature;
            newFeature.name = $scope.feature.name, newFeature.comment = $scope.feature.comment, $scope.features.$add(newFeature)
        }, $scope.remove = function (key) {
            $scope.features.$remove(key)
        }, $scope.savePlans = function () {
            $scope.features.$save().then(function () {
                $scope.plans.$save().then(function () {
                    toastr.success("success")
                })
            })
        }
    }, link: function () {
    }}
}, svAddPrevPuppies = function ($modal) {
    return{restrict: "E", template: '<button class="btn btn-default btn-sniff-md z-index-high" ng-if="home.isOwner" ng-click="showAddPrevPuppies()">Add Photos</button>', replace: !0, controller: function ($scope) {
        var myOtherModal = $modal({scope: $scope, template: "../../views/modals/add-prev-puppies.html", show: !1});
        $scope.showAddPrevPuppies = function () {
            myOtherModal.$promise.then(myOtherModal.show)
        }
    }, link: function () {
    }}
}, svContactModal = function (FinduserService) {
    return{restrict: "E", templateUrl: "views/directives/sv-contact-modal.html", replace: !0, controller: function ($scope, $modal, DataService, settings, toastr) {
        $scope.ShowSuccess = function (note) {
            toastr.success(note)
        }, $scope.message = {}, $scope.modalMessage = $modal({title: "New Message", scope: $scope, show: !1, template: "../views/modals/admin-message.html"}), $scope.showMessage = function () {
            $scope.modalMessage.show()
        }, $scope.sendNewMessage = function (sender, addressat) {
            var body = $scope.message.body, to = addressat;
            FinduserService.find(to).then(function (userToProfile) {
                $scope.home.isBreeder === !0 && DataService.sendReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, !0).then(function () {
                }), $scope.home.isBreeder === !1 && DataService.sendLookerReply($scope.home.userName, userToProfile.Email, userToProfile.UserName, body, !0).then(function () {
                }), userToProfile.isBreeder === !0 && DataService.sendReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, !1).then(function () {
                    $scope.ShowSuccess(settings.messageSuccessNotice)
                }), userToProfile.isBreeder === !1 && DataService.sendLookerReply(userToProfile.Email, $scope.home.userName, $scope.home.nickName, body, !1).then(function () {
                    $scope.note.body = "", $scope.note.to = "", $scope.reply.body = "", $scope.ShowSuccess(settings.messageSuccessNotice)
                })
            }), $scope.message = {}
        }
    }}
}, svCropCover = function ($document) {
    return{link: function (scope, element) {
        function mousemove(event) {
            y = event.pageY - startY, x = event.pageX - startX, element.css({top: y + "px", left: x + "px"})
        }

        function mouseup() {
            $document.off("mousemove", mousemove), $document.off("mouseup", mouseup)
        }

        var startX = 0, startY = 0, x = 0, y = 0;
        element.css({position: "absolute", opacity: .3, left: "100px", top: "100px", border: "1px solid red", backgroundColor: "lightgrey", cursor: "pointer", width: scope.scaledCropWidth + "px", height: scope.scaledCropHeight + "px"}), element.on("mousedown", function (event) {
            event.preventDefault(), startX = event.pageX - x, startY = event.pageY - y, $document.on("mousemove", mousemove), $document.on("mouseup", mouseup)
        })
    }}
}, svDeletePopover = function ($popover) {
    return{restrict: "A", link: function (scope, element) {
        var myPopover = $popover(element, {title: "My Title", content: "My Content"});
        console.log(myPopover)
    }}
}, svFileSelect = function ($timeout) {
    return{link: function (scope, element) {
        element.bind("change", function (evt) {
            var fileList, i, files = [];
            if (fileList = evt.target.files, null != fileList)for (i = 0; i < fileList.length; i++)files.push(fileList.item(i));
            $timeout(function () {
                scope.onFileSel(files)
            })
        })
    }}
}, svImage = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-image.html", replace: !0, scope: {i: "=", index: "=", isMult: "=", width: "=", height: "=", fireRef: "=", onFileSelect: "&", closeModal: "&", okModal: "&"}, controller: function ($scope) {
        $scope.saveChanges = function () {
            $scope.fireRef.$remove(), $scope.fireRef.$add($scope.i.file64).then(function () {
                $scope.closeModal()
            }), $scope.closeModal()
        };
        $scope.setInitialImageProp = function (width, height) {
            $scope.realImageWidth = width, $scope.realImageHeight = height, $scope.isCropNeeded = !!($scope.realImageWidth > $scope.width || $scope.realImageHeight > $scope.height)
        }, $scope.setScaledImageProp = function (width) {
            $scope.scaledImageWidth = width, $scope.scaledCoefficient = $scope.scaledImageWidth / $scope.realImageWidth, $scope.scaledImageWidth = width, $scope.scaledImageHeight = Math.floor($scope.scaledCoefficient * $scope.realImageHeight), $scope.scaledCropWidth = Math.floor($scope.scaledCoefficient * parseInt($scope.width)), $scope.scaledCropHeight = Math.floor($scope.scaledCoefficient * $scope.height)
        }
    }, link: function (scope) {
        scope.cutImage = function () {
            var canvas = document.getElementById("myCanvas");
            canvas.style.width = scope.width + "px", canvas.style.height = scope.height + "px";
            var context = canvas.getContext("2d"), imageObj = new Image;
            imageObj.onload = function () {
                var cf = scope.scaledCoefficient, sourceX = scope.x / cf, sourceY = scope.y / cf, sourceWidth = scope.w / cf, sourceHeight = scope.h / cf, destWidth = scope.width, destHeight = scope.height, destX = 0, destY = 0;
                context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight), scope.$apply(function () {
                    scope.i.file64 = canvas.toDataURL("image/jpeg", .6), scope.hasBeenCropped = !0, scope.i.isSized = !0
                })
            }, scope.cropAccept = !1, imageObj.src = scope.i.file64
        }, scope.crop = function () {
            scope.cropAccept = !0, scope.img = $("#cropme"), scope.jcrop_api = scope.img.Jcrop({onChange: function (c) {
                scope.x = c.x, scope.y = c.y, scope.w = c.w, scope.h = c.h
            }, setSelect: [0, 0, scope.width, scope.height], aspectRatio: scope.width / scope.height})
        }
    }}
}, svImageUpload = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-image-upload.html", replace: !0, scope: {files: "=", childPath: "@", closeModal: "&", fileSize: "=", fireRef: "=", height: "=", isMult: "=", isDragShown: "=", isDragHidden: "=", mainRef: "=", btnTitle: "@", okModal: "&", show64: "&", width: "="}, controller: function ($scope) {
        $scope.isMult || ($scope.files = []), $scope.onFileSelect = function ($files, index) {
            $files.forEach(function (file) {
                var reader = new FileReader;
                file.size > $scope.fileSize ? _.isUndefined(index) ? $scope.files.push(new SImage(!1, file.name)) : $scope.files[index] = new SImage(!1, file.name) : (reader.onload = function (loadEvent) {
                    var file64 = loadEvent.target.result;
                    $scope.$apply(function () {
                        _.isUndefined(index) ? $scope.files.push(new SImage(!0, file.name, file64)) : $scope.files[index] = new SImage(!0, file.name, file64)
                    })
                }, reader.readAsDataURL(file))
            }), $scope.isFileChosen = !0
        }
    }, link: function () {
    }}
}, svImageWrapper = function () {
    return{link: function (scope, element) {
        element.on("load", function () {
            scope.$apply(function () {
                scope.setInitialImageProp(element.width(), element.height()), element.addClass("img-responsive"), scope.setScaledImageProp(element.width())
            })
        })
    }}
}, svLitter = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-litter.html", replace: !0, controller: function ($scope, $firebase, $modal, DataService, $stateParams, $state) {
        $scope.files = [];
        var litterId = $stateParams.id, username = $scope.home.FireProcess($stateParams.uname), litterUrl = $scope.home.MainUrl + "breeders/" + username + "/litters/" + litterId;
        $scope.litter = $firebase(new Firebase(litterUrl)), $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                $scope.home.isLoadFinished = !0
            })
        }), $scope.remove = function (key) {
            $scope.litter.$remove(key).then(function () {
                $state.go("^")
            })
        }
    }, link: function () {
    }}
}, svLitterEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-litter-edit.html", replace: !0, controller: function ($scope, $state, $stateParams, $firebase) {
        var litterId = $stateParams.id;
        $scope.home.auth.$getCurrentUser().then(function (user) {
            $scope.home.Breedership($scope.home.FireProcess(user.email)).then(function () {
                var litterUrl = $scope.home.MainUrl + "breeders/" + $scope.home.FireProcess(user.email) + "/litters/" + litterId;
                $scope.litter = $firebase(new Firebase(litterUrl)), $scope.home.isLoadFinished = !0
            })
        }), $scope.saveLitter = function () {
            var photos = $scope.litter.$child("Photos");
            $scope.files.forEach(function (photo, index) {
                photos.$add(photo), $scope.files.splice(index, 1)
            }), $scope.litter.$save().then(function () {
                $state.go("^")
            })
        }, $scope.remove = function (key) {
            console.log(key), $scope.litter.$child("Photos").$child(key).$remove()
        }, $scope.today = function () {
            $scope.dt = new Date
        }, $scope.today(), $scope.clear = function () {
            $scope.dt = null
        }, $scope.open = function ($event) {
            $event.preventDefault(), $event.stopPropagation(), $scope.opened = !0
        }, $scope.initDate = new Date, $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], $scope.format = $scope.formats[2]
    }}
}, svLitterInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-litter-info.html", replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, controller: function () {
    }, link: function () {
    }}
}, svLoginPopover = function ($popover) {
    return{restrict: "E", template: '<button class="sniff-menu btn-link btn menu-modal">LOG IN</button>', replace: !0, controller: function () {
    }, link: function (scope, element) {
        scope.lp = $popover(element, {template: "../../views/modals/login.html", placement: "bottom", scope: scope}), scope.$watch("lpShown", function (lpShown) {
            0 == lpShown && scope.lp.hide()
        })
    }}
}, svLookerInfo = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-looker-info.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, svLookerInfoEdit = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-looker-info-edit.html", transclude: !0, replace: !0, scope: {ctrl: "=", text: "@", func: "&"}, link: function () {
    }}
}, svMessageShort = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-message-short.html", replace: !0, scope: {index: "=", addressat: "=", showMessages: "=", mainFire: "=", admin: "=", isBreeder: "="}, controller: function ($scope, toastr) {
        $scope.message = {}, $scope.sendAdminMessage = function (index) {
            var messageTo = new Note;
            messageTo.body = $scope.message.body, messageTo.userName = $scope.admin, messageTo.isTrash = !1, messageTo.sent = Date.now(), messageTo.amISender = !1;
            var userType = $scope.isBreeder ? "breeders" : "lookers", receiverMessages = $scope.mainFire.$child(userType).$child($scope.addressat.replace(/\./g, "(p)")).$child("messages");
            receiverMessages.$add(messageTo);
            var messageFrom = new Note;
            messageFrom.body = $scope.message.body, messageFrom.userName = $scope.addressat, messageFrom.isTrash = !1, messageFrom.sent = Date.now(), messageFrom.amISender = !0;
            var senderMessages = $scope.mainFire.$child("admins").$child("messages");
            senderMessages.$add(messageFrom).then(function () {
                toastr.success("Message has been send"), $scope.showMessages.splice(index, 1)
            })
        }, $scope.cancelAdminMessage = function (index) {
            $scope.showMessages.splice(index, 1)
        }
    }, link: function () {
    }}
}, svMessages = function (settings) {
    return{restrict: "E", templateUrl: "views/directives/sv-messages.html", replace: !0, scope: {messages: "=", isTrash: "=", text: "@", func: "&"}, link: function (scope) {
        scope.noMessages = settings.noMessages, scope.messages.isTrash = scope.isTrash, scope.messages.SetSelectedUser(0)
    }}
}, svPlanOffer = function () {
    return{restrict: "A", scope: {popover: "="}, controller: function () {
    }, link: function (scope, element) {
        scope.popover && element.on("mouseenter", function () {
            alert("start a plan")
        })
    }}
}, svPwCheck = function () {
    return{require: "ngModel", link: function (scope, elem, attrs, ctrl) {
        var firstPassword = "#" + attrs.svPwCheck;
        elem.add(firstPassword).on("keyup", function () {
            scope.$apply(function () {
                var v = elem.val() === $(firstPassword).val();
                ctrl.$setValidity("pwmatch", v)
            })
        })
    }}
}, svRegisterPopover = function ($popover) {
    return{restrict: "E", template: '<button class="sniff-menu btn-link btn menu-modal">REGISTER</button>', replace: !0, controller: function () {
    }, link: function (scope, element) {
        scope.rp = $popover(element, {template: "../../views/modals/register.html", placement: "bottom", scope: scope}), scope.$watch("rpShown", function (rpShown) {
            0 == rpShown && scope.rp.hide()
        })
    }}
}, svSearchFeature = function () {
    return{restrict: "E", templateUrl: "views/directives/sv-search-feature.html", replace: !0, transclude: !0, scope: {features: "=", add: "&"}, controller: function ($scope) {
        $scope.remove = function (key) {
            $scope.features.$remove(key)
        }
    }, link: function () {
    }}
}, svSlider = function () {
    return{restrict: "A", scope: {h: "@"}, link: function (scope, element) {
        element.slimScroll({height: scope.h + "px"})
    }}
}, svSpinner = function () {
    return{restrict: "E", template: '<div id="spinner"><img src="img/loader.gif" class="middle-center"> </div>', replace: !0, scope: {radius: "="}, controller: function () {
    }, link: function () {
    }}
}, svStartPlanButton = function () {
    return{restrict: "E", replace: !0, templateUrl: "views/directives/sv-start-plan-button.html", scope: !1, link: function (scope, element, attrs) {
        scope.name = attrs.name
    }}
}, userProfileNav = function () {
    return{restrict: "E", templateUrl: "views/directives/user-profile-nav.html", replace: !0}
}, BoolString = function () {
    function BoolString() {
    }

    return BoolString.filter = function (value) {
        return value === !0 ? "Yes" : "No"
    }, BoolString
}(), GalleryActive = function () {
    function GalleryActive() {
    }

    return GalleryActive.filter = function (Galleries, isActive) {
        var finalArray = [];
        return Galleries.forEach(function (gallery) {
            gallery.IsActive === isActive && finalArray.push(gallery)
        }), finalArray
    }, GalleryActive
}(), HideAdmin = function () {
    function HideAdmin() {
    }

    return HideAdmin.filter = function () {
        return value === !0 ? "Yes" : "No"
    }, HideAdmin
}(), SelectUsers = function () {
    function SelectUsers() {
    }

    return SelectUsers.filter = function (notes, isTrash) {
        return notes = _.sortBy(notes, function (note) {
            return-note.sent
        }), _.map(_.uniq(_.pluck(_.filter(notes, function (note) {
            return _.isNull(note) ? void 0 : note.isTrash === isTrash
        }), "nickName")), function (userName) {
            return userName.replace(/\(p\)/g, ".")
        })
    }, SelectUsers
}(), SelectedUserMessages = function () {
    function SelectedUserMessages() {
    }

    return SelectedUserMessages.filter = function (notes, isTrash, userName) {
        return _.filter(notes, function (note) {
            return _.isNull(note) ? void 0 : note.isTrash === isTrash && note.userName === userName
        })
    }, SelectedUserMessages
}(), SpacesToDashes = function () {
    function SpacesToDashes() {
    }

    return SpacesToDashes.filter = function (value) {
        return value.replace(/ /g, "-")
    }, SpacesToDashes
}(), TitleLength = function () {
    function TitleLength() {
    }

    return TitleLength.filter = function (value, len) {
        return value.length <= len ? value : value.substr(0, len) + "..."
    }, TitleLength
}(), Unfire = function () {
    function Unfire() {
    }

    return Unfire.filter = function (value) {
        return value.replace(/\(p\)/g, ".")
    }, Unfire
}(), Unshared = function () {
    function Unshared() {
    }

    return Unshared.filter = function (value, isTemp) {
        if (!_.isUndefined(value)) {
            var filtered = [];
            return value.forEach(function (element) {
                element.isTemp === isTemp && filtered.push(element)
            }), console.log(filtered), filtered
        }
    }, Unshared
}(), Feature = function () {
    function Feature() {
        this.free = 0, this.monthly = 0, this.annually = 0
    }

    return Feature
}(), Plan = function () {
    function Plan() {
    }

    return Plan
}(), SImage = function () {
    function SImage(isSized, fileName, file64) {
        this.isSized = isSized, this.fileName = fileName, file64 && (this.file64 = file64), this.caption = fileName.split(".")[0] + " image"
    }

    return SImage
}(), Note = function () {
    function Note() {
        this.isUnread = !0
    }

    return Note
}(), Message = function () {
    function Message() {
    }

    return Message
}(), Feedback = function () {
    function Feedback() {
        this.ClientName = "", this.FeedbackBody = "", this.Evaluation = 0, this.AddedAt = Date.now()
    }

    return Feedback
}(), Photo = function () {
    function Photo() {
    }

    return Photo
}(), Gallery = function () {
    function Gallery() {
        this.Photos = [], this.isTemp = !0
    }

    return Gallery
}(), BreederProfile = function () {
    function BreederProfile() {
        this.LittersNumber = 0, this.isBreeder = !0, this.isAdmin = !1, this.FirstName = "", this.LastName = "", this.Website = "", this.Email = "", this.Phone = "", this.KennelName = "", this.Story = "", this.Parents = "", this.Boys = "", this.Girls = "", this.AddInfo = "", this.City = "", this.Zip = "", this.State = "", this.Certifications = "", this.Insurances = "", this.IsShowEmail = !0, this.IsShowPhoneNumber = !0, this.Breeds = []
    }

    return BreederProfile
}(), Litter = function () {
    function Litter() {
        this.Photos = []
    }

    return Litter
}(), LookerProfile = function () {
    function LookerProfile() {
        this.isBreeder = !1, this.FirstName = "", this.LastName = "", this.Email = "", this.Phone = "", this.City = "", this.Zip = "", this.State = ""
    }

    return LookerProfile
}(), CopyProfileService = function () {
    function CopyProfileService() {
        this.BreederProfile = new BreederProfile
    }

    return CopyProfileService.prototype.GetProfileClone = function () {
        var dolly = new BreederProfile;
        for (var key in this.BreederProfile)this.BreederProfile.hasOwnProperty(key) && (dolly[key] = this.BreederProfile[key]);
        return dolly
    }, CopyProfileService.prototype.SetProfile = function (breederProfile) {
        this.BreederProfile = breederProfile
    }, CopyProfileService
}(), DataService = function () {
    function DataService($http, $q, $firebase, settings, $filter) {
        this.$http = $http, this.$q = $q, this.$firebase = $firebase, this.settings = settings, this.$filter = $filter, this.url = settings.mainUrl, this.urlLooker = this.url + "lookers/", this.urlBreeder = this.url + "breeders/"
    }

    return DataService.prototype.sendReply = function (userName, corrUserName, corrUserNameNick, reply, amISender) {
        userName = this.FireProcess(userName), corrUserName = this.FireProcess(corrUserName), corrUserNameNick = this.FireProcess(corrUserNameNick);
        var d = this.$q.defer(), corrUserUrl = this.urlBreeder + userName + "/messages", corrUserRef = this.$firebase(new Firebase(corrUserUrl)), note = new Note;
        return note.amISender = amISender, note.sent = Date.now(), note.body = reply, note.isUnread = 1 == amISender ? !1 : !0, note.isTrash = !1, note.userName = corrUserName, note.nickName = corrUserNameNick, corrUserRef.$add(note), d.resolve(), d.promise
    }, DataService.prototype.sendLookerReply = function (userName, corrUserName, corrUserNameNick, reply, amISender) {
        userName = this.FireProcess(userName), corrUserName = this.FireProcess(corrUserName), corrUserNameNick = this.FireProcess(corrUserNameNick);
        var d = this.$q.defer(), corrUserUrl = this.urlLooker + userName + "/messages", corrUserRef = this.$firebase(new Firebase(corrUserUrl)), note = new Note;
        return note.amISender = amISender, note.sent = Date.now(), note.body = reply, note.isUnread = 1 == amISender ? !1 : !0, note.isTrash = !1, note.userName = corrUserName, note.nickName = corrUserNameNick, corrUserRef.$add(note), d.resolve(), d.promise
    }, DataService.prototype.deleteConversation = function (userName, corrUserName, isBreeder) {
        userName = this.FireProcess(userName), corrUserName = this.FireProcess(corrUserName);
        var d = this.$q.defer(), url = isBreeder ? this.urlBreeder : this.urlLooker, messagesUrl = url + userName + "/messages", notesRef = this.$firebase(new Firebase(messagesUrl)), keys = notesRef.$getIndex(), allNotes = [];
        keys.forEach(function (key) {
            allNotes.push(notesRef[key])
        });
        var notes = _.where(allNotes, {isTrash: !1, userName: corrUserName});
        return notes.forEach(function (note) {
            note.isTrash = !0
        }), notesRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.recoverConversation = function (userName, corrUserName, isBreeder) {
        userName = this.FireProcess(userName), corrUserName = this.FireProcess(corrUserName);
        var d = this.$q.defer(), url = isBreeder ? this.urlBreeder : this.urlLooker, messagesUrl = url + userName + "/messages", notesRef = this.$firebase(new Firebase(messagesUrl)), keys = notesRef.$getIndex(), allNotes = [];
        keys.forEach(function (key) {
            allNotes.push(notesRef[key])
        });
        var notes = _.where(allNotes, {isTrash: !0, userName: corrUserName});
        return notes.forEach(function (note) {
            note.isTrash = !1
        }), notesRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.deleteForever = function (userName, corrUserName, isBreeder) {
        userName = this.FireProcess(userName), corrUserName = this.FireProcess(corrUserName);
        var d = this.$q.defer(), url = isBreeder ? this.urlBreeder : this.urlLooker, messagesUrl = url + userName + "/messages", notesRef = this.$firebase(new Firebase(messagesUrl)), keys = notesRef.$getIndex();
        return keys.forEach(function (key) {
            var value = notesRef[key];
            value.isTrash === !0 && value.userName === corrUserName && notesRef.$remove(key)
        }), notesRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.getLookerMessages = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), fireMessages = this.$firebase(new Firebase(this.url + "lookers/" + userName + "/messages"));
        return fireMessages.$on("value", function (snapshot) {
            var messages = snapshot.snapshot.value;
            d.resolve(_this.$filter("orderByPriority")(messages))
        }), d.promise
    }, DataService.prototype.getMessages = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), fireMessages = this.$firebase(new Firebase(this.urlBreeder + userName + "/messages"));
        return fireMessages.$on("value", function (snapshot) {
            var messages = snapshot.snapshot.value;
            d.resolve(_this.$filter("orderByPriority")(messages))
        }), d.promise
    }, DataService.prototype.FireProcess = function (userName) {
        return userName.replace(/\./g, "(p)")
    }, DataService.prototype.FireUnProcess = function (userName) {
        return userName.replace(/\(p\)/g, ".")
    }, DataService.prototype.getMyLookerFollowings = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), followingsUrl = this.url + "lookers/" + userName + "/followings", followingsRef = this.$firebase(new Firebase(followingsUrl));
        return followingsRef.$on("value", function (snapshot) {
            var followings = snapshot.snapshot.value, followingssArr = _.map(_.keys(followings), function (value) {
                return _this.FireUnProcess(value)
            });
            d.resolve(followingssArr)
        }), d.promise
    }, DataService.prototype.getMyFollowings = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), followingsUrl = this.urlBreeder + userName + "/followings", followingsRef = this.$firebase(new Firebase(followingsUrl));
        return followingsRef.$on("value", function (snapshot) {
            var followings = snapshot.snapshot.value, followingssArr = _.map(_.keys(followings), function (value) {
                return _this.FireUnProcess(value)
            });
            d.resolve(followingssArr)
        }), d.promise
    }, DataService.prototype.getMyFollowers = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), followersUrl = this.urlBreeder + userName + "/followers", followersRef = this.$firebase(new Firebase(followersUrl));
        return followersRef.$on("value", function (snapshot) {
            var followers = snapshot.snapshot.value, followersArr = _.map(_.keys(followers), function (value) {
                return _this.FireUnProcess(value)
            });
            d.resolve(followersArr)
        }), d.promise
    }, DataService.prototype.followLookerUser = function (userName, followerName) {
        userName = this.FireProcess(userName), followerName = this.FireProcess(followerName);
        var d = this.$q.defer(), followingsUrl = this.url + "lookers/" + userName + "/followings", followingsRef = this.$firebase(new Firebase(followingsUrl)), followingRef = followingsRef.$child(followerName);
        return followingRef.$add(1), followingsRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.followUser = function (userName, followerName, amIBreeder) {
        userName = this.FireProcess(userName), followerName = this.FireProcess(followerName);
        var d = this.$q.defer(), userType = amIBreeder ? this.urlBreeder : this.urlLooker, followingsUrl = userType + userName + "/followings", followingsRef = this.$firebase(new Firebase(followingsUrl)), followingRef = followingsRef.$child(followerName);
        followingRef.$add(1), followingsRef.$save();
        var followersUrl = this.urlBreeder + followerName + "/followers", followersRef = this.$firebase(new Firebase(followersUrl)), followerRef = followersRef.$child(userName);
        return followerRef.$add(amIBreeder), followersRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.unFollowUser = function (userName, followerName, amIBreeder) {
        userName = this.FireProcess(userName), followerName = this.FireProcess(followerName);
        var d = this.$q.defer(), userType = amIBreeder ? this.urlBreeder : this.urlLooker, followingUrl = userType + userName + "/followings/" + this.FireProcess(followerName), followingRef = this.$firebase(new Firebase(followingUrl));
        followingRef.$remove(), followingRef.$save();
        var followerUrl = this.urlBreeder + followerName + "/followers/" + userName, followerRef = this.$firebase(new Firebase(followerUrl));
        return followerRef.$remove(), followerRef.$save(), d.resolve(), d.promise
    }, DataService.prototype.getProfile = function (id) {
        var key = id.replace(/\./g, "(p)");
        this.fb = this.$firebase(new Firebase(this.urlBreeder + key + "/profile")), this.fb.$on("value", function (snapshot) {
            var breeder = snapshot.snapshot.value;
            d.resolve(breeder)
        });
        var d = this.$q.defer();
        return d.promise
    }, DataService.prototype.getAllProfiles = function () {
        var _this = this, d = this.$q.defer();
        this.fb = this.$firebase(new Firebase(this.urlBreeder)), this.fb.$on("value", function (snapshot) {
            var breeders = snapshot.snapshot.value, breedersArr = _this.$filter("orderByPriority")(breeders);
            d.resolve(breedersArr)
        });
        var d = this.$q.defer();
        return d.promise
    }, DataService.prototype.updateProfile = function (t) {
        var d = this.$q.defer(), key = t.Email.replace(/\./g, "(p)");
        t = _.omit(t, ["Breeds", "breeds", "LittersNumber"]);
        var firebaseUrl = this.urlBreeder + key + "/profile";
        this.fb = this.$firebase(new Firebase(firebaseUrl));
        for (var key in t)this.fb[key] = t[key];
        return this.fb.$save(), d.resolve(), d.promise
    }, DataService.prototype.getGalleries = function (id) {
        var key = id.replace(/\./g, "(p)"), fireGalleries = this.$firebase(new Firebase(this.urlBreeder + key + "/galleries"));
        fireGalleries.$on("value", function (snapshot) {
            var galleries = snapshot.snapshot.value;
            d.resolve(galleries)
        });
        var d = this.$q.defer();
        return d.promise
    }, DataService.prototype.saveNewTestimonials = function (feedbacks, userName) {
        {
            var d = this.$q.defer(), fireTestimonials = this.$firebase(new Firebase(this.urlBreeder + userName + "/testimonials"));
            fireTestimonials.$getIndex()
        }
        return d.promise
    }, DataService.prototype.getLitters = function (userName) {
        var _this = this, d = this.$q.defer(), fireLitters = this.$firebase(new Firebase(this.urlBreeder + userName + "/litters"));
        return fireLitters.$on("value", function (snapshot) {
            var litters = snapshot.snapshot.value, arrLitters = _.rest(_this.$filter("orderByPriority")(litters));
            arrLitters.forEach(function (litter) {
                litter.Photos = _.rest(_this.$filter("orderByPriority")(litter.Photos))
            }), d.resolve(arrLitters)
        }), d.promise
    }, DataService.prototype.saveNewLitters = function (userName) {
        {
            var d = this.$q.defer(), fireLitters = this.$firebase(new Firebase(this.urlBreeder + userName + "/litters"));
            fireLitters.$getIndex()
        }
        return d.promise
    }, DataService.prototype.updateTitle = function (galleryId, title, userName) {
        var d = this.$q.defer(), fireGallery = this.$firebase(new Firebase(this.urlBreeder + userName + "/galleries/" + galleryId));
        return fireGallery.$update({Title: title}).then(function () {
            d.resolve()
        }), d.promise
    }, DataService.prototype.deletePhoto = function (galleryId, photoId, userName) {
        var d = this.$q.defer(), fireGalleriesPhotos = this.$firebase(new Firebase(this.urlBreeder + userName + "/galleries/" + galleryId + "/Photos/" + photoId));
        return fireGalleriesPhotos.$remove().then(function () {
            d.resolve()
        }), d.promise
    }, DataService
}(), FinduserService = function () {
    function FinduserService($firebase, settings, $filter, $q) {
        this.$firebase = $firebase, this.settings = settings, this.$filter = $filter, this.$q = $q
    }

    return FinduserService.prototype.find = function (userName) {
        var _this = this;
        userName = this.FireProcess(userName);
        var d = this.$q.defer(), mainRef = this.$firebase(new Firebase(this.settings.mainUrl));
        return this.getUser(mainRef, "breeders", userName).then(function (user) {
            d.resolve(user)
        }, function () {
            _this.getUser(mainRef, "lookers", userName).then(function (user) {
                d.resolve(user)
            }, function () {
                d.reject(null)
            })
        }), d.promise
    }, FinduserService.prototype.getUser = function (mainRef, type, userName) {
        var _this = this, d = this.$q.defer(), breeders = mainRef.$child(type);
        return breeders.$on("value", function (snapshot) {
            var bs = snapshot.snapshot.value, userNames = _.pluck(_this.$filter("orderByPriority")(bs), "profile"), foundUser = _.find(userNames, function (user) {
                return _.isUndefined(user) ? !1 : user.UserName == userName
            });
            _.isUndefined(foundUser) ? d.reject(null) : d.resolve(foundUser)
        }), d.promise
    }, FinduserService.prototype.findByEmail = function (email) {
        var _this = this;
        email = this.FireProcess(email), console.log(email);
        var d = this.$q.defer(), mainRef = this.$firebase(new Firebase(this.settings.mainUrl));
        return this.getUserByEmail(mainRef, "breeders", email).then(function (user) {
            d.resolve(user.profile)
        }, function () {
            _this.getUserByEmail(mainRef, "lookers", email).then(function (user) {
                d.resolve(user.profile)
            }, function () {
                d.reject(null)
            })
        }), d.promise
    }, FinduserService.prototype.getUserByEmail = function (mainRef, type, email) {
        var d = this.$q.defer();
        email = this.FireProcess(email);
        var breeders = mainRef.$child(type), keys = breeders.$getIndex(), wasFound = !1;
        return keys.forEach(function (key) {
            key == email && (wasFound = !0, d.resolve(breeders[key]))
        }), wasFound || d.reject(null), d.promise
    }, FinduserService.prototype.FireProcess = function (userName) {
        return userName.replace(/\./g, "(p)")
    }, FinduserService.prototype.FireUnProcess = function (userName) {
        return userName.replace(/\(p\)/g, ".")
    }, FinduserService
}(), GalleryService = function () {
    function GalleryService() {
    }

    return GalleryService.prototype.GetGalleryClone = function () {
        var dolly = new Gallery;
        for (var key in this.Gallery)this.Gallery.hasOwnProperty(key) && (dolly[key] = this.Gallery[key]);
        return dolly
    }, GalleryService.prototype.SetGallery = function (gallery) {
        this.Gallery = gallery
    }, GalleryService
}(), PlankeeperService = function () {
    function PlankeeperService() {
    }

    return PlankeeperService.prototype.setPlan = function (plan) {
        this.plan = plan
    }, PlankeeperService
}(), BreederGenerator = function () {
    function BreederGenerator() {
    }

    return BreederGenerator.prototype.create = function (email, mainRef, $firebase, nickName) {
        var user = new BreederProfile, userUrl = mainRef + "breeders", usersRef = $firebase(new Firebase(userUrl)), userRef = usersRef.$child(email), profileRef = userRef.$child("profile");
        return user.Email = this.FireUnProcess(email), user.UserName = nickName, profileRef.$set(user), usersRef.$save(email), user
    }, BreederGenerator.prototype.FireProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\./g, "(p)")
    }, BreederGenerator.prototype.FireUnProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\(p\)/g, ".")
    }, BreederGenerator
}(), LookerGenerator = function () {
    function LookerGenerator() {
    }

    return LookerGenerator.prototype.create = function (email, mainRef, $firebase, nickName) {
        var user = new LookerProfile, userUrl = mainRef + "lookers";
        console.log(userUrl);
        var usersRef = $firebase(new Firebase(userUrl)), userRef = usersRef.$child(email), profileRef = userRef.$child("profile");
        return user.Email = this.FireUnProcess(email), user.UserName = nickName, profileRef.$set(user), usersRef.$save(email), user
    }, LookerGenerator.prototype.FireProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\./g, "(p)")
    }, LookerGenerator.prototype.FireUnProcess = function (userName) {
        return _.isUndefined(userName) ? void 0 : userName.replace(/\(p\)/g, ".")
    }, LookerGenerator
}(), profile = angular.module("profile", ["cfp.hotkeys", "ngSanitize", "ratings", "mgcrea.ngStrap.helpers.dateParser", "mgcrea.ngStrap.affix", "mgcrea.ngStrap.typeahead", "mgcrea.ngStrap.helpers.parseOptions", "mgcrea.ngStrap.aside", "mgcrea.ngStrap.select", "mgcrea.ngStrap.modal", "mgcrea.ngStrap.datepicker", "mgcrea.ngStrap.popover", "mgcrea.ngStrap.helpers.dimensions", "mgcrea.ngStrap.tooltip", "ui.router", "ImageCropper", "angularFileUpload", "ngAnimate", "firebase"]);
profile.filter("boolString", function () {
    return function (value) {
        return BoolString.filter(value)
    }
}), profile.filter("spacesToDashes", function () {
    return function (value) {
        return SpacesToDashes.filter(value)
    }
}), profile.filter("titleLength", function () {
    return function (value, len) {
        return TitleLength.filter(value, len)
    }
}), profile.filter("galleryActive", function () {
    return function (Galleries, isActive) {
        return GalleryActive.filter(Galleries, isActive)
    }
}), profile.filter("selectUsers", function () {
    return function (notes, isTrash) {
        return SelectUsers.filter(notes, isTrash)
    }
}), profile.filter("selectedUserMessages", function () {
    return function (notes, isTrash, userName) {
        return SelectedUserMessages.filter(notes, isTrash, userName)
    }
}), profile.filter("unfire", function () {
    return function (value) {
        return Unfire.filter(value)
    }
}), profile.filter("unshared", function () {
    return function (value, isTemp) {
        return Unshared.filter(value, isTemp)
    }
}), profile.service("CopyProfileService", CopyProfileService), profile.service("GalleryService", GalleryService), profile.service("FinduserService", FinduserService), profile.service("PlankeeperService", PlankeeperService), profile.directive("aboutInfoEdit", aboutInfoEdit), profile.directive("detailsInfo", detailsInfo), profile.directive("detailsInfoEdit", detailsInfoEdit), profile.directive("previousPuppies", previousPuppies), profile.directive("photoGallery", photoGallery), profile.directive("photoGalleryEdit", photoGalleryEdit), profile.directive("spinDiv", spinDiv), profile.directive("litterNew", litterNew), profile.directive("feedback", feedback), profile.directive("feedbackEdit", feedbackEdit), profile.directive("newMessage", newMessage), profile.directive("setter", setter), profile.directive("setterIshome", setterIshome), profile.directive("messageNavMenu", messageNavMenu), profile.directive("userProfileNav", userProfileNav), profile.directive("breederProfileNav", breederProfileNav), profile.directive("events", events), profile.directive("currentLitters", currentLitters), profile.directive("cover", cover), profile.directive("svMessages", svMessages), profile.directive("lookerProfileNav", lookerProfileNav), profile.directive("breedInfo", breedInfo), profile.directive("randomGallery", randomGallery), profile.directive("subscriptionPlans", subscriptionPlans), profile.directive("svImageUpload", svImageUpload), profile.directive("galleryNew", galleryNew), profile.directive("svFileSelect", svFileSelect), profile.directive("svImage", svImage), profile.directive("svImageWrapper", svImageWrapper), profile.directive("svCropCover", svCropCover), profile.directive("svSlider", svSlider), profile.directive("svLitterEdit", svLitterEdit), profile.directive("svLitter", svLitter), profile.directive("svSearchFeature", svSearchFeature), profile.directive("svDeletePopover", svDeletePopover), profile.directive("svContactModal", svContactModal), profile.directive("svPwCheck", svPwCheck), profile.directive("svStartPlanButton", svStartPlanButton), profile.directive("svSpinner", svSpinner), profile.directive("svLoginPopover", svLoginPopover), profile.directive("svRegisterPopover", svRegisterPopover), profile.directive("svAddPrevPuppies", svAddPrevPuppies), profile.directive("aboutInfo", aboutInfo), profile.directive("breederDetails", breederDetails), profile.controller("PhotosCtrl", PhotosCtrl), profile.controller("PuppiesCtrl", PuppiesCtrl), profile.controller("TestimonialsCtrl", TestimonialsCtrl), profile.controller("GenerateCtrl", GenerateCtrl), profile.controller("HomeCtrl", HomeCtrl), profile.controller("AboutCtrl", AboutCtrl), profile.controller("BreedersCtrl", BreedersCtrl), profile.controller("DogsCtrl", DogsCtrl), profile.controller("ExploreCtrl", ExploreCtrl), profile.controller("AdvertiseCtrl", AdvertiseCtrl), profile.controller("TermsCtrl", TermsCtrl), profile.controller("ContactCtrl", ContactCtrl), profile.controller("LookingForDogCtrl", LookingForDogCtrl), profile.controller("ForBreedersCtrl", ForBreedersCtrl), profile.controller("LoginCtrl", LoginCtrl), profile.controller("RegisterCtrl", RegisterCtrl), profile.controller("user.messagesCtrl", MessagesCtrl), profile.controller("CreateMessageCtrl", CreateMessageCtrl), profile.controller("FollowersCtrl", FollowersCtrl), profile.controller("UserManagementCtrl", UserManagementCtrl), profile.controller("AdminPanelCtrl", AdminPanelCtrl), profile.controller("SubscriptionsCtrl", SubscriptionsCtrl), profile.controller("LookerCtrl", LookerCtrl), profile.controller("LookerAccountCtrl", LookerAccountCtrl), profile.controller("FollowingsCtrl", FollowingsCtrl), profile.controller("UpgradeCtrl", UpgradeCtrl), profile.controller("ManageBreederAccountCtrl", ManageBreederAccountCtrl), profile.controller("BreedsCtrl", BreedsCtrl), profile.controller("PaymentSuccessCtrl", PaymentSuccessCtrl), profile.controller("PaymentCancelCtrl", PaymentCancelCtrl), profile.controller("PaymentSuccessAnnuallyCtrl", PaymentSuccessAnnuallyCtrl), profile.controller("PaymentCancelAnnuallyCtrl", PaymentCancelAnnuallyCtrl), profile.service("DataService", DataService), profile.value("toastr", toastr), profile.value("settings", {deleteConfirm: "Delete forever?", freeSubscriptionNotice: "Your free subscription plan is activated.", monthlySubscriptionNotice: "Your monthly subscription plan is activated.", annualSubscriptionNotice: "Your annual subscription plan is activated.", delSubscriptionNotice: "Your subscription plan was successfully deactivated.", mainUrl: "https://torid-fire-6526.firebaseio.com/", messageSuccessNotice: "Message has been sent", noGalleryNotice: "Here is no any gallery yet", noLitterNotice: "Here is no any litter yet", noSuchUser: "The user with such username does not exist", userExists: "This username is already in use. Please try another", noMessages: "You have no new messages", noFollowing: "You are not following anyone", noFollowers: "You have no followers yet", dataSaved: "Successfully saved", dbError: "Db Connection Error!"}), profile.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/"), $stateProvider.state("user", {"abstract": !0, templateUrl: "../views/profile-side-bar.html"}).state("user.profile", {"abstract": !0, url: "/profile/:uname{asuser:(?:/[^/]+)?}", controller: IndexCtrl, templateUrl: "../views/profile.html"}).state("user.profile.about1", {url: "/about", templateUrl: "../views/profile-about.html"}).state("user.profile.about1.edit", {url: "/edit", templateUrl: "../views/profile-about-edit.html"}).state("user.profile.photos2", {url: "/photos", controller: "PhotosCtrl", templateUrl: "../views/profile-photos.html"}).state("user.profile.photos2.galleries", {url: "/gallery/:id", template: "<div ui-view><photo-gallery></photo-gallery></div>"}).state("user.profile.photos2.galleries.edit", {url: "/edit", template: "<photo-gallery-edit></photo-gallery-edit>"}).state("user.profile.puppies3", {url: "/puppies", controller: "PuppiesCtrl", templateUrl: "../views/profile-puppies.html"}).state("user.profile.puppies3.litter", {url: "/litter/:id", template: "<sv-litter></sv-litter>"}).state("user.profile.puppies3.litter.edit", {url: "/edit", template: "<sv-litter-edit></sv-litter-edit>"}).state("user.profile.details4", {url: "/details", templateUrl: "../views/profile-details.html"}).state("user.profile.details4.edit", {url: "/edit", templateUrl: "../views/profile-detailsEdit.html"}).state("user.profile.testimonials5", {url: "/testimonials", controller: "TestimonialsCtrl", templateUrl: "../views/profile-testimonials.html"}).state("user.profile.testimonials5.edit", {url: "/edit/:id", template: "<feedback-edit is-owner='home.isOwner' ></feedback-edit>"}).state("generate", {url: "/generate", controller: "GenerateCtrl", templateUrl: "../views/generate.html"}).state("home", {url: "/", templateUrl: "../views/home.html"}).state("sniff.login", {url: "/login", controller: "LoginCtrl", templateUrl: "../views/login.html"}).state("sniff.register", {url: "/register", controller: "RegisterCtrl", templateUrl: "../views/register.html"}).state("looking-for-dog", {url: "/looking-for-a-dog", controller: "LookingForDogCtrl", templateUrl: "../views/looking-for-dog.html"}).state("sniff", {"abstract": !0, templateUrl: "../views/sniff.html"}).state("sniff.about", {url: "/about", controller: "AboutCtrl", templateUrl: "../views/about.html"}).state("sniff.breeders", {url: "/breeders/:breed/:location", controller: "BreedersCtrl", templateUrl: "../views/breeders.html"}).state("sniff.dogs", {url: "/dogs", controller: "DogsCtrl", templateUrl: "../views/dogs.html"}).state("sniff.explore", {url: "/explore", controller: "ExploreCtrl", templateUrl: "../views/explore.html"}).state("sniff.advertise", {url: "/advertise", controller: "AdvertiseCtrl", templateUrl: "../views/advertise.html"}).state("sniff.terms", {url: "/terms", controller: "TermsCtrl", templateUrl: "../views/terms.html"}).state("sniff.contact", {url: "/contact", controller: "ContactCtrl", templateUrl: "../views/contact.html"}).state("sniff.forBreeders", {url: "/for-breeders/:scroll", controller: "ForBreedersCtrl", templateUrl: "../views/for-breeders.html"}).state("user.profile.messages", {url: "/messages", controller: "MessagesCtrl", templateUrl: "../views/messages.html"}).state("user.profile.messages.create", {url: "/create-message", controller: "CreateMessageCtrl", templateUrl: "../views/createMessage.html"}).state("user.profile.messages.trash", {url: "/trash", templateUrl: "../views/messages-trash.html"}).state("user.profile.followings", {url: "/followings", controller: "FollowingsCtrl", templateUrl: "../views/followings.html"}).state("user.profile.followers", {url: "/followers", controller: "FollowersCtrl", templateUrl: "../views/followers.html"}).state("sniff.forBreeders({scroll:1}))", {url: "/upgrade", controller: "UpgradeCtrl", templateUrl: "../views/upgrade.html"}).state("user.profile.manage", {url: "/manage-breeder-account", controller: "ManageBreederAccountCtrl", templateUrl: "../views/manage-breeder-account.html"}).state("admin", {"abstract": !0, controller: "AdminPanelCtrl", templateUrl: "../views/adminPanel.html"}).state("admin.management", {url: "/user-management", controller: "UserManagementCtrl", templateUrl: "../views/userManagement.html"}).state("admin.subscriptions", {url: "/subscriptions", controller: "SubscriptionsCtrl", templateUrl: "../views/subscriptions.html"}).state("admin.breeds", {url: "/breeds", controller: "BreedsCtrl", templateUrl: "../views/breeds.html"}).state("looker", {"abstract": !0, controller: "LookerCtrl", url: "/:uname", templateUrl: "../views/looker.html"}).state("looker.account", {url: "/account", templateUrl: "../views/looker-account.html"}).state("looker.account.edit", {url: "/edit", templateUrl: "../views/looker-account-edit.html"}).state("looker.followings", {url: "/followings", controller: "FollowingsCtrl", templateUrl: "../views/followings.html"}).state("looker.messages", {url: "/messages", controller: "MessagesCtrl", templateUrl: "../views/messages.html"}).state("looker.messages.create", {url: "/create-message", controller: "CreateMessageCtrl", templateUrl: "../views/createMessage.html"}).state("looker.messages.trash", {url: "/trash", templateUrl: "../views/messages-trash.html"}).state("payment-success", {url: "/payment-success", controller: "PaymentSuccessCtrl", templateUrl: "../views/payment-success.html"}).state("payment-cancel", {url: "/payment-cancel", controller: "PaymentCancelCtrl", templateUrl: "../views/payment-cancel.html"}).state("payment-success-annually", {url: "/payment-success-annually", controller: "PaymentSuccessAnnuallyCtrl", templateUrl: "../views/payment-success-annually.html"}).state("payment-cancel-annually", {url: "/payment-cancel-annually", controller: "PaymentCancelAnnuallyCtrl", templateUrl: "../views/payment-cancel-annually.html"})
}]);