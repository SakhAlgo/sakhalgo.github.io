import GenericJsValidator from './task-generic-js.js';
export default class Task040Validator extends GenericJsValidator {
    constructor() {
        super('.*\(.*\(.*\)\).*');
    }
}
