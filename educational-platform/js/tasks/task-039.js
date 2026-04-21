import GenericJsValidator from './task-generic-js.js';
export default class Task039Validator extends GenericJsValidator {
    constructor() {
        super('function\s*\(');
    }
}
