const db = require('../util/database');

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

    static fetchShelfPropertiesbyID(id) {
        return db.execute(
            'SELECT * FROM products WHERE products.id = ?', [id]
        );
    }
    static fetchShelfPropertiesbyPos(pos) {
        return db.execute(
            'SELECT * FROM products WHERE products.shelfPosition = ?', [pos]
        );
    }

}