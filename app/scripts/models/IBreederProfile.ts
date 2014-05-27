interface IBreederProfile{
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
    Insurances:boolean;
    Shipping:boolean;
}

class BreederProfile implements IBreederProfile{
    KennelName:string;
    Story:string;
    Parents:string;
    Boys:string;
    Girls:string;
    AddInfo:string;
    FirstName:string;
    LastName:string;
    Location:string;
    Website:string;
    Email:string;
    Phone:string;
    Certifications:string[];
    VetServices:boolean;
    Insurances:boolean;
    Shipping:boolean;

constructor(){}



}