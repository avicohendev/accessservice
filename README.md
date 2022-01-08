# accessservice


in order to start the server use npm start

server contains 4 routes:
1. POST - / creates api key 
    expects requet body which contains 
    {
        "userId" : string
        "authorizations" : string[]
    }
    in case of success returns the api key int response body
    {
    "apiKey": string
    }
2. POST - /authenticate - creates jwt
    expects request body which contains the api key
    {
        "apiKey" : string
    }
    in case of success return the jwt token
    {
    "token": string
    }
3. DELETE - /{:id}
    expects id path variable
    in case of success return success message
4. GET - /
    get given user apiKey
    expects request body which contains userId
    {
        "userId" : string
    }
    in case of success return array of apis and their status

    [
        {
            "apiKey": "************************************99db",
            "status": "active"
        },
        {
            "apiKey": "************************************tr45",
            "status": "revoked"
        }
    ]

