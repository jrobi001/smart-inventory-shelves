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
        return dbPromise.execute(
            'INSERT INTO items (name, tags, weight, notes, price, imageLink) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.tags, this.weight, this.notes, this.price, this.imageLink]
        );
    }

    updateItem() {
        return dbPromise.execute(
            'UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE id = ?',
            [this.name, this.tags, this.weight, this.notes, this.price, this.imageLink, this.id]
        )
    }

    // help on writing sync code
    // https://stackoverflow.com/questions/46067704/how-to-force-synchronous-loop-execution-in-javascript
    static fetchItemNames(names) {
        return dbPromise.execute(
            'SELECT items_id, shelfPosition FROM shelves ORDER BY shelfPosition ASC'
        )
            .then(([datas, meta]) => {
                // console.log(datas);
                var promises = [];
                for (const data of datas) {
                    if (data.items_id == null) {
                        names[data.shelfPosition - 1] = '- - - empty - - -';

                    } else {
                        var promise = this.findItemNafeFromId(data.items_id)
                            .then(([datas, meta]) => {
                                // console.log('hao');
                                // console.log(datas[0].name);
                                names[data.shelfPosition - 1] = datas[0].name;
                            })
                        promises.push(promise);
                    }
                }
                var all_promise = Promise.all(promises);
                return all_promise;
            })
    }

    static findItemNafeFromId(id) {
        return dbPromise.execute('SELECT name FROM items WHERE items.id = ?', [id]);
    }

    static findById(id) {
        return dbPromise.execute('SELECT * FROM items WHERE items.id = ?', [id]);
    }

    static findByName(name) {
        return dbPromise.execute('SELECT id FROM items WHERE name = ? ORDER BY id DESC LIMIT 0, 1', [name]);
    }
}