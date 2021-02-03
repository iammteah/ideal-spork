require('babel-register')({
    presets: [ 'env' ]
})
require('babel-polyfill');
const DBService = require('./src/service/DBService');
const readline = require('readline');

const main = async () => {

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.info(`You can now start to evaluate...type a queryID or term to move on...`)

const line = rl.on('line', async function(line){
    /*switch(line) {
        case typeof(Number):
        case typeof(String):
    }*/
    const feedback = await DBService.getFeedbackByQueryID(line);
    console.log(
        feedback.forEach( (feedback) => {
            feedback.isRelevant ? true : false ;
        })        
        
        )
})
const feedbacks = await DBService.getAllFeedbacksFromDb();
}
main();