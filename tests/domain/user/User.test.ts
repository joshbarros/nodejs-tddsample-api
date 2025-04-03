import { User, UserProps } from '../../../src/domain/user/User';
import { tdd } from '../../tdd-helpers';

describe('User', () => {
  tdd.given('valid properties', () => {
    const props: UserProps = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    tdd.when('creating a new user', () => {
      const user = User.create(props);

      tdd.then('it should have the provided name', () => {
        expect(user.getName()).toBe(props.name);
      });

      tdd.then('it should have the provided email', () => {
        expect(user.getEmail()).toBe(props.email);
      });

      tdd.then('it should generate an id', () => {
        expect(user.getId()).toBeDefined();
        expect(typeof user.getId()).toBe('string');
      });

      tdd.then('it should set a creation date', () => {
        expect(user.getCreatedAt()).toBeInstanceOf(Date);
      });

      tdd.then('it should properly convert to JSON', () => {
        const json = user.toJSON();
        expect(json.id).toBe(user.getId());
        expect(json.name).toBe(user.getName());
        expect(json.email).toBe(user.getEmail());
        expect(json.createdAt).toBe(user.getCreatedAt());
      });
    });
  });

  tdd.given('an explicit id and creation date', () => {
    const props: UserProps = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: new Date('2023-01-01')
    };

    tdd.when('creating a new user', () => {
      const user = User.create(props);

      tdd.then('it should use the provided id', () => {
        expect(user.getId()).toBe(props.id);
      });

      tdd.then('it should use the provided creation date', () => {
        expect(user.getCreatedAt()).toBe(props.createdAt);
      });
    });
  });
});
