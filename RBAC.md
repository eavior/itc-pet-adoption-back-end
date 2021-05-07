users
POST
/signup - everyone
/login - everyone
GET
/user/:id - user, admin
/user/:id/full - user, admin
/user - admin
PUT
/user/:id - same user, admin
/user/:id/admin - admin
DELETE
/user/:id - admin

pets
POST  
 /pet - admin
/pet/:id/status - user, admin
/pet/:id/save - user, admin
GET
/pet/:id - user, admin
/pet/? - user, admin
/pet/user/:id - user, admin
/pet/all - user, admin
/pet/:id/user/:id - user, admin
PUT
/pet/:id - admin
DELETE
/pet/:id/save - user, admin
/pet/:id - admin
