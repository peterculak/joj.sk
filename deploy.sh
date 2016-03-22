#!/bin/bash

git pull;
rm -rf dist;
mkdir dist;
mkdir dist/bower_components;
cp -r bower_components/videojs dist/bower_components/;
cp -R bower_components/videojs/font dist/styles/;
gulp build;
