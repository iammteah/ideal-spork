import { Router, Request, Response } from 'express';
import { NextFunction } from "connect";
import { writeFeedbackToDb, writeResultstoDb } from "../service/DBService";

const router = Router();

//for test purpose only!

router.put('/:results', (req, res, next) => {
    
    writeResultstoDb(req.params);

    var queryID = req.params.query_id;
    req.params.results.forEach( (result,index,array) => {
            const { id } = result;
            const rank = index;
            console.log(id,rank)  
        //try write to db
        try{
            console.log(entry);
            //promisify writing to database
            writeFeedbackToDb(entry);
            //if resolved send 
            res.status(200)
            res.send(`wrote feedback with
                ${entry} to database`)
        } catch (e) {
            console.error(e);
            res.status(500)            
        }
    })      
});


router.get('/:id-:query-:feedback', (req, res, next) => {
    console.log(req.params);
    const { id, query, feedback } = req.params;
    res.json({
        id,
        query,
        feedback
    });
});

export const FeedbackController = router;