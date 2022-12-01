const add = require('./add');

describe('add module', () => {
    test('adds 2 numbers', () => {
        expect(add(3,4)).toStrictEqual(7);
    })

    test('throughs if one of the params is string', () => {
        expect(() => add(3,'4')).toThrow('inputs must be numbers');
    })
})