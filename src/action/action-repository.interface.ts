import { Action } from "./action.entity";

export interface ActionRepository {
    findById(actionId: KaizenId): Promise<Action | null>;
    findAll(): Promise<Action[]>;
    save(action: Action): Promise<KaizenId>;
    delete(actionId: KaizenId): Promise<KaizenId>;
}