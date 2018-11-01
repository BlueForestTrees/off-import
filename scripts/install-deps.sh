#!/bin/bash

set -e

printf "\n[-] Installing base OS dependencies...\n\n"

apt-get update -y

apt-get install -y --no-install-recommends curl
