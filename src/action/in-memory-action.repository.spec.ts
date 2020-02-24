import anyTest, { TestInterface, beforeEach } from 'ava';
import { Action } from './action.entity';
import { ImMemoryActionRepository } from './in-memory-action.repository';

const test = anyTest as TestInterface<{
    actionsRepository: ImMemoryActionRepository;
}>;

test.beforeEach(t => {
    t.context.actionsRepository = new ImMemoryActionRepository();
})

test('Should save new action', async t => {
    t.plan(2);
    const action = new Action({ title: 'bla' });

    t.is((await t.context.actionsRepository.findAll()).length, 0);
    await t.context.actionsRepository.save(action);

    t.is((await t.context.actionsRepository.findAll()).length, 1);
});
test('Should resave existing updated action', async t => {
    const action = new Action({ title: 'Foo' });

    const actionId = await t.context.actionsRepository.save(action);
    let savedAction = await t.context.actionsRepository.findById(actionId);

    savedAction?.setTitle('Bar');

    await t.context.actionsRepository.save(savedAction as Action);

    savedAction = await t.context.actionsRepository.findById(actionId);

    t.is(savedAction?.getTitle(), 'Bar');
});
test('Should find and return existing action', async t => {
    const action = new Action({ title: 'Foo' });
    const actionId = await t.context.actionsRepository.save(action);
    const savedAction = await t.context.actionsRepository.findById(actionId);

    t.truthy(actionId);
    t.is(savedAction?.getTitle(), action.getTitle());
});
test('Should return null for non existing action id', async t => {
    t.falsy(await t.context.actionsRepository.findById(-999));
});
test('Should delete existing action', async t => {
    const action = new Action({ title: 'Foo' });
    const actionId = await t.context.actionsRepository.save(action);

    await t.context.actionsRepository.delete(actionId);

    t.falsy(await t.context.actionsRepository.findById(actionId));
});
test('Should return all existing actions', async t => {
    await t.context.actionsRepository.save(new Action({ title: 'Foo' }));
    await t.context.actionsRepository.save(new Action({ title: 'Bar' }));
    await t.context.actionsRepository.save(new Action({ title: 'Baz' }));

    t.is((await t.context.actionsRepository.findAll()).length, 3);
});
test('Should not return deleted actions', async t => {
    const fooId = await t.context.actionsRepository.save(new Action({ title: 'Foo' }));
    await t.context.actionsRepository.save(new Action({ title: 'Bar' }));
    await t.context.actionsRepository.delete(fooId);

    t.is((await t.context.actionsRepository.findAll()).length, 1);
});
test('Should throw in case of trying to delete non existing action', async t => {
    await t.throwsAsync(async () => {
        try {
            await t.context.actionsRepository.delete(-999);
        } catch(err) {
            throw err;
        }
    });
});