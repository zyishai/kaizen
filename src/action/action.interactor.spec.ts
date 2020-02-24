import anyTest, { TestInterface } from 'ava';
import { ActionInteractor } from './action.interactor';
import { ImMemoryActionRepository } from './in-memory-action.repository';

const test = anyTest as TestInterface<{
    interactor: ActionInteractor
}>;

test.beforeEach(t => {
    t.context.interactor = new ActionInteractor(new ImMemoryActionRepository());
});

test('Should create new action', async t => {
    await t.notThrowsAsync(async () => await t.context.interactor.createAction('Foo', 'Bla'));
});
test('Should return all actions', async t => {
    t.plan(3);

    t.true(Array.isArray(await t.context.interactor.getAllActions()));
    t.is((await t.context.interactor.getAllActions()).length, 0);

    await t.context.interactor.createAction('Foo');

    t.is((await t.context.interactor.getAllActions()).length, 1);
});
test('Should return action by id', async t => {
    const actionId = await t.context.interactor.createAction('Foo');
    
    t.is(await (await t.context.interactor.getById(actionId)).getTitle(), 'Foo');
});
test('Should throw if trying to get action that not exists', async t => {
    await t.throwsAsync(async () => await t.context.interactor.getById('aaa'));
});
test('Should update action\'s title', async t => {
    const actionId = await t.context.interactor.createAction('Foo');
    await t.context.interactor.updateActionTitle(actionId, 'Bar');

    t.is((await t.context.interactor.getById(actionId)).getTitle(), 'Bar');
});
test('Should throw if trying to update title of action that not exists', async t => {
    await t.throwsAsync(async () => await t.context.interactor.updateActionTitle('aaa', 'bla'));
});
test('Should update action\'s description', async t => {
    const actionId = await t.context.interactor.createAction('Foo', 'Bar');
    await t.context.interactor.updateActionDescription(actionId, 'Baz');

    t.is((await t.context.interactor.getById(actionId)).getDescription(), 'Baz');
});
test('Should throw if trying to update description of action that not exists', async t => {
    await t.throwsAsync(async () => await t.context.interactor.updateActionDescription('aaa', 'bla'));
});
test('Should delete action', async t => {
    t.plan(2);
    const actionId = await t.context.interactor.createAction('Foo');

    await t.notThrowsAsync(async () => await t.context.interactor.getById(actionId));

    await t.context.interactor.deleteAction(actionId);

    await t.throwsAsync(async () => await t.context.interactor.getById(actionId));
});