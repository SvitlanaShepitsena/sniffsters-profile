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

interface IPlan {
    name:string;
    comment:string;
    price:number;
    discount:number;
}
class Plan implements IPlan {
    name:string;
    comment:string;
    price:number;
    discount:number;
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
    UserName:string;
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
    Certifications:string;
    Breeds:string[];
    VetServices:boolean;
    Insurances:string;
    Shipping:boolean;
    LittersNumber:number
    isAdmin:boolean;
    isBreeder:boolean;
}
interface INote {
    amISender:boolean;
    isTrash:boolean;
    userName:string;
    nickName:string;
    body:string;
    sent:number;
    isUnread:boolean;
}

class Note implements INote {
    isUnread:boolean;
    amISender:boolean;
    isTrash:boolean;
    userName:string;
    nickName:string;
    body:string;
    sent:number;

    constructor() {
        this.isUnread = true;
    }
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
    Evaluation:number;
    FeedbackBody:string;
    AddedAt:number;
}
class Feedback implements IFeedback {
    AddedAt:number;
    ClientName:string;
    Evaluation:number;
    FeedbackBody:string;

    constructor() {
        this.ClientName = "";
        this.FeedbackBody = "";
        this.Evaluation = 0;
        this.AddedAt = Date.now();
    }
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
    isPrevPuppy

    constructor() {
        this.Photos = [];
        this.isTemp = true;
    }

}
class BreederProfile implements IBreederProfile {
    UserName:string;
    Breeds:string[];
    isBreeder:boolean;
    isAdmin:boolean;
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
    Certifications:string;
    VetServices:boolean;
    Insurances:string;
    Shipping:boolean;
    LittersNumber:number;


    constructor() {
        this.LittersNumber = 0;

        this.isBreeder = true;
        this.isAdmin = false;

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
        this.Certifications = "";
        this.Insurances = "";


        this.IsShowEmail = true;
        this.IsShowPhoneNumber = true;
        this.Breeds = [];

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

