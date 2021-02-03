import express from "express";
import { QueriesController } from "./controllers/queries.controller";
import { FeedbackController } from "./controllers/feedback.controller";
import { initDB } from "./config/initDB";

//initialize database
initDB();

//start http-server
const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/feedback', FeedbackController);
app.use('/queries', QueriesController);
app.get('/', (req, res) => {
    console.log(req);
    res.send("This is the evaluation-server of <i>ABBAIT's ideal-spork</i> search engine!<br />Please use the endpoint <br /><b>/queries</b> to get stored query data (<b>/query/:id</b> for single query data) or<br /><b>/feedback</b> to store and request relevance feedback for each query!");
});

export const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
