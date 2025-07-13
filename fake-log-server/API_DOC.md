# Fake Log Server API

## Базовый URL

- http://10.0.2.2:3000
- http://localhost:3000

## Эндпоинты

### POST /logs/user-action
Логирование действия пользователя.

**Тело запроса:**
```
{
  "event": "string",        // действие пользователя
  "deviceId": "string",     // идентификатор устройства
  "timestamp": "string"     // (опционально) время события
}
```
**Ответ:**
- 200 OK, json с сохранённым логом

### GET /logs/message?deviceId=...
Получение сообщения для устройства.

**Параметры запроса:**
- deviceId: string

**Ответ:**
```
{
  "message": "string"
}
```

### POST /logs
(Старый эндпоинт, не рекомендуется)

**Тело запроса:**
```
{
  "email": "string",
  "password": "string"
}
```

### GET /logs
Получить все логи.

### DELETE /logs
Очистить все логи.

## CORS

Доступ разрешён с адресов:
- http://10.0.2.2:3000
- http://localhost:3000

## Пример работы с Flutter
См. файл fake_api.dart в клиенте.
