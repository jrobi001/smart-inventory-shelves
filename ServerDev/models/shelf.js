module.exports = class Shelf {

    // Shelf constructor, used to update shelf settings
    constructor(id, items_id, shelfPosition, updateFrequency,
        thresholdType, thresholdValue,
        hundredPercentWeight, autocalc100percent, warning) {
        this.id = id;
        this.items_id = items_id;
        this.shelfPosition = shelfPosition;
        this.updateFrequency = updateFrequency;
        this.thresholdType = thresholdType;
        this.thresholdValue = thresholdValue;
        this.hundredPercentWeight = hundredPercentWeight;
        this.autocalc100percent = autocalc100percent;
        this.warning = warning;
    }

    // fetches all records in shelves table
    static fetchAll() {
        return dbPromise.execute('SELECT * FROM shelves');
    }

    // fetches the item id of the item stored in a specific shelf position (or null if no item there)
    static fetchItemIdFromPos(pos) {
        return dbPromise.execute(
            'SELECT items_id FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    // fetches the shelf Id of a the shelf at the shelf position pos
    static fetchIdFromPos(pos) {
        return dbPromise.execute(
            'SELECT id FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    // fetches all the shelf data (record) which matches the shelf id (from shelves table)
    static fetchByID(id) {
        return dbPromise.execute(
            'SELECT * FROM shelves WHERE shelves.id = ?', [id]
        );
    }

    // fetches all the shelf data (record) which matches the shelf position (from shelves table)
    static fetchByPos(pos) {
        return dbPromise.execute(
            'SELECT * FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    // takes a shelf object as an argument and overwrites the shelf (settings) at the mathing shelf position
    static overwriteShelf(Shelf) {
        return dbPromise.execute(
            "UPDATE shelves SET items_id = ?, updateFrequency = '0', thresholdType = ?, thresholdValue = ?, hundredPercent = ?, autocalc100Percent = ?, warning = ? WHERE shelfPosition = ?",
            [Shelf.items_id, Shelf.thresholdType, Shelf.thresholdValue, Shelf.hundredPercentWeight,
            Shelf.autocalc100percent, Shelf.warning, Shelf.shelfPosition]
        )
    }

}