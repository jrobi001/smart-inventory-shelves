module.exports = class Shelf {

    constructor(id, items_id, shelfPosition, updateFrequency,
        thresholdType, thresholdAbsolute, thresholdNumber, thresholdPercent,
        hundredPercentWeight, autocalc100percent, warning) {
        this.id = id;
        this.items_id = items_id;
        this.shelfPosition = shelfPosition;
        this.updateFrequency = updateFrequency;
        this.thresholdType = thresholdType;
        this.thresholdAbsolute = thresholdAbsolute;
        this.thresholdNumber = thresholdNumber
        this.thresholdPercent = thresholdPercent;
        this.hundredPercentWeight = hundredPercentWeight;
        this.autocalc100percent = autocalc100percent;
        this.warning = warning;

    }

    static fetchAll() {
        return dbPromise.execute('SELECT * FROM shelves');
    }


    static fetchItemIdFromPos(pos) {
        return dbPromise.execute(
            'SELECT items_id FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    static fetchIdFromPos(pos) {
        return dbPromise.execute(
            'SELECT id FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    static fetchByID(id) {
        return dbPromise.execute(
            'SELECT * FROM shelves WHERE shelves.id = ?', [id]
        );
    }
    static fetchByPos(pos) {
        return dbPromise.execute(
            'SELECT * FROM shelves WHERE shelves.shelfPosition = ?', [pos]
        );
    }

    static overwriteShelf(Shelf) {
        return dbPromise.execute(
            "UPDATE shelves SET items_id = ?, updateFrequency = '0', thresholdType = ?, thresholdAbsolute = ?, thresholdNumber = ?, thresholdPercent = ?, 100percentWeight = ?, autocalc100Percent = ?, warning = ? WHERE shelfPosition = ?",
            [Shelf.items_id, Shelf.thresholdType, Shelf.thresholdAbsolute,
            Shelf.thresholdNumber, Shelf.thresholdPercent, Shelf.hundredPercentWeight,
            Shelf.autocalc100percent, Shelf.warning, Shelf.shelfPosition]
        )
    }

}