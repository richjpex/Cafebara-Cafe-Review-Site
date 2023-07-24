import 'dotenv/config';

import express from "express";
import exphbs from "express-handlebars";
import routes from './routes/routes.js';
import db from './schemas/db.js';
import bodyParser from 'body-parser';
import Handlebars from 'handlebars';
const port = process.env.SERVER_PORT;

const app = express();

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(`public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(`/`, routes);

db.connect();

app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
});

Handlebars.registerHelper("equals", function(a , b, options) {
    if (a === b) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});