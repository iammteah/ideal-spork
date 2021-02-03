# Political Speech Search

by Aaron Blankenburg, Bashar Asaad & Immanuel Thoke

# How to Run
* Requirements:
0. any Linux distribution with `sudo`
1. Docker-ce 18+
2. docker-compose 1.20+
3. account for docker hub to pull the images

to start the project simply `cd` into the directory of the project and execute `./start-project.sh`. If you can't establish a connection to the internet or you don't have an account for the docker hub, please execute `./init-project.sh` to build the docker-images locally and get the project started so! 

If in any case these shell-scripts will fail use
`docker-compose -f docker-compose.yml up -d ` for a normal start or
`docker-compose -f docker-compose.local.yml up -d --build` if you want to build the images on your own!

Have fun!

The search engine will be available in our browser at: http://localhost:8080/

# Description of the repository

##./data
`../evaluation` contains the sqlite-database-file of our first evaluation-iteration
`../sample` contains just the sample-core provided officially by solr for learning proposals and the query.csv for the evaluation server
`../solr-env` contains the whole individual solr configuration of our project, including the log files
in `../src` you can find the data-set we used to retrieve information with solr
##./docs
contains some notes for our evaluation proposal and of former projects of the information retrieval course
##./evaluation
contains the source code for the evaluation server. You can use it as a standalone software if you have `node` installed, install the packages with `npm` or `yarn` and execute the `start.js` with node
##./frontend
contains the source code for the frontend of our search engine. Watch the package.json and tsconfig.json for some insights!
##./
contains all files to run our project