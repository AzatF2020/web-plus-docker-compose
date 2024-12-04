# Проект: "Докеризация приложения"

## Как найти:
- IP: 109.196.102.119
- Frontend: [https://kupipodary.nomorepartiesco.ru](https://kupipodary.nomorepartiesco.ru)
- Backend: [https://api.kupipodary.nomorepartiesco.ru](https://api.kupipodary.nomorepartiesco.ru)

## SSH подключение к серверу:
```
ssh root@109.196.102.119
```
Путь к папке проекта при подключении по ssh:
```
cd ~/web-plus-docker-compose 
```

## Клонирование проекта локально:
```
git clone git@github.com:AzatF2020/web-plus-docker-compose.git
```

## Развернуть проект локально (PROD):

```
make build && make up
```

### Команды для работы с compose:
- ```make up # Поднять контейнера```
- ```make build # Билд контейнеров```
- ```make down # Удалить контейнеры```
- ```make bash_frontend # Перейти в bash терминал frontend```
- ```make bash_backend # Перейти в bash терминал backend```

--------
## Развернуть проект локально (DEV):
```
make build_dev && make up_dev
```

### Команды для работы с compose:
- ```make up_dev # Поднять контейнера```
- ```make build_dev # Билд контейнеров```
- ```make down_dev # Удалить контейнеры```
- ```make bash_frontend_dev # Перейти в bash терминал frontend```
- ```make bash_backend_dev # Перейти в bash терминал backend```

-------
## Порты
- Бекенд принимает запросы на внешнем порту :4000 перенаправляет на 3000;
- Фронтенд принимает запросы на внешнем порту :8081 (DEV: перенаправляет на внутренний :3000; Prod: перенаправляет на :80, который потом раздает nginx)

## Запросы на бекенд в зависимости от среды (DEVELOPMENT/PRODUCTION)
Фронтенд в зависимости от среды меняет API_URL бекенда. Путь: ~/web-plus-docker-compose/frontend/src/utils/constants.js
