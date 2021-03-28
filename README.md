# TOOL-MARKET-BE

# Tools Market

## Features

- User can **sign up**
- User can **sign in**
- Users can **post tools for rent**
- Users can **view tools available for rent**
- Users can **can borrow tools**
- Admin can **view list of tools awaiting approval**
- Admin can **approve or reject a tool**
- Admin can **view list of users**
- Admin can **suspend or reactivate a user**

## Technologies

- HTML
- CSS
- Javascript

## API-ENDPOINTS

**V1**

`- POST /api/v1/users/register Create a new user.`

`- POST /api/v1/users/login Login a user.`

`- PUT /api/v1/tools/update/:id User borrow tool.`

`- POST /api/v1/tools/add Post tools.`

`- GET /api/v1/users Admin get all users.`

`- PUT /api/v1/users/update/:id update status of use(activate or suspend user).`

`- PUT /api/v1/tools/pending Admin get pending tools.`

`- PUT /api/v1/tools/approve/:id Admin approve tool.`

## Template UI

You can see a hosted version of the template at [https://bobobalde05.github.io/TOOLS-MARKET-FRONTEND/index.html](https://bobobalde05.github.io/TOOLS-MARKET-FRONTEND/index.html)

### API

The API is currently hosted at

[https://toolsmarket.herokuapp.com](https://toolsmarket.herokuapp.com)
