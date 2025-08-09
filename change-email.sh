#!/bin/bash

# List of emails to change (keep YahyaMoaad's emails untouched)
OLD_EMAILS=("your.email@example.com" "afkirmohamed4@gmail.com")
CORRECT_EMAIL="afkirmohamad4@gmail.com"
CORRECT_NAME="Your GitHub Username"  # Replace with your actual name

git filter-branch --env-filter '
if [[ "${OLD_EMAILS[@]}" =~ "$GIT_COMMITTER_EMAIL" ]] && [ "$GIT_COMMITTER_NAME" != "YahyaMoaad" ]; then
    export GIT_COMMITTER_NAME="'"$CORRECT_NAME"'"
    export GIT_COMMITTER_EMAIL="'"$CORRECT_EMAIL"'"
fi
if [[ "${OLD_EMAILS[@]}" =~ "$GIT_AUTHOR_EMAIL" ]] && [ "$GIT_AUTHOR_NAME" != "YahyaMoaad" ]; then
    export GIT_AUTHOR_NAME="'"$CORRECT_NAME"'"
    export GIT_AUTHOR_EMAIL="'"$CORRECT_EMAIL"'"
fi
' --tag-name-filter cat -- --all