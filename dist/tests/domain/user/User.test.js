"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../src/domain/user/User");
const tdd_helpers_1 = require("../../tdd-helpers");
describe('User', () => {
    tdd_helpers_1.tdd.given('valid properties', () => {
        const props = {
            name: 'John Doe',
            email: 'john.doe@example.com'
        };
        tdd_helpers_1.tdd.when('creating a new user', () => {
            const user = User_1.User.create(props);
            tdd_helpers_1.tdd.then('it should have the provided name', () => {
                expect(user.getName()).toBe(props.name);
            });
            tdd_helpers_1.tdd.then('it should have the provided email', () => {
                expect(user.getEmail()).toBe(props.email);
            });
            tdd_helpers_1.tdd.then('it should generate an id', () => {
                expect(user.getId()).toBeDefined();
                expect(typeof user.getId()).toBe('string');
            });
            tdd_helpers_1.tdd.then('it should set a creation date', () => {
                expect(user.getCreatedAt()).toBeInstanceOf(Date);
            });
            tdd_helpers_1.tdd.then('it should properly convert to JSON', () => {
                const json = user.toJSON();
                expect(json.id).toBe(user.getId());
                expect(json.name).toBe(user.getName());
                expect(json.email).toBe(user.getEmail());
                expect(json.createdAt).toBe(user.getCreatedAt());
            });
        });
    });
    tdd_helpers_1.tdd.given('an explicit id and creation date', () => {
        const props = {
            id: '123',
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: new Date('2023-01-01')
        };
        tdd_helpers_1.tdd.when('creating a new user', () => {
            const user = User_1.User.create(props);
            tdd_helpers_1.tdd.then('it should use the provided id', () => {
                expect(user.getId()).toBe(props.id);
            });
            tdd_helpers_1.tdd.then('it should use the provided creation date', () => {
                expect(user.getCreatedAt()).toBe(props.createdAt);
            });
        });
    });
});
