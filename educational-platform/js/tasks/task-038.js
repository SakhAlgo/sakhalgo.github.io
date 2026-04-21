import GenericJsValidator from './task-generic-js.js';
export default class Task038Validator extends GenericJsValidator {
    constructor() {
        super('return.*\+');
    }
}
