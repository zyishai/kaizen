import { ActionRepository } from './action-repository.interface';
import { Action } from './action.entity';
import { InMemoryAction } from './in-memory-action';

export class ImMemoryActionRepository implements ActionRepository {
    private readonly actions: Array<InMemoryAction> = [];

    private _findIndex(actionId: KaizenId) {
        return this.actions.findIndex(action => action.id === actionId);
    }

    // ============= ActionRepository implementation ============

    public async findAll(): Promise<Action[]> {
        return this.actions
            .filter(action => !action.deleted)
            .map(memoryAction => new Action({...memoryAction}));
    }
    public async findById(actionId: any): Promise<Action | null> {
        const actionIndex = this._findIndex(actionId);
        if (actionIndex >= 0 && !this.actions[actionIndex].deleted) {
            return new Action({ ...this.actions[actionIndex] });
        }

        return null;
    }
    public async save(action: Action): Promise<KaizenId> {
        let inMemoryAction = InMemoryAction.from(action);
        const actionIndex = this._findIndex(action.getId() as KaizenId);

        if (actionIndex >= 0) {
            inMemoryAction.lastModified = Date.now();
            this.actions[actionIndex] = inMemoryAction;
        } else {
            this.actions.push(inMemoryAction);
        }

        return inMemoryAction.id;
    }
    public async delete(actionId: any): Promise<KaizenId> {
        const actionIndex = this._findIndex(actionId);
        if (actionIndex < 0) {
            throw new ReferenceError(`No action with id ${actionId}`);
        }

        this.actions[actionIndex].lastModified = Date.now();
        this.actions[actionIndex].deleted = true;

        return actionId;
    }
}