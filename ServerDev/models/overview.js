module.exports = class Overview {

    // overview constructor, used for shelf overview page?
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

    // fetching item data and shelf settings of a shelf from shelf position (stored in different tables)
    // used on shelf overview pages - gets all data needed in one call
    static fetchShelvesJoinByPos(pos) {
        return dbPromise.execute(
            'SELECT * FROM items RIGHT JOIN shelves ON items.id = shelves.items_id WHERE shelves.shelfPosition = ?',
            [pos]
        )
    }

    // fetches item data for all shelf positions ordered by shelf id
    // used on shelf overview / home page to display info for all shelves
    // join right statement will always output an array 6 items even if shelf is empty
    static fetchAllShevesJoinItems() {
        return dbPromise.execute(
            'SELECT * FROM items RIGHT JOIN shelves ON items.id = shelves.items_id ORDER BY shelves.id ASC'
        );
    }

    // set of calls that output the most recent weight record from different weight tables based on shelf ids -----
    static fetchWeightId1() {
        return dbPromise.execute(
            'SELECT * FROM id1weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId2() {
        return dbPromise.execute(
            'SELECT * FROM id2weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId3() {
        return dbPromise.execute(
            'SELECT * FROM id3weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId4() {
        return dbPromise.execute(
            'SELECT * FROM id4weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId5() {
        return dbPromise.execute(
            'SELECT * FROM id5weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    static fetchWeightId6() {
        return dbPromise.execute(
            'SELECT * FROM id6weights ORDER BY id DESC LIMIT 0, 1'
        );
    }
    // ---------------------------------------------------------------------------------------------------------------

    // uses a switch statement to return the most recent weight record from a weights table when provided a shelf id
    static fetchWeightById(id) {
        switch (id) {
            case 1:
                return this.fetchWeightId1()
                break;
            case 2:
                return this.fetchWeightId2()
                break;
            case 3:
                return this.fetchWeightId3()
                break;
            case 4:
                return this.fetchWeightId4()
                break;
            case 5:
                return this.fetchWeightId5()
                break;
            case 6:
                return this.fetchWeightId6()
                break;
            default:
                return console.log('error, no such table')

        }
    }

    // this function returns an array of the most recent item weights
    // in an array in order of shelf id 1-6
    // takes an empty array as input
    // could be simplified using the style used in the Item.fetchItemNames() method
    static fetchAllWeights(weightArr) {
        return this.fetchWeightId1()
            .then(([data, meta]) => {
                //checking the table is not empty
                if (data[0] != null) {
                    //pushing a weight to the array
                    weightArr.push(data[0].weight);
                } else {
                    //if table empty push null - showing no weights
                    weightArr.push(null);
                }
                return Overview.fetchWeightId2();
            })
            .then(([data, meta]) => {
                if (data[0] != null) {
                    weightArr.push(data[0].weight);
                } else {
                    weightArr.push(null);
                }
                return Overview.fetchWeightId3();
            })
            .then(([data, meta]) => {
                if (data[0] != null) {
                    weightArr.push(data[0].weight);
                } else {
                    weightArr.push(null);
                }
                return Overview.fetchWeightId4();
            })
            .then(([data, meta]) => {
                if (data[0] != null) {
                    weightArr.push(data[0].weight);
                } else {
                    weightArr.push(null);
                }
                return Overview.fetchWeightId5();
            })
            .then(([data, meta]) => {
                if (data[0] != null) {
                    weightArr.push(data[0].weight);
                } else {
                    weightArr.push(null);
                }
                return Overview.fetchWeightId6();
            })
            .then(([data, meta]) => {
                if (data[0] != null) {
                    weightArr.push(data[0].weight);
                } else {
                    weightArr.push(null);
                }
                return weightArr
            })
            .catch(err => console.log(err));

    }

}