export class Ad {
    id: string | null = null;
    title: string | null = null;
    author: string | null = null;
    description: string | null = null;
    price: number | null = 0;
    kind: 'lodging' | 'ride' = 'lodging';

    constructor(id?: string) {
        this.id = id ? id : null;
    }

    toJSON(): any {
        const json: any = {};
        json.id = this.id;
        json.title = this.title;
        json.author = this.author;
        json.description = this.description;
        json.price = this.price;
        json.kind = this.kind;
        return json;
    }
}
