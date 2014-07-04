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
        this.ClientName = "Client 1";
        this.FeedbackBody = "Best Breeder";
    }
}
interface IPhoto {
    Id:number;
    Caption:string;
    FilePath:string;
}

class Photo implements IPhoto{
    Id:number;
    Caption:string;
    FilePath:string;
constructor(){
    this.Id=1;
    this.Caption="My Dogs";
    this.FilePath="Picture1.jpg";
}
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

    constructor() {
        this.Photos = [];
    }
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
     this.Id = 1;
        this.Title = "Best Litter";
        this.DateOfBirth= "05.01.2014";
        this.Puppies = "My Best Puppies";
        this.Colors = "Black & WHite";

        this.Photos = [new Photo()];
    }
}
