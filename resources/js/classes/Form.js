export class Form {
    constructor(data) {
        for(let field in data) {
            this[field] = data[field];
        }
    }
}