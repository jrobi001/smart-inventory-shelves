exports.getAddItem = (req, res, next) => {
    res.render('test/add-item-form'), {
        pageTitle: 'Add Item'
    }

}

exports.postAddItem = (req, res, next) => {
    const itemName = req.body.name;
    const tags = req.body.tags;
    const notes = req.body.notes;
    const price = req.body.price;
    const weight = req.body.weight;
    //call model method to insert data to db here
    console.log(itemName);
    console.log(tags);
    console.log(notes);
    console.log(price);
    console.log(weight);
    res.redirect('/');
}