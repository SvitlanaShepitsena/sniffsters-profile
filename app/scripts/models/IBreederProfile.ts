/// <reference path="IUser.ts" />
interface IFeature {
    name:string;
    comment:string;

    free:number;
    monthly:number;
    annually:number;
}

class Feature implements IFeature {
    name:string;
    comment:string;
    free:number;
    monthly:number;
    annually:number;

    constructor() {
        this.free = 0;
        this.monthly = 0;
        this.annually = 0;
    }
}


interface IImage {
    isSized:boolean;
    fileName:string;
    file64:string;
    caption:string;
}


class SImage implements IImage {
    caption:string;
    file64:string;

    constructor(public isSized:boolean, public fileName:string, file64?:string) {
        if (file64) {
            this.file64 = file64;
        }
        this.caption = fileName.split('.')[0] + ' image';
    }
}

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
    ClientName:string;
    FeedbackBody:string;
}
class Feedback implements IFeedback {
    ClientName:string;
    FeedbackBody:string;

}
interface IPhoto {
    Caption:string;
    FilePath:string;
}

class Photo implements IPhoto {
    Caption:string;
    FilePath:string;


}
interface IGallery {
    Title:string;
    isTemp:boolean;
    Photos:any[]
}
class Gallery implements IGallery {
    Title:string;
    isTemp:boolean;
    Photos:any[];

    constructor() {
        this.Photos = [];
    }

}
class BreederProfile implements IBreederProfile {
    isBreeder:boolean;
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

        this.isBreeder = true;

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
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:any[];
    isTemp:boolean


}

class Litter implements ILitter {
    Title:string;
    DateOfBirth:string;
    Puppies:string;
    Colors:string;
    Photos:any[];
    isTemp:boolean;

    constructor() {
        this.Photos = [];
    }
}

