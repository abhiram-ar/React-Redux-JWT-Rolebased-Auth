# Project Specifications

### Create a web application
-	Redux for global state management
-	JWT authentication and authorization
-	Use preferred Database

 ### User side
- Login/Register
- Home page (navigation to user profile)
- User Profile page (must have file upload option for profile image)

### Admin side
- Login
- Should be able to view and perform search on user data
- Should be able to create, delete and edit user data

---

### Users Schema
- email: { type: String, index: true, unique: true }
- username: { type: String, required: true }
- password: { type: String, required: true }
- isAdmin: { type: Boolean, default: false }
- createdAt: { type: Date, default: Date.now() }

