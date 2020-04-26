module.exports = class Item {

    // item constructor used creating and updating item data
    constructor(id, name, tags, weight, notes, price, imageLink) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.weight = weight;
        this.notes = notes;
        this.price = price;
        this.imageLink = imageLink;
    }

    // add item method for Item object - takes object and inserts it into database
    addItem() {
        return dbPromise.execute(
            'INSERT INTO items (name, tags, weight, notes, price, imageLink) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.tags, this.weight, this.notes, this.price, this.imageLink]
        );
    }

    // update item method for Item object - takes object and updates existing item in the database that matches the item id
    updateItem() {
        return dbPromise.execute(
            'UPDATE items SET name = ?, tags = ?, weight = ?, notes = ?, price = ?, imageLink = ? WHERE id = ?',
            [this.name, this.tags, this.weight, this.notes, this.price, this.imageLink, this.id]
        )
    }

    // help on writing sync code - answer by 'Josh' on StackOverflow
    // https://stackoverflow.com/questions/46067704/how-to-force-synchronous-loop-execution-in-javascript
    // takes an empty names array and pushes the item names stored on each shelf position (in order of shelf position)
    static fetchItemNames(names) {
        return dbPromise.execute(
            'SELECT items_id, shelfPosition FROM shelves ORDER BY shelfPosition ASC'
        )
            .then(([datas, meta]) => {
                // console.log(datas);
                // creating an array to store promises
                var promises = [];
                for (const data of datas) {
                    if (data.items_id == null) {
                        names[data.shelfPosition - 1] = '- - - empty - - -';

                    } else {
                        // fetching item name by Id, this is returned as a promise
                        var promise = this.findItemNafeFromId(data.items_id)
                            .then(([datas, meta]) => {
                                // updating the passed names array with item names
                                names[data.shelfPosition - 1] = datas[0].name;
                            })
                        // pushing the promise to the promise array
                        promises.push(promise);
                    }
                }
                // ensures all promises are fullfilled before variable assigned
                var all_promise = Promise.all(promises);
                // only return once all promises fullfilled (each promise is a database call)
                return all_promise;
            })
    }

    // fetches the item name of an item when passed an id
    static findItemNafeFromId(id) {
        return dbPromise.execute('SELECT name FROM items WHERE items.id = ?', [id]);
    }

    // fetches all item data when passed an id
    static findById(id) {
        return dbPromise.execute('SELECT * FROM items WHERE items.id = ?', [id]);
    }

    // fetches the most recent item id when passed a name (used in item setup, where always want the most recent in case of fuplication of names)
    static findByName(name) {
        return dbPromise.execute('SELECT id FROM items WHERE name = ? ORDER BY id DESC LIMIT 0, 1', [name]);
    }
}