export class CelerisError extends Error {
    constructor(message, code) {
        super(message);
        this.name = code;
    }

    toString() {
        return `[${this.name}]: ${this.message}`;
    }
}