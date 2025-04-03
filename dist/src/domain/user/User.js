"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.id = props.id || crypto.randomUUID();
        this.name = props.name;
        this.email = props.email;
        this.createdAt = props.createdAt || new Date();
    }
    /**
     * Factory method to create a new user
     */
    static create(props) {
        return new User(props);
    }
    /**
     * Get user's id
     */
    getId() {
        return this.id;
    }
    /**
     * Get user's name
     */
    getName() {
        return this.name;
    }
    /**
     * Get user's email
     */
    getEmail() {
        return this.email;
    }
    /**
     * Get user creation date
     */
    getCreatedAt() {
        return this.createdAt;
    }
    /**
     * Convert to plain object for serialization
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt
        };
    }
}
exports.User = User;
