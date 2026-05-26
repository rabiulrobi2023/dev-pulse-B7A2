# Dev Pulse Server
Live URL:  https://assignment-02-nu-gold.vercel.app/
### Features:
 ###### Create User: 
User can create an account as contributor or maintainer. User must provide name, email, password, and role
 ###### User Login: 
After creating user account successfully user can login using registered email and password.
 ##### Create Issue: 
Registered user can create an issue by providing issue title, description, and type.

 ###### Get all Issues: 
Registered user can view all issues.

  ###### Get Single Issue: 
A registered user can view a specific issue using issue id.

 ###### Update Issue: 
A registered user which role is contributor can update his own issues and maintainer  can any issues.


### Uses Technologies:
- ExpressJS
- Typescript
- PostgreSQL
- jwt
- brcypt
### Project Setup
- Open your project folder in vs code
-  Now install:
	- npm
	- typescript
	 - express
	- cors
	- pg
	- jwt
	- dotenv
	- bcrypt

- Create your folder structure as follows:
 ![[Pasted image 20260526221854.png]]

### API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | /api/auth/signup      | Signup a new User         |
| POST   | /api/auth/login       | Login user                |
| POST   | /api/issues           | Create a new issue        |
| GET    | /api/issues           | Get all issues            |
| GET    | /api/issues/:id        | Get single issue by id   |
| PATCH  | /api/issues/:id       | Update an issue           |
| DELETE | /api/issues/:id       | Delete an issue           |

### Database Schema
##### User Schema:
```
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(15) NOT NULL DEFAULT 'contributor',

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
```

##### Issues Schema:
```
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT CHECK(LENGTH(description) >= 20),
      type VARCHAR(20) NOT NULL CHECK(type IN ('bug', 'feature_request'))
      status VARCHAR(20) NOT NULL DEFAULT 'open',
      reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
      
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

```
