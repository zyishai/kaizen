import anyTest, { TestInterface } from 'ava';
import { InMemoryAction } from './in-memory-action';
import { Action } from './action.entity';

const test = anyTest as TestInterface<any>;

test('Should create in-memory action with basic properties (id, title, desc)', t => {
    const action = new InMemoryAction({id:'1', title:'Foo', description:''});

    t.is(action.id, '1');
    t.is(action.title, 'Foo');
    t.is(action.description, '');
});
test('Should be able to create action without description', t => {
    const action = new InMemoryAction({id:'1', title:'Foo'});

    t.is(action.description, undefined);
});
test('Should have deleted property initialized to false', t => {
    const action = new InMemoryAction({id:'1', title:'Foo'});

    t.is(action.deleted, false);
});
test('Should have created property initialized correctly', t => {
    const beforeActionCreation = Date.now();
    const action = new InMemoryAction({id:'1', title:'Foo'});

    t.assert(beforeActionCreation <= action.created);
    t.assert(action.created <= Date.now());
});
test('Should have last modified property initialized to null', t => {
    const action = new InMemoryAction({id:'1', title:'Foo'});
    t.is(action.lastModified, null);
});
test('Should create action from existing action', t => {
    const actionEntity = new Action({id:'3', title:'Bar', description:'Empty'});
    const inMemoryAction = InMemoryAction.from(actionEntity);

    t.is(inMemoryAction.id, '3');
    t.is(inMemoryAction.title, 'Bar');
    t.is(inMemoryAction.description, 'Empty');
});
test('In case of creating action from existing action without id, should assign id', t => {
    const actionEntity = new Action({title:'Baz'});
    const inMemoryAction = InMemoryAction.from(actionEntity);

    t.truthy(inMemoryAction.id);
    t.is(typeof inMemoryAction.id, 'string');
});