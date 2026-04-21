import GenericJsValidator from './task-generic-js.js';
export default class Task037Validator extends GenericJsValidator {
    constructor() {
        super('\(.*\).*=>');
    }
}
