import { Kaizen } from '../kaizen/kaizen.entity';

export class Action extends Kaizen {
    private title: string;
    private description?: string;

    constructor({id, title, description}: ActionCtorProps) {
        super(id);
        this.title = title;
        this.description = description;
    }

    public getTitle() {
        return this.title;
    }
    public getDescription() {
        return this.description;
    }

    public setTitle(title: string) {
        this.title = title;
    }
    public setDescription(description: string) {
        this.description = description;
    }
}