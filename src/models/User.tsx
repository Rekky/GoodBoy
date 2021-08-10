export class User {
    id: string | null = null;
    name: string | null = null;
    email: string | null = null;
    description: string | null = null;
    profile: {uri: string} | null = null;

    constructor(id?: string) {
        this.id = id ? id : null;
    }

    toJSON(): any {
        const json: any = {};
        json.id = this.id;
        json.name = this.name;
        json.email = this.email;
        json.description = this.description;
        json.profile = this.profile;
        return json;
    }
}
