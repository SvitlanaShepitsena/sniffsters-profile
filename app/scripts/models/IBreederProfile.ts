interface IBreederProfile {
    Id:string;
    FirstName:string;
    LastName:string;
    Location:string;
    Website:string;
    Email:string;
    Phone:string;
    KennelName:string;
    Story:string;
    Parents:string;
    Boys:string;
    Girls:string;
    AddInfo:string;
    City:string;
    Zip:string;
    State:string;
    Certifications:string[];
    VetServices:boolean;
    Insurances:string[];
    Shipping:boolean;
}
interface IFeedback {
    Id:number;
    ClientName:string;
    FeedbackBody:string;
}
class Feedback implements IFeedback {
    Id:number;
    ClientName:string;
    FeedbackBody:string;

    constructor() {
        this.ClientName = "";
        this.FeedbackBody = "";
    }
}
interface IPhoto {
    Id:number;
    Caption:string;
    FilePath:string;
}
interface IGallery {
    Id:number;
    Title:string;
    IsActive:Boolean;
    Photos:IPhoto[]
}
class Gallery implements IGallery {
    Id:number;
    Title:string;
    IsActive:Boolean;
    Photos:IPhoto[];
}
class BreederProfile implements IBreederProfile {
    City:string;
    Zip:string;
    State:string;
    IsShowEmail:boolean;
    IsShowPhoneNumber:boolean;
    Id:string;
    FirstName:string;
    LastName:string;
    KennelName:string;
    Story:string;
    Parents:string;
    Boys:string;
    Girls:string;
    AddInfo:string;
    Location:string;
    Website:string;
    Email:string;
    Phone:string;
    Certifications:string[];
    VetServices:boolean;
    Insurances:string[];
    Shipping:boolean;

    constructor() {
    }
}

interface ILitter {
    Id:number;
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:IPhoto[];
}

class Litter implements ILitter {
    Id:number;
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:IPhoto[];

    constructor() {
//        this.Title = "";
//        this.DateOfBirth = "";
//        this.Puppies = "";
//        this.Colors = "";
        this.Photos = [];
    }
}
