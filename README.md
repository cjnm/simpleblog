# simpleblog

## Introduction

Simpleblog is a ExpressJS React app which uses DynamoDB as storage and Redis for cahing.

The features of the APi are:

- Logged in user can create, update, delete and read blogs
- Public user can read blog and can signup with github

##### Other Features

- Github Auth
- Runs on multithreaded CPU with node cluster module
- Uses local dynamoDB
- Runs on docker
- API caching with redis. Invalidates when any data updates else remains persistant.

## Setup

### Prerequisite

- NodeJS (latest LTS version)
- DynamoDB Local

### Install

- Install dependency for frontend and backend

```
cd api
yarn

cd ..
cd frontend
yarn
```

- Setup environment variable

```
cd api
cp .env.example .env

cd ..
cd frontend
cp .env.example .env
```

Update the environment variables with necessary parameters. For `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` get a new token and secret from <https://github.com/settings/developers>.

- Seed database (database table names is to be defined in .env file)

```
cd api
yarn migrate
```

- Starting the backend

```
yarn start
```

- Starting the frontend

```
yarn start
```

### Docker

To run the API in docker set the `JWT_SECRET`, `GITHUB_CLIENT_SECRET`, `GITHUB_CLIENT_ID` and other environment variables in `docker-compose.yml` file and run the command `docker compose up --build` inside the `api` folder.

## Implementation

### Endpoints

There are five endpoints available for fetching, updating and deleting blogs and two for internal github authentication.
The `Postman Collection` is available from the link <https://www.getpostman.com/collections/0be1493ed18bb4391324> or from the file `simpleblog API Endpoints.postman_collection.json` available in this repo.

### Status Codes

simpleblog API returns the following status codes.

| Status Code |         Description          |
| :---------- | :--------------------------: |
| 200         |             `OK`             |
| 401         | `BAD REQUEST` `Unauthorized` |
| 500         |   `Internal Server Error`    |

#### Success Response Example

```
{
    success: true
    status: 200,
    data: [] //where applicable
}
```

#### Failure Response Example

```
{
    success: false
    status: 401,
    message: ''
}
```

### Authentication

Github Auth has been used for user signup and user creation and JWT Auth has been used for API calls.

#### Auth header for API calls

```
{
    Authorization: JWT_token,
    'X-User-Id': github_user_id,
    'X-User-Username': github_user_name,
    'X-User-Avatar': github_avatar_url
}
```

###### JWT token and user details can be found on browser local storage for loggedin user using `localStorage.getItem('simpleblog-user')` comand on browser console.

###### The `X-User-Avatar` header is optional.

## Blog Endpoints

#### Get a list of all the blog posts.

`GET /blog`

###### 1. Auth header not required.

##### Response Example

```
{
    "success": true,
    "data": [
        {
            "id": "2feec604-d74b-4a96-a45b-738f147b59ce",
            "title": "New blog by test user",
            "avatar_url": "https://avatars.githubusercontent.com/u/102871239?v=4",
            "user_id": 102871239,
            "content": "This is a blog body.",
            "username": "cjnm"
        },
        {
            "id": "ee8b08ec-2b87-438d-a7e5-bbbb639de722",
            "avatar_url": "https://avatars.githubusercontent.com/u/75179634?v=4",
            "title": "The short blog",
            "user_id": 75179634,
            "content": "This is another short blog",
            "username": "cjnm"
        }
    ],
    "status": 200
}
```

#### 2. Get a list of all the blog posts from current user.

`GET /blog/user/:user_id`

###### Auth header required.

##### Response Example

```
{
    "success": true,
    "data": [
        {
            "id": "2feec604-d74b-4a96-a45b-738f147b59ce",
            "title": "New blog by test user",
            "avatar_url": "https://avatars.githubusercontent.com/u/75179634?v=4",
            "user_id": 102871239,
            "content": "This is a blog body.",
            "username": "cjnm"
        },
        {
            "id": "ee8b08ec-2b87-438d-a7e5-bbbb639de722",
            "avatar_url": "https://avatars.githubusercontent.com/u/75179634?v=4",
            "title": "The short blog",
            "user_id": 75179634,
            "content": "This is another short blog",
            "username": "cjnm"
        }
    ],
    "status": 200
}
```

#### 3. Create a new blog under current user.

`POST /blog/new`

###### Auth header required.

##### Payload Example

```
{
    "title": "Blog title",
    "content": "blog content"
}
```

##### Response Example

```
{
    "success": true,
    "status": 200
}
```

```
{
    "success": false,
    "status": 401,
    "message": "Blog contents cannot be empty."
}
```

#### 4. Update a blog under current user.

`PUT /blog/:blog_id`

###### Auth header required.

##### Payload Example

```
{
    "title": "Blog title",
    "content": "blog content"
}
```

##### Response Example

```
{
    "success": true,
    "status": 200
}
```

```
{
    "success": false,
    "status": 401,
    "message": "Cannot update blog with empty contents."
}
```

#### 5. Delete a blog under current user.

`Delete /blog/:blog_id`

###### Auth header required.

##### Response Example

```
{
    "success": true,
    "status": 200,
}
```

Thankyou!
