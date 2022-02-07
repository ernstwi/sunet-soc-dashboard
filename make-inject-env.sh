#!/usr/bin/env bash

source env.sh
INJECT_FILE_SRC="inject_template.js"
INJECT_FILE_DST="dist/inject.js"
envsubst < "${INJECT_FILE_SRC}" > "${INJECT_FILE_DST}"
