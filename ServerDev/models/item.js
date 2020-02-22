const db = require('../util/database');

module.exports = class Item {

    constructor(id, name, tags, weight, notes, price, imageLink) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.weight = weight;
        this.notes = notes;
        this.price = price;
        this.imageLink = imageLink;
    }

    addItem() {
        return db.execute(
            'INSERT INTO items (name, tags, weight, notes, price, imageLink) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.tags, this.weight, this.notes, this.price, this.imageLink]
        );
    }

    static findById(id) {
        return db.execute('SELECT * FROM items WHERE items.id = ?', [id]);
    }
}