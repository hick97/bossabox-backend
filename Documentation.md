FORMAT: 1A

# VUTTR - backend

VUTTR - backend (Very Useful Tools to Remember) is a simple API that allows tool management.

# Group Users

Resources related to users in the API.

## User [/user]

### Create a New User [POST]

You may create your account using this action. It takes a JSON object containing name, email and password.

- name (string) - Full name
- email (string) - Email address
- password (string) - Password longer than six characters

* Request (application/json)

            {
                "name": "Henrique Augusto Pereira",
                "email": "youremail@provider.com",
                "password": "password123",
            }

- Response 201 (application/json)

  - Headers

          Content-Type: application/json; charset=utf-8

  - Body

        {

            "tools": [],
            "createdAt": "2019-11-02T19:47:45.152Z",
            "_id": "5dbddd645f1aa276e3432a7d",
            "name": "Henrique Augusto Pereira",
            "email": "youremail@provider.com",
            "password": "$2b$08\$rs1539qtMcWnXa2.nERHTeo3/KsR0YkPDPq7jyXJOZQNs2HOo5oeS",
            "__v": 0

        }

# Group Session

Resources related to user sessions in the API.

## Session [/session]

You may create a user session using this action. It takes a JSON object containing email and password.

- email (string) - Email address
- password (string) - Password longer than six characters

### Create a New Session [POST]

- Request (application/json)

            {
                "email": "youremail@provider.com",
                "password": "password123",
            }

- Response 200 (application/json)

  - Headers

          Content-Type: application/json; charset=utf-8

  - Body

        {

            "user": {
              "tools": [],
              "createdAt": "2019-11-02T19:47:45.152Z",
              "_id": "5dbddd645f1aa276e3432a7d",
              "name": "Henrique Augusto Pereira",
              "email": "youremail@provider.com",
              "password": "$2b$08\$rs1539qtMcWnXa2.nERHTeo3/KsR0YkPDPq7jyXJOZQNs2HOo5oeS",
              "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmRkZDY0NWYxYWEyNzZlMzQzMmE3ZCIsImlhdCI6MTU3MjcyNDM4NiwiZXhwIjoxNTcyODEwNzg2fQ.xMW1FZgSRz4oR54iBeFpdkSIKKFfQRevyYcLb740s4Y"

        }

# Group Tools

Resources related to tools in the API.

## Tools [/tools{?tag}]

### List All Tools [GET]

List all tools of logged user.

- Parameters

  - tag (string, optional)

    A specific tag to be filtered in tools.

- Request

  - Headers

          Authorization: Bearer `your token`

- Response 200 (application/json)

  - Headers

          Content-Type: application/json; charset=utf-8

  - Body

    [
    {

            "_id": "5dbdfdc5998d15029c424abd",
            "title": "Software",
            "link": "https://notion.so",
            "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
            "tags": [
              "node",
              "react",
              "collaboration",
              "writing",
              "calendar"
            ],
            "author": "5dbddd645f1aa276e3432a7d",
            "createdAt": "2019-11-02T22:05:57.664Z",
            "__v": 0

    }

    ]

### Create a New Tool [POST]

You may create a tool using this action. It takes a JSON object containing title, link, description, and tags.

- title (string) - The tool title
- link (string) - The tool link
- description (string) - The tool description
- tags (array[string]) - A collection of tool tags.

* Request (application/json)

  - Headers

          Authorization: Bearer `your token`

  - Body

        {
            "title": "hotel",
            "link": "https://github.com/typicode/hotel",
            "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
            "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
        }

* Response 201 (application/json)

  - Headers

          Content-Type: application/json; charset=utf-8

  - Body

        {
          "_id": "5dbdfdc5998d15029c424abd",
          "title": "hotel",
          "link": "https://github.com/typicode/hotel",
          "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
          "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
          "author": "5dbddd645f1aa276e3432a7d",
          "createdAt": "2019-11-02T22:05:57.664Z",
          "__v": 0
        }

## Tools [/tools/{id}]

- Parameters
  - id (ObjectId) - ID of the Tools

### Updating Tool [PUT]

You may update a tool using this action. It takes a JSON object containing at least a title, link, description, or tags.

- title (string) - The tool title
- link (string) - The tool link
- description (string) - The tool description
- tags (array[string]) - A collection of tool tags.

* Request (application/json)

  - Headers

          Authorization: Bearer `your token`

  - Body

        {
            "title": "new name",
            "link": "https://newurl.com/typicode/hotel",
            "description": "New description.",
        }

* Response 204 (application/json)

  - Headers

          Content-Type: application/json; charset=utf-8

  - Body

        {
          "_id": "5dbdfdc5998d15029c424abd",
          "title": "new name",
          "link": "https://newurl.com/typicode/hotel",
          "description": "New description.",
          "tags":["node", "organizing", "webapps", "domain", "developer", "https", "proxy"],
          "author": "5dbddd645f1aa276e3432a7d",
          "createdAt": "2019-11-02T22:05:57.664Z",
          "__v": 0
        }

### Deleting Tool [DELETE]

- Request

  - Headers

          Authorization: Bearer `your token`

* Response 204
