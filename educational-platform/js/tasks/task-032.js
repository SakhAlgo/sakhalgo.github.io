import GenericJsValidator from './task-generic-js.js';
export default class Task032Validator extends GenericJsValidator {
    constructor() {
        super('let.*=.*[0-9]+');
    }
}
