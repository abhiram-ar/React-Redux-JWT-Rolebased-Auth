### TODOs
- Time-to-leave index for expired refreshtokens



### MongoDB connection string pattern
"mongodb+srv://<db_username>:<db_password>@cluster0.s3euj.mongodb.net/<-dbname->?retryWrites=true&w=majority&appName=Cluster0"

### Users Schema
- email: { type: String, index: true, unique: true }
- username: { type: String, required: true }
- password: { type: String, required: true }
- isAdmin: { type: Boolean, default: false }
- createdAt: { type: Date, default: Date.now() }

### Authentication and Authorization Details
- Authentication is implemented using email and password.
- When the user login, two JWT tokens are created.
  1. JWT access token
  2. JWT refresh token
- Refresh token is saved in the Database for future use
- Both the tokens are send back to the client.
- For the following authentication after the first auth, the client only need to send the access token in the "Authorization" header, if the access token is valid and not expired, user is seemlessly authenticated.
- If the access token is expired, then the client can visit the "/refresh" endpoint to get a new access token by providing a curresponding refresh token
- // add logout policy


## Critical Middlewares
#### `refresh()`
- 401 error - cookie of the the name "refreshJWT" not found in the HTTP header
- 403 error - refresh token send to the server is not valid or expired
- 200 ok - refresh token has been verified and new access token is created with latest user details 