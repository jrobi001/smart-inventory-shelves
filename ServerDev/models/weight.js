const db = require('../util/database');

module.exports = class Weight {

    constructor(id, dateTime, weight, shelves_id) {
        this.id = id;
        this.dateTime = dateTime;
        this.weight = weight;
        this.shelves_id = shelves_id;
    }
}