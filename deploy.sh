#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'update docs'

git push -f https://github.com/JoeHR/JoeHR.github.io.git master

cd -
