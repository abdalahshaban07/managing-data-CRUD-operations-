# Task

Develop a simple backend that helps a user manage any list of restaurants.

## Requirements

- clone the repository
- run `npm install`
- run `npm start`

## resturants API Reference

#### Get all resturants

```http
  GET /resturants
```

#### Get resturant BY ID

```http
  GET /resturants/:id
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of resturant to fetch |

#### Get resturant by UniqueName

```http
  GET /resturants/unique-name/:unique-name
```

| Parameter     | Type          | Description                                     |
| :------------ | :------------ | :---------------------------------------------- |
| `unique-name` | `unique-name` | **Required**. unique-name of resturant to fetch |

#### Get all resturants by Cuisine

```http
  GET /resturants/cuisine/:cuisine
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `cuisine` | `string` | **Required** cuisine to fetch |

#### create a new resturant

```http
  POST /resturants
```

| Parameter    | Type     | Description                                                                              |
| :----------- | :------- | :--------------------------------------------------------------------------------------- |
| `name`       | `string` | **Required** name of resturant                                                           |
| `cuisine`    | `string` | **Required** cuisine of resturant                                                        |
| `uniqueName` | `string` | **Required** uniqueName of resturant                                                     |
| `location`   | `object` | **Required** location of resturant { type: 'Point', coordinates: [longitude, latitude] } |

#### find nearby restaurants within 1 KM based on location

```http
  GET /resturants/nearby/:lng/:lat
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `lng`     | `number` | **Required** longitude |
| `lat`     | `number` | **Required** latitude  |

#### update resturant

```http
  PUT /resturants/:id
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Id of resturant |

#### delete resturant

```http
  DELETE /resturants/:id
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Id of resturant |

## user API Reference

#### retrieve a list of users for a specific Cuisine

- User has Burgers as part of their Favorite Cuisines
- User has a restaurant where the Cuisine is Burger

```http
  GET /users/cuisine/:cuisine
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `cuisine` | `string` | **Required** cuisine to fetch |
