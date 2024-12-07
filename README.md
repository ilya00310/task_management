# remainderGoods

Чтобы начать работать с сервисами, нужно:

1. Прописать свой .env файл на основе .env.example

2. Создать и наполнить таблицы:

```
make migrate_latest
make seed_run
```

3. Запустить сервис

```
make start_service
```

4. Производить соответсвующие запросы через postman или curl

Диаграмма сущностей:
https://drive.google.com/file/d/1EZxKZ158UFdV7rYaqnyCjXiFOGV1dQ-x/view?usp=sharing
