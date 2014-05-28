/// <reference path="interfaces.d.ts" />
class Breeder implements IUser {
    constructor(
        public FirstName: string,
        public LastName: string,
        public UserName: string) {
    }
} 