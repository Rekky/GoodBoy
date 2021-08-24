import {User} from "./User";

export class Ad {
    id: string | null = null;
    kind: 'lodging' | 'walking' = 'lodging';
    title: string | null = null;
    author: string | null = null;
    description: string | null = null;
    price: number | null = 0;
    image: string | null = null;
    createdAt: Date | null = new Date();
    user: User | null = null;

    constructor(id?: string) {
        this.id = id ? id : null;
    }

    toJSON(): any {
        const json: any = {};
        json.id = this.id;
        json.kind = this.kind;
        json.title = this.title;
        json.author = this.author;
        json.description = this.description;
        json.price = this.price;
        json.image = this.image;
        json.createAt = this.createdAt;
        json.user = this.user;
        return json;
    }
}
