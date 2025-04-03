import { sum } from '../src/app';

describe('sum()', () => {
  it('Should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  })
})
