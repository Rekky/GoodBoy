export class User {
    id: string | null = null;
    name: string | null = null;
    email: string | null = null;
    description: string | null = null;
    phone: string | null = null;
    city: string | null = null;
    address: string | null = null;
    cp: string | null = null;
    avatar: string | null = null;

    constructor(id?: string) {
        this.id = id ? id : null;
    }

    toJSON(): any {
        const json: any = {};
        json.id = this.id;
        json.name = this.name;
        json.email = this.email;
        json.description = this.description;
        json.phone = this.phone;
        json.city = this.city;
        json.address = this.address;
        json.cp = this.cp;
        json.avatar = this.avatar;
        return json;
    }
}
