const db = require('../util/database');

module.exports = class Overview {

    constructor(shelfItemsJoinArr, weightId1, weightId2, weightId3, weightId4,
        weightId5, weightId6) {
        this.shelfItemsJoin = shelfItemsJoinArr;
        this.weightId1 = weightId1;
        this.weightId2 = weightId2;
        this.weightId3 = weightId3;
        this.weightId4 = weightId4;
        this.weightId5 = weightId5;
        this.weightId6 = weightId6;
    }

    static fetchAllShevesJoinItems() {
        return db.execute(
            'SELECT * FROM items JOIN shelves ON items.id = shelves.items_id ORDER BY shelves.id ASC'
        );
    }

    static fetchWeightId1() {
        return db.execute(
            'SELECT weight FROM id1weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId2() {
        return db.execute(
            'SELECT weight FROM id2weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId3() {
        return db.execute(
            'SELECT weight FROM id3weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId4() {
        return db.execute(
            'SELECT weight FROM id4weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId5() {
        return db.execute(
            'SELECT weight FROM id5weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId6() {
        return db.execute(
            'SELECT weight FROM id6weights ORDER BY id DESC LIMIT 0, 1'
        );
    }

}