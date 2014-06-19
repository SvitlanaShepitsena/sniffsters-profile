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
    Id:string;
    ClientName:string;
    FeedbackBody:string;
}
class Feedback {
    Id:string;
    ClientName:string;
    FeedbackBody:string;
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

class Litter {
    Id:number;
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:IPhoto[];

}
