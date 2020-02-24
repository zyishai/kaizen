import { Action } from "./action.entity";

export class InMemoryAction {
    private static lastActionId = 0;
    public readonly id: KaizenId;
    public title: string;
    public description: Optional<string>;
    public deleted: boolean = false;
    public readonly created: number = Date.now();
    public lastModified: Optional<number> = null; // How can I test that this field getting updated??

    constructor({ id, title, description }: InMemoryActionCtorProps) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static from(action: Action) {
        return new InMemoryAction({
            ...action,
            id: action.getId() || (++InMemoryAction.lastActionId).toString(),
        } as InMemoryActionCtorProps);
    }
}