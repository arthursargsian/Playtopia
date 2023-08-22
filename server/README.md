!! DOCUMENTATION FOR Unknown-Games RESTful API (NodeJS, ExpressJS, MySQL, Sequelize) !!


1. Routes



!! 1. Authorization.

/auth/register - Registration page.
/auth/login - Login page.
/auth/profile - User's profile.
/auth/logOut - Logout page (destroys session)
/auth/createAdmin - Create user with admin rights. (Only admin.)

!! 2. Users.

/users/get-users - Get all users by row. (Only admin)
/users/get-user/:id - Get one user by uuid.
/users/update-user/:id - Update one user by uuid. (Only admin.)
/users/delete-user/:id - Delete user by uuid (Only admin.)

!! 3. Products.

/products/discover - Get all products.
/products/discover/:id - Get product by id.
/products/add-product - Create product (Only admin.)
/products/update-product/:id - Update product by id. (Only admin.)
/products/delete-product/:id - Delete product by id. (Only admin)