/// <reference path="IUser.ts" />
interface ILookerProfile extends IUser {
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:string;
    City:string;
    Zip:string;
    State:string;
}

class LookerProfile implements ILookerProfile {
    FirstName:string;
    LastName:string;
    Email:string;
    Phone:string;
    City:string;
    Zip:string;
    State:string;

    constructor() {
        this.FirstName = "";
        this.LastName = "";
        this.Email = "";
        this.Phone = "";
        this.City = "";
        this.Zip = "";
        this.State = "";
    }
}
