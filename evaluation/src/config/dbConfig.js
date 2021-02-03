/*export const dbConfig = {
    client: "mysql",
    version: "5.7.25",
    connection: {
        host: 'evaluation_db',
        user: 'spork',
        password: 'ABBAIT',
        database: "evaluation"
    },
    useNullAsDefault: true
}
*/
export const dbConfig = {
    client: "sqlite3",
    connection: {
        filename: "./evaluation.sqlite",
        database: "evaluation"
    },
    useNullAsDefault: true
}