import GenericJsValidator from './task-generic-js.js';
export default class Task035Validator extends GenericJsValidator {
    constructor() {
        super('`.*\\\$\{.*\\}.*`');
    }
}
