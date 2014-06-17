interface IBreederProfile{
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

    Certifications:string[];
    VetServices:boolean;
    Insurances:string[];
    Shipping:boolean;
}
interface IPhoto {
    Id:number;
    Caption:string;
    FilePath:string;
}
interface IGallery{
    Id:number;
    Title:string;
    IsActive:Boolean;
    Photos:IPhoto[]
}
class Gallery implements  IGallery
{
    Id:number;
    Title:string;
    IsActive:Boolean;
    Photos:IPhoto[];
}
class BreederProfile implements IBreederProfile{
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

constructor(){}
}