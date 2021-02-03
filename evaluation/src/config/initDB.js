import fs from "fs";
import { parse } from "csv";
import assert from "assert";
import { dbConfig } from "./dbConfig";
const knex = require('knex')(dbConfig);

const parseQueryCSV = (csv) => new Promise ((resolve,reject) => {
    const queries = [];
    parse( (csv), {trim: true, skip_empty_lines: true})
    .on('readable', function() {
        let record
        while (record = this.read()) {
            queries.push(record)
            console.log(queries)
        }                    
    })
    .on('end', function() {
        resolve(queries);
    })
})

const checkDb = async () => {
    return await knex.select().table('queries').catch(function(error) {
        console.error(error);
        return undefined
    })
}

export const initDB = async () => {

    console.log("init database, create tables...");
    /*for test purpose only
    knex.schema.dropTableIfExists('queries').then(function(exists) {
        if (exists) return knex.schema.dropTableIfExists('queries')
    })*/
    knex.schema.hasTable('queries').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('queries', function(table) {
                table.increments('id').primary();
                table.string('term', 128);
                table.string('topic', 128);
            })
        }
    })
    /*
    knex.schema.hasTable('results').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('results', function(table) {
                table.increments('id').primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.integer('query')//.unsigned().notNullable();
                table.foreign('query').references('queries.id');
                table.string('docID');
                table.integer('rank');
            })
        }
    })

    knex.schema.hasTable('feedback').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('feedback', function(table) {
                table.integer('query')//.unsigned().notNullable();
                table.foreign('query').references('queries.id');
                table.integer('result')//.unsigned().notNullable();
                table.foreign('result').references('results.id');
                table.boolean('isRelevant');
            })
        }
    })*/
    knex.schema.hasTable('feedback').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('feedback', function(table) {
                table.increments('id').primary();
                table.timestamp('created_at').defaultTo(knex.fn.now());
                table.integer('query')//.unsigned().notNullable();
                table.foreign('query').references('queries.id');
                table.string('docID');
                table.integer('rank');
                table.boolean('isRelevant');
            })
        }
    })
    console.log("done.")

    const queries_db = await checkDb();
    if (!queries_db) {
        console.log("db is empty yet - load queries from file...");
        //load query-data from fs
        const queries_csv = await fs.readFileSync(__dirname + "/queries.csv")
        //parse csv
        const queries = await parseQueryCSV(queries_csv);
        //check database if queries are already loaded to db, else load them to db
        queries.forEach( (query) => {
            knex('queries')
                .insert({
                    term: query[0],
                    topic: query[1]
                })
                .then( () => console.log(`query ${query[0]} with topic ${query[1]} inserted`))
                .catch( (err) => { console.log(err); throw err })
            })
        }
}