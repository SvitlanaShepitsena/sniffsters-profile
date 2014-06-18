interface IBreederProfile {
    Id:string;
    FirstName:string;
    LastName:string;
    Location:string;
    State:string;
    City:string
    Zip:string
    Website:string;
    Email:string;
    Phone:string;
    KennelName:string;
    Story:string;
    Parents:string;
    Boys:string;
    Girls:string;
    AddInfo:string;

    Certifications:string[];
    VetServices:boolean;
    Insurances:string[];
    Shipping:boolean;
    IsShowEmail:boolean
    IsShowPhoneNumber:boolean
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
<<<<<<< HEAD

interface ILitter {
    Id:number;
    Title:string;
    DateOfBirth:Date;
    Puppies:string;
    Colors:string;
    Photos:IPhoto[];
}

class BreederProfile implements IBreederProfile {
=======
    class
    BreederProfile
    implements
    IBreederProfile {
    IsShowEmail:boolean;
    IsShowPhoneNumber:boolean;
>>>>>>>
    origin
/
    master
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
    State:string;
    City:string;
    Zip:string;
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