# remainderGoods

Чтобы начать работать с сервисами, нужно:

1. Прописать свой .env файл на основе .env.example

2. Установить зависимости, cоздать и наполнить таблицы:

```
npm install
docker-compose up
```

3. Запустить сервис

```
make start_service
```

4. Производить соответсвующие запросы через postman или curl, для запросов админа можно получить токен уже существующего юзера:

```
{
    "password": "root",
    "email": "emailAdmin@.com"
}
```

Диаграмма сущностей:
https://drive.google.com/file/d/1EZxKZ158UFdV7rYaqnyCjXiFOGV1dQ-x/view?usp=sharing

Адрес swagger: api/docs
