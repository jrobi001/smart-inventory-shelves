const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/database');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/routes')
const testRoutes = require('./routes/testRoutes')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRoutes);
app.use(routes);


app.use(errorController.get404);

// http://localhost:3000/
app.listen(3000);