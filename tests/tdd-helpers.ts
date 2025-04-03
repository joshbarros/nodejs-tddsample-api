/**
 * TDD Helper Functions
 *
 * These utility functions help with the TDD process by making tests more readable
 * and following best practices for test-driven development.
 */

/**
 * Verify a response object meets expected criteria
 */
export const expectResponse = {
  toHaveStatus: (res: { status: number }, status: number) => {
    expect(res.status).toBe(status);
  },

  toBeJson: (res: { headers: Record<string, string> }) => {
    expect(res.headers['content-type']).toMatch(/json/);
  },

  toHaveProperty: (res: { body: Record<string, unknown> }, property: string) => {
    expect(res.body).toHaveProperty(property);
  }
};

/**
 * Create a pending test as a reminder to implement
 * (useful during the Red phase of TDD)
 */
export const todo = (description: string) => {
  it(`TODO: ${description}`, () => {
    pending(`Implement test for: ${description}`);
  });
};

/**
 * Helper for TDD patterns
 */
export const tdd = {
  /**
   * Creates a "then" block with a descriptive name
   */
  then: (description: string, fn: () => void) => {
    it(`Then ${description}`, fn);
  },

  /**
   * Creates a "given" block with a descriptive name
   */
  given: (description: string, fn: () => void) => {
    describe(`Given ${description}`, fn);
  },

  /**
   * Creates a "when" block with a descriptive name
   */
  when: (description: string, fn: () => void) => {
    describe(`When ${description}`, fn);
  }
};
