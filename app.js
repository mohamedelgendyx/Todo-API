const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
/************************* Configrations *************************/
require('dotenv').config();
// only run all DB schemas
require('./models/todoModel');
require('./models/userModel');

const todoRouter = require('./routes/todoRoutes');
const authenticationRouter = require('./routes/authenticationRoutes');

const authenticationMW = require('./middlewares/authentcationMW');
const notFoundMW = require('./middlewares/notFoundMW');
const errorMW = require('./middlewares/errorMW');

const seedMW = require('./middlewares/databaseSeedMW');
const DBURI = process.env.DBURI || "mongodb://127.0.0.1:27017/todo-db";
const port = process.env.PORT || process.env.port || 3001;
mongoose.connect(DBURI)
    .then(() => {
        console.log('Connected to MongoDB successfully');

        // Apply the seed middleware
        seedMW();
        // open a connection
        app.listen(port, () => {
            console.log(`server is listening on ${port}`);
        })
    })
    .catch(error => console.log(`DB connection problem: ${error}`))



app.use(morgan('dev'));
app.use(express.json());

// signin/signup
app.use(authenticationRouter);
// MW to check if there is a token and hook that token in the request
app.use(authenticationMW);

/*************************** Routes ***************************/
app.use(todoRouter);

app.use(notFoundMW);

app.use(errorMW);
