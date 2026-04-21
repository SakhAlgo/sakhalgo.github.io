import GenericJsValidator from './task-generic-js.js';
export default class Task036Validator extends GenericJsValidator {
    constructor() {
        super('function.*\(.*,.*\)');
    }
}
