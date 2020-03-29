exports.autoCalcWeight = () => {
    console.log('Autocalc Running...');

    let sqlqueryinit = "SELECT id from shelves WHERE items_id != 'null' AND autocalc100Percent = '1'";
    db.query(sqlqueryinit, (err, result) => {


        if (result[0] != undefined) {
            var i;
            for (i = 0; i < result.length; i++) {
                let Id = result[i].id;

                let sqlquery0 = "select hundredPercent from shelves where id = ?";
                let record0 = [Id];
                db.query(sqlquery0, record0, (err1, result1) => {
                    if (err1) { throw err1 }
                    let currentcalibratedWeight = result1[0].hundredPercent;

                    // removed limit desc 0 1, to give an array of all weights
                    if (record0 == '1') {
                        var sqlquery1 = "select weight from id1weights order by dateTime desc";
                    }
                    if (record0 == '2') {
                        var sqlquery1 = "select weight from id2weights order by dateTime desc";
                    }
                    if (record0 == '3') {
                        var sqlquery1 = "select weight from id3weights order by dateTime desc";
                    }
                    if (record0 == '4') {
                        var sqlquery1 = "select weight from id4weights order by dateTime desc";
                    }
                    if (record0 == '5') {
                        var sqlquery1 = "select weight from id5weights order by dateTime desc";
                    }
                    if (record0 == '6') {
                        var sqlquery1 = "select weight from id6weights order by dateTime desc";
                    }
                    db.query(sqlquery1, (err2, result2) => {
                        if (err2) { throw err2 }

                        // adapting code to find the most recent highest weight, rather than just most recent
                        if (result2[0] != undefined) {
                            // console.log(Id);
                            // console.log(result2);
                            let largest = 0;
                            // iterating over weights
                            for (const result of result2) {
                                // the loop will stop if the next weight is not equal to or larger
                                if (parseInt(result.weight) >= largest) {
                                    largest = parseInt(result.weight);
                                } else {
                                    break;
                                }
                            }
                            console.log('most recent 100% for id' + Id + ' is ' + largest);

                            let weightval = largest;

                            if (weightval > currentcalibratedWeight) {
                                let sqlquery = "update shelves set hundredPercent = ? where id = ?";
                                let record1 = [weightval, Id];
                                db.query(sqlquery, record1, (err3, result3) => {
                                    if (err3) { throw err3 }

                                });
                            }
                        }
                    });
                });
            }
        }
    });
}