module.exports = class Weight {

    constructor(id, dateTime, weight, shelves_id) {
        this.id = id;
        this.dateTime = dateTime;
        this.weight = weight;
        this.shelves_id = shelves_id;
    }

    static resetShelfByPosition(pos) {
        return dbPromise.execute(
            "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?",
            [pos]
        );
    }

    static deleteShelWeightsfById(id) {

        switch (id) {
            case 1:
                return dbPromise.execute(
                    'TRUNCATE TABLE id1weights'
                );
                break;
            case 2:
                return dbPromise.execute(
                    'TRUNCATE TABLE id2weights'
                );
                break;
            case 3:
                return dbPromise.execute(
                    'TRUNCATE TABLE id3weights'
                );
                break;
            case 4:
                return dbPromise.execute(
                    'TRUNCATE TABLE id4weights'
                );
                break;
            case 5:
                return dbPromise.execute(
                    'TRUNCATE TABLE id5weights'
                );
                break;
            case 6:
                return dbPromise.execute(
                    'TRUNCATE TABLE id6weights'
                );
                break;
            default:
                return console.log('error, no such table')

        }
    }
}