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

}