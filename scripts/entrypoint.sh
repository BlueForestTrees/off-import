#!/usr/bin/env bash

set -e

printf "\n[-] Starting local MongoDB...\n\n"
exec mongod --storageEngine=wiredTiger &


# Set a delay to wait to start the Node process
if [[ $STARTUP_DELAY ]]; then
  echo "Delaying startup for $STARTUP_DELAY seconds..."
  sleep $STARTUP_DELAY
fi

# Start app
echo "=> Starting app on port $PORT..."
exec "$@"