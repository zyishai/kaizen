import { Action } from './action.entity';
import { ActionRepository } from './action-repository.interface';

export class ActionInteractor {
    constructor(private readonly actionRepository: ActionRepository) {}

    public async getAllActions() {
        return await this.actionRepository.findAll();
    }

    public async getById(actionId: KaizenId) {
        let action;
        if (action = await this.actionRepository.findById(actionId)) {
            return action;
        } else {
            throw new ReferenceError(`No action with id ${actionId}`);
        }
    }

    public async createAction(title: string, description?: string) {
        const action = new Action({title, description});

        return await this.actionRepository.save(action);
    }

    public async updateActionTitle(actionId: KaizenId, title: string) {
        const action = await this.actionRepository.findById(actionId);
        if (action) {
            action.setTitle(title);
            return await this.actionRepository.save(action);
        } else {
            throw new ReferenceError(`No action with id ${actionId}`);
        }
    }

    public async updateActionDescription(actionId: KaizenId, description: string) {
        const action = await this.actionRepository.findById(actionId);
        if (action) {
            action.setDescription(description);
            return await this.actionRepository.save(action);
        } else {
            throw new ReferenceError(`No action with id ${actionId}`);
        }
    }

    public async deleteAction(actionId: KaizenId) {
        return await this.actionRepository.delete(actionId);
    }
}