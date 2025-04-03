/**
 * Domain model for User
 */
export interface UserProps {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly createdAt: Date;

  private constructor(props: UserProps) {
    this.id = props.id || crypto.randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt || new Date();
  }

  /**
   * Factory method to create a new user
   */
  public static create(props: UserProps): User {
    return new User(props);
  }

  /**
   * Get user's id
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Get user's name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get user's email
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Get user creation date
   */
  public getCreatedAt(): Date {
    return this.createdAt;
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}
