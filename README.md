# Ray-chat

This project was developed to learning good practices and techniques commonly used in the software development work.

Initially will find a simple REST API developed with Node.JS with Postgres DB, a front-end web application developed with React.JS (futurely will be developed one with React Native as well), but in the futere the project will be converted to a microservice architecture implementing GraphQL, MongoDB and Postgres, Redis and maybe RabbitMQ.


### REST API Node

If you would like to test this API with use of your one front-end or with a REST Client you can do with the use of the endpoints:
  #### ⋄ /users
  Used to list, find, create, update or remove Users.
  
  #### ⋄ /users/auth
  This endpoint is exclusive to authenticate user login and return a JWT Token in response.
  
  #### ⋄ /users/chats
  Used to list, find, create, update or remove chats that are assigned to a specified user.
  
  #### ⋄ /chats
  Used manage all Chats in the application, making possible to list all chats, find, update or remove.
  
  #### ⋄ /chats/messages
  Used to access and manage messages assigned to some chat.
