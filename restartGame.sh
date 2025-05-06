#!/bin/bash

# Check if gameID is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <gameID>"
  exit 1
fi

GAME_ID=$1
BASE_URL="http://localhost:8085"

# Execute the curl command
curl -X POST "$BASE_URL/restartGame" \
-H "Content-Type: application/json" \
-d "{\"gameID\": \"$GAME_ID\"}"

echo ""
echo "Restart game request sent for gameID: $GAME_ID"