import anyTest, { TestInterface } from 'ava';
import Chance from 'chance';
import { Action } from './action.entity';

interface ContextType {
    chance: Chance.Chance;
    action: ActionCtorProps;
}
const test = anyTest as TestInterface<ContextType>;

test.before(t => {
    t.context.chance = new Chance();
    t.context.action = {
        id: t.context.chance.guid(),
        title: t.context.chance.sentence({words: 5}),
        description: t.context.chance.paragraph()
    };
});

test('Creating action with all properties should not throw', t => {
    // Arrange
    // Act
    // Assert
    t.notThrows(() => new Action(t.context.action));
});
test('Creating minimal action (only title) should not throw', t => {
    t.notThrows(() => new Action({ title: t.context.action.title }));
});
test('Action should have an id', t => {
    const action = new Action(t.context.action);

    t.is(action.getId(), t.context.action.id);
});
test('Action should have a title', t => {
    const action = new Action(t.context.action);

    t.plan(2);
    t.truthy(action.getTitle());
    t.is(action.getTitle(), t.context.action.title);
});
test('Action should have a description', t => {
    const action = new Action(t.context.action);

    t.plan(2);
    t.truthy(action.getDescription());
    t.is(action.getDescription(), t.context.action.description);
});
test('Should be able to update the title', t => {
    const action = new Action(t.context.action);

    action.setTitle('Bla');
    t.is(action.getTitle(), 'Bla');
});
test('Should be able to update the description', t => {
    const action = new Action(t.context.action);

    action.setDescription('Bla');
    t.is(action.getDescription(), 'Bla');
});