export class User {
    
    constructor(
        private userName: string,
        private firstName: string, 
        private lastName: string,
        private email: string,
        private birthDate: Date,
        private password?: string) { }
    
    get UserName() {
        return this.userName;
    }

    set UserName(value) {
        this.userName = value;
    }

    get FirstName() {
        return this.firstName;
    }

    set FirstName(value) {
        this.firstName = value; 
    }

    get LastName() {
        return this.lastName;
    }

    set LastName(value) {
        this.lastName = value;
    }

    get Email() {
        return this.email;
    }

    set Email(value) {
        this.email = value;
    }

    get BirthDate() {
        return this.birthDate;
    }

    set BirthDate(value) {
        this.birthDate = value;
    }

    get Password() {
        return this.password;
    }

    set Password(value) {
        this.password = value;
    }
}