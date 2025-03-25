#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

# публикация в ветку gh-pages
git push -f git@github.com:romver2002/PlayVision.git master:gh-pages

cd - 