#!/bin/bash

# Check if gameID is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <gameID>"
  exit 1
fi

GAME_ID=$1
BASE_URL="http://localhost:8085"

# Execute the curl command
curl -X POST "$BASE_URL/getGameState" \
-H "Content-Type: application/json" \
-d "{\"gameID\": \"$GAME_ID\"}" \
