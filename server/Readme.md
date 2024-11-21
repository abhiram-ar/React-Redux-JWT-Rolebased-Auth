### MongoDB connection string pattern
"mongodb+srv://<db_username>:<db_password>@cluster0.s3euj.mongodb.net/< dbname >?retryWrites=true&w=majority&appName=Cluster0"

### Users Schema
- email: { type: String, index: true, unique: true }
- username: { type: String, required: true }
- password: { type: String, required: true }
- isAdmin: { type: Boolean, default: false }
- createdAt: { type: Date, default: Date.now() }