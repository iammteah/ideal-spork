import { Router, json } from 'express';
import { NextFunction } from "connect";
import { writeFeedbackToDb, getFeedbackFromDb, getAllFeedbacksFromDb } from "../service/DBService";

const router = Router();

router.use(json()); //middleware to parse application/json-request-bodies

router.put('/', (req, res, next) => {
    const { query_id, results } = req.body;
//    const entries = [];
//    entries.push(
    results.forEach( async (result,index) => {
        const { id, feedback } = result; //this id means the docID
        const { relevant } = feedback;
        const rank = index+1;  
        try{
            await writeFeedbackToDb(query_id,id,rank,relevant)
            /*let entry = {
                docID: id,
                rank: rank,
                relevant: relevant
            }
            return entry*/
        } catch (e) {
            console.error(e);
            res.status(500).json(e)            
        }
    })
    /*let feedbacks = JSON.parse({
        query_id: query_id,
        results: entries
    })*/    
    //if resolved send 
    res.status(200).send(`feedback for ${query_id} successfully written to database`)      
});

router.get('/', async (req, res, next) => {
    try {
        const feedbacks = await getAllFeedbacksFromDb();
        res.json(feedbacks);
    } catch (e) {
        res.status(500).json(e);
    }
})


router.get('/:queryID', async (req, res, next) => {
    const { queryID } = req.params;
    try {
        const feedback = await getFeedbackFromDb(queryID);
        res.json(feedback);
    } catch (e) {
        res.status(500).json(e);
    }
});

export const FeedbackController = router;