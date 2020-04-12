const express = require('express');
const bodyParser = require('body-parser');

const mainController = require('../controllers/mainController');

const router = express.Router();

//routes can be placed here as in data web if wanted
// router.get('/', (req, res, next) => {
//     res.redirect('/home');
//     // res.render('dev-home');
// });

router.get('/', mainController.getShelfOverviewList);

router.get('/shelf-details-layout', mainController.getShelfDetails);

router.get('/template-example', (req, res, next) => {
    res.render('template-example', {
        pageTitle: 'template example',
        successMessage: res.locals.successMessages,
        failMessage: res.locals.failMessages
    });
});

// router.get('/test-upload', (req, res, next) => {
//     res.render('test/upload', {
//         pageTitle: 'test upload',
//         successMessage: res.locals.successMessages,
//         failMessage: res.locals.failMessages
//     });
// });

// router.post('/test-uploaded', (req, res, next) => {
//     upload.single('shelfImage')(req, res, (err) => {
//         if (err) {
//             console.log(err.message);
//             res.send('fail')

//         } else {
//             if (req.file == undefined) {
//                 console.log(req.file);
//                 console.log('Error: No File Selected!');
//                 res.send('fail')
//             } else {
//                 console.log(req.file);
//                 console.log(req.file.path);
//                 console.log('/images/upload/' + req.file.filename)
//                 res.send('success');
//             }
//         }
//     })
// })

module.exports = router
