import { dbConfig } from "../config/dbConfig";
const knex = require('knex')(dbConfig);

//select data

// just for learnings - this won' work
/*export const getQueryFromDb = async (id) => {
  try {
    //wait till knex fetches data
    await knex.select()
      .table('queries')
      .where({ id: id })  //first generate query-statement
      .then( (rows) => {  //then call the interface for promised data retrieval
        console.log(`
          raw-data:\n
          rows: ${rows}
          rows[0]: ${rows[0]} , ${rows[0].id}, ${rows[0].term}
        `)  //getting query-data as an array of rows and make a JSON-Object with JSON.stringify out of it
        const query = JSON.stringify({
            id: `${rows[0].id}`,
            text: `${rows[0].term}`
        });
        console.log(`data from db with query-id ${id}: ${query}`)
        return query;
      });
    } catch (e) {
      throw e;
    }
  }
*/
export const getQueryFromDb = async (id) => {
  return (
    await knex.select()
            .table('queries')
            .where({ id: id })
  )[0]
}

export const getAllQueriesFromDb = async () => {
  return await knex.select().table('queries')
}

export const getAllResultsFromDb = async () => {
  const results = await knex.select().table('results')
  return results;
}

export const getAllFeedbacksFromDb = async () => {
  const feedbacks = await knex.select().table('feedback')
  return feedbacks;
}

export const getFeedbackByQueryID = async (queryID) => {
  return await knex.select('docID', 'rank', 'isRelevant').table('feedback').where({
    query: queryID
  })
}

//write data
export const writeQueryToDb = async (text) => {
  return (
      await knex('queries').insert({
        term: text
      })
    )
}

//write single result to db
export const writeResultToDb = async (queryID,docID,rank) => {
  const [result, resultID] = await Promise.all([
    knex('results')
      .insert({
        query: queryID, 
        docID: docID,
        rank: rank
      }),
    knex.select('id')
      .from('results')
      .where({
        query: queryID,
        docID: docID,
        rank: rank
      })
  ])
  console.log(resultID)
  return resultID
  }

/*write array of results to db
export const writeResultsToDb = (res) => {
  const { query_id, results } = res;
  results.forEach( (result, index) => {
    knex('results').insert({
      query: query_id, 
      docID: result.id,
      rank: index
    })
  })
}
*/

/*export const writeFeedbackToDb = async (queryID,docID,rank,isRelevant) => {
  return (await Promise.all([
    knex('feedback').insert({
      query: queryID,
      result: await writeResultToDb(queryID,docID,rank), //const resultID = writeResultToDb(queryID,docID,rank)
      isRelevant: isRelevant
    }),
    knex.select('id')
    .from('results')
    .where({
      query: queryID,
      docID: docID,
      rank: rank
    })
  ]))
}*/

export const writeFeedbackToDb = async (queryID,docID,rank,isRelevant) => {
  await knex('feedback').insert({
      query: queryID,
      docID: docID,
      rank: rank,
      isRelevant: isRelevant
    })
}