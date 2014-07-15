/// <reference path="../models/IUser.ts" />
/// <reference path="BreederGenerator.ts" />
interface IUserGenerator {
    create:(email:string, mainRef:string, $firebase:any) => IUser;
}