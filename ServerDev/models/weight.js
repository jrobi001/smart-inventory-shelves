module.exports = class Weight {

    constructor(id, dateTime, weight, shelves_id) {
        this.id = id;
        this.dateTime = dateTime;
        this.weight = weight;
        this.shelves_id = shelves_id;
    }

    // sets a shelfs settings back to their defaults, while retaining shelf position and id, uses shelf position to find the shelf to update (used in clear shelf)
    static resetShelfByPosition(pos) {
        return dbPromise.execute(
            "UPDATE shelves SET items_id = NULL, updateFrequency = '0', thresholdType = 'NUMBER', thresholdAbsolute = '0', thresholdNumber = '0', thresholdPercent = '0', 100percentWeight = NULL, autocalc100Percent = '0', warning = '1' WHERE shelfPosition = ?",
            [pos]
        );
    }

    // takes the shelf id and deletes all data from the weights table associated with that shelf (used during clear shelf as well as at the end of setup)
    static deleteShelWeightsfById(id) {
        // switch statement looking for cases
        switch (id) {
            case 1:
                // truncating a table deletes all records
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

    // inserts a new weight record into the associated weights table of a shelf (found by id), used to manually add weight data in the help page
    static addWeightbyId(id, weight) {
        switch (id) {
            case 1:
                return dbPromise.execute(
                    'INSERT INTO id1weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            case 2:
                return dbPromise.execute(
                    'INSERT INTO id2weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            case 3:
                return dbPromise.execute(
                    'INSERT INTO id3weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            case 4:
                return dbPromise.execute(
                    'INSERT INTO id4weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            case 5:
                return dbPromise.execute(
                    'INSERT INTO id5weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            case 6:
                return dbPromise.execute(
                    'INSERT INTO id6weights (weight) VALUES (?)',
                    [weight]
                );
                break;
            default:
                return console.log('error, no such table')

        }
    }
}