## The User Object
| Attribute | Description | Type |
|---------|-----------|----|
| userId | The user's unique identifier | string |
| name | The user's name | string |
| email |  The user's email address | string |

## Create a User
Creates and returns a new user

### URL
``` POST /api/users ```

### Body
| Key | Description | Type | Required? |
|-----|-------------|------|-----------|
|email| An email to associate with the account | string | Required |
|name| The user's name | string | Required |
|password| Used for password authentication | string | Required |

### Example Request [cURL]
```
curl -X POST 'http://localhost:5000/api/users/' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
--data '{
    "name": "Bob",
    "email": "bob@email.com",
    "password": "supersecretpassword"
}'
```

### Example Response
For status 200 - OK:
```
{
    "user": {
        "userId": "680d692a-6989-5714-a798-0b5fceca823g",
        "name": "Bob",
        "email": "bob@email.com"
     }
}
```
