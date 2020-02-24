import anyTest, { TestInterface } from 'ava';
import { Kaizen } from './kaizen.entity';
import { Action } from '../action/action.entity';

const test = anyTest as TestInterface<any>;

test('Kaizen could be created without id', t => {
    const kaizen = new Action({ title: 'abc' }) as Kaizen;

    t.is(kaizen.getId(), undefined);
});