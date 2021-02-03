#!/bin/bash

sudo chmod -R o+rw data/solr-env/
sudo docker-compose -f docker-compose.evaluation.yml --verbose up -d