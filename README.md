## Getting Started

## Installation
```bash
  $ npm install
  $ npm run start
```

## Setup ENV
```exampe
  PORT=8080

  DB_NAME=media_database
  DB_USERNAME=root
  DB_PASSWORD=
  DB_HOSTNAME=localhost

  HOSTNAME=http://localhost:8080
```
## Database Migration and Seeder
```bash
  $ npx sequelize db:migrate
  $ npx sequelize db:seed:all
```

## Description
  This sevice will handle media storage for the application. 

  Image should be base64. For testing, you can follow the website `https://base64.guru/converter/encode/image` to parsing your image to base64

## API Documentation
- you can see the API Documentation in the api-docs.rest file

## API Contract

- [Create new image](#create-new-image)
- [Get All](#get-all)
- [Delete](#delete)


### Create New Image

### Description
This api for create new image media

### Method
`POST`

### URL
```diff
{URL_API}/media
```

### Body
```diff
{
  "image": "image-parsing-base64"
}
```
### Response
```diff
{
    "status": "success",
    "data": {
        "id": 9,
        "image": "localhost:8080/images/1671766912596.png"
    }
}
```
### Error Response
email is exist
```diff
{
    "status": "error",
    "message": "invalid base64"
}
```

<br>
<br>

---

### Get All

### Description
This api for get all image media

### Method
`GET`

### URL
```diff
{URL_API}/media
```

### Response
```diff
{
    "status": "success",
    "data": [
        {
            "id": 2,
            "image": "localhost:8080/images/1671710225277.png"
        },
        {
            "id": 3,
            "image": "localhost:8080/images/1671710269546.png"
        },
        {
            "id": 4,
            "image": "localhost:8080/images/1671719577992.png"
        },
        ...
    ]
}
```
<br>
<br>

---

### Delete

### Description
This api for delete image media

### Method
`DELET`

### URL
```diff
{URL_API}/media/{media_id}
```

### Response
```diff
{
    "status": "success",
    "message": "image deleted"
}
```

### Error Response
```diff
{
    "status": "error",
    "message": "media not found"
}
```

<br>
<br>

---