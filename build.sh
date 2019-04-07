#!/usr/bin/env bash

rm ./assets/main.css

jekyll clean

npm run build-opt && jekyll build --safe
