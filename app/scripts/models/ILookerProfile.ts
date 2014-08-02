/// <reference path="IUser.ts" />
interface ILookerProfile extends IUser {
    UserName:string;
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:string;
    City:string;
    Zip:string;
    State:string;
}

class LookerProfile implements ILookerProfile {
    UserName:string;
    isBreeder:boolean;
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:string;
    City:string;
    Zip:string;
    State:string;

    constructor() {
        this.isBreeder = false;
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.Phone = "";
        this.City = "";
        this.Zip = "";
        this.State = "";
    }
}

