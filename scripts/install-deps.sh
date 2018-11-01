#!/usr/bin/env bash

set -e

printf "\n[-] Update, installing curl...\n\n"

apt-get update -y

apt-get install -y --no-install-recommends curl
