/// <reference path="IUser.ts" />
interface IBreederProfile extends IUser {
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
interface INote {
    amISender:boolean;
    isTrash:boolean;
    userName:string;
    body:string;
    sent:number;
}

class Note implements INote {

    amISender:boolean;
    isTrash:boolean;
    userName:string;
    body:string;
    sent:number;

}

interface IMessage {
    Sender:string;
    Body:string;
}

class Message implements IMessage {
    Sender:string;
    Body:string;
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

}
interface IPhoto {
    Id:number;
    Caption:string;
    FilePath:string;
}

class Photo implements IPhoto {
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


        this.FirstName = "";
        this.LastName = "";
        this.Website = "";
        this.Email = "";
        this.Phone = "";
        this.KennelName = "";
        this.Story = "";
        this.Parents = "";
        this.Boys = "";
        this.Girls = "";
        this.AddInfo = "";
        this.City = "";
        this.Zip = "";
        this.State = "";
        this.Certifications = [];
        this.VetServices = false;
        this.Insurances = [];
        this.Shipping = false;


        this.IsShowEmail = true;
        this.IsShowPhoneNumber = true;
        
        
    }
}

interface ILitter {
    Id:number;
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:any[];
}

class Litter implements ILitter {
    Id:number;
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:any[];

}
