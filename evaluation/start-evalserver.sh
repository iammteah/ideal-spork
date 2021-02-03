#!/bin/bash

path="/home/immanuel/Schreibtisch/uni/MSc/InfRetr/project/ideal-spork/evaluation/dist/"

cd $path
yarn tsc;
node server.js
