import { Router, Request, Response } from 'express';
import { getQueryFromDb, getAllQueriesFromDb, writeQueryToDb } from "../service/DBService";
const router = Router();

router.put('/:text', async (req, res) => {
    try {
        const { text } = req.params;
        await writeQueryToDb(text);
        res.status(200).send(`wrote query "${text}" to database`);
    } catch (e) {
        res.status(500).json(e);
    }
});

//get query with specific id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = await getQueryFromDb(id);
        if (!query) res.sendStatus(404);
        res.status(200).json(query);
    } catch (e) {
        res.status(500).json(e);
    }
});

//get all queries
router.get('/', async (req,res) => {
    try {
        const queries = await getAllQueriesFromDb();
        if (!queries) res.sendStatus(404);
        res.status(200).json(queries);
    } catch (e) {
        res.status(500).json(e);
    }
});


export const QueriesController = router;