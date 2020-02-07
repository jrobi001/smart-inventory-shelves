//All this file does is hard code the root directory (of app.js)
//When imported to routes files properly this means paths can
//all be written relative to the main folder (rather than writing to move a folder or two up)

const path = require('path');

module.exports = path.dirname(process.mainModule.filename);