# Evento Z-API

Description: Integration system with API`s to create events and send them.

Conteudo:

- Announcements;
- Receivers;
- Events;
- Keycloak

# How To use the Keycloak:

- https://www.keycloak.org/documentation
- https://www.npmjs.com/package/nest-keycloak-connect

### How the access token is generated:

Utilizamos alguns parametros do proprio keycloak e o Postman para gerar o token de acesso no sistema:

- Token Name=global-events;
- Access Token URL: Url;
- Client ID: Name to the project;
- Client Secret: Secret;
- Username: Your user email in system;
- Password: Your password do system;
- Scope: openid.

## Exemaple of the Permissions do Keycloak:

- global-events-api-create: Allow who was the access can create events on system.
- global-events-api-read: Allow who was the access can see all events on system.
- global-events-api-update: Allow who was the access can update events on system
- global-events-api-delete: Allow who was the access can delete events on system.

## Erros in Keycloak on application:

- No authenticate: token expire;
- No authorazed: user dont have permission to access this route.

## Z-API:

Z-API is a RestFul service that provides an API that allows you to interact with your Whatsapp through a simple and intuitive API, as well as webhooks to warn you about relaxed with your number.

## MailTrap:

Test, Send, Control your email infrastructure in one place. Start today - Sign Up free! Get your emails into customers' inboxes just in time.Test, Send, Control your email infrastructure in one place. Start today - Sign Up free! Get your emails into customers' inboxes just in time. Start today - Sign Up free! Free plan. Affordable pricing. Effortless maintenance. Trusted by 150k teams. Responsive support.

## Can connect with databases in the moment:

- Postgres

### Dependencies to run the project:

- Baixar o projeto usando no terminal(ambos) git clone https://github.com/Leonardorossato/evento-backned-nestjs.git

## Windows :

- Ter instalado o node.js[Node]: (https://nodejs.org/en/), da versão >=16.17.0 a <=18.13.0 LTS (Windows);
- Ter instalado o Docker no Windows [Docker]: (https://docs.docker.com/desktop/install/windows-install/)
- Ter instalado o banco de dados DBeaver[DBeaver]: (https://dbeaver.io/).

## Linux(Distros):

- Instalar a biblicoteca [yarn]: utilizando o comando no terminal(ambos): npm i -g yarn;
- No Linux utilizar o nvm[NVM] da versão >=16.17.0 a <=18.13.0 LTS (Linux):
  (https://www.vultr.com/docs/install-nvm-and-node-js-on-ubuntu-20-04/?utm_source=performance-max-latam&utm_medium=paidmedia&obility_id=17096555207&utm_adgroup=&utm_campaign=&utm_term=&utm_content=&gclid=CjwKCAiAzp6eBhByEiwA_gGq5Eka0fc_LJS1BTyqY6UhGIbVdIgXMkD8Xz9LKXbGQdmb27pwpFf3_RoCawYQAvD_BwE);
- Docker Linux [Docker]: (https://docs.docker.com/engine/install/ubuntu/)
- Ter instalado o banco de dados DBeaver[DBeaver]: (https://dbeaver.io/).

# API Operation

## Rota de Login:

To login to the system we need to login with username and password.

http://localhost:7000/api/Autenciação/auth/login
EX:

```
{
  "username": "testeste@gmail.com",
  "password": "kiehnrfou3289h"
}
```

- If authentication is correct, return a token to be used in the API;
- If the email or password are wrong, return error 401.

## Receiver route:

This route returns all recipients that are registered in the system.

EX:
http://localhost:7000/api#/Recebedores/RecebedoresController_findAll

```
[
    {
    "id": 1,
    "fullname": "Teste",
    "email": "olamudo@gmail.com",
    "whatsapp": "552799675994",
    "cellphone": "552799675994",
    "message": "ola mundo",
    "createdAt": "2023-01-18T23:31:57.949Z"
  }
]
```

- If it has data, it returns all recipients;
- If there is no data in the registered database, it returns empty If there is no data in the registered database, it returns empty:

```
[]
```

- Now if an error occurs, it returns error 500;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Route recipients by unique identifier(Id):

Ex:
http://localhost:7000/api#/Recebedores/RecebedoresController_findOne

- To find a recipient use the Id as a search parameter:

EX:

```
Parametro: id:1

{
  "id": 1,
  "fullName": "string",
  "email": "string",
  "whatsapp": "string",
  "telefone": "string",
  "message": "string",
  "createdAt": "2023-01-19T14:51:45.873Z"
}

```

- If it has the id typed by the user it will return status 200 with the result of the id typed;
- If the id entered by the user does not exist, it will return error 400, not found;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to update receiver:

http://localhost:7000/api#/Recebedores/RecebedoresController_update
EX:

Parametro: id: 1

```
{
  "fullName": "Leoanrdo 32423cds",
  "email": "tresteaqui@gmail.com",
  "whatsapp": "279965852210",
  "telefone": "279965852210",
  "message": "bom dia"
}
```

- If the body data passed by the user are correct, it will return a message that
  the data was updated successfully;
- If the Id entered by the user is not found, it will return a 404 error;
- If the data passed by the user inside the body is wrong, it will return a 404 error;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Rote to delete a receiver:

http://localhost:7000/api#/Recebedores/RecebedoresController_remove
EX:

```
Parametro: id: 1
```

- If the Id entered by the user was found, it will return a message that the recipient was successfully deleted from the system;
- If the id entered by the user is not found, it will return a 404 error;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Rote to see all the receivers:

http://localhost:7000/api#/Comunicados/ComunicadosController_findAll

Ex:

```
[
  {
    "fullName": "string",
    "email": "string",
    "whatsapp": "string",
    "cellphone": "string",
    "message": "string"
    "createdAt": "2023-01-19T14:51:52.738Z"
  }
]
```

- If it has data from the announcements, it will return 200 Ok, with all the announcements registered in the system,
- If there is no data yet in the system, it returns status 200 Ok, with an empty array:

```
[]
```

- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Rote to create a Announcement:

http://localhost:7000/api#/Comunicados/ComunicadosController_create

Ex:

```
{
  "creatorAnnouncements": "string",
  "releasetTitle": "string",
  "creatorsEmail": "string",
  "communiquéContent": "string"
}
```

- If all data is passed in the body, it will return status 201, that an announcement was successfully created;
- If any field in the body of the release is wrong, it will return a status 404 error;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Route to get an announcement by Id:

http://localhost:7000/api#/Comunicados/ComunicadosController_findOne

Ex:

```
Parametro: id: 1
{
  "id": 1,
  "name": "string",
  "email": "string",
  "creatorAnnouncement": "string",
  "creatorEmail": "string",
  "communiqContent": "string"
  "createdAt": "2023-01-19T14:51:52.738Z"
}
```

- If you have the Id of the announcement, it will return status 200 Ok, with the announcement registered in the system;
- If the Id passed by the parameter does not exist, it will return a status error 404;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to update an announcement by Id:

Ex:http://localhost:7000/api#/Comunicados/AnnouncementsController_update

Param: id: 1

```
{
  "creatorAnnouncements": "string",
  "releasetTitle": "string",
  "creatorsEmail": "string",
  "communiquéContent": "string"
}
```

- If you have the Id of the announcement and all fields in body are correct, it will return status 200 Ok, with the message: announcement updated successfully;
- If the Id passed by the parameter does not exist, it will return a status error 404;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to delete an announcement by Id:

Ex: http://localhost:7000/api#/Comunicados/AnnouncementsController_remove

```
Param: id: 1
```

- If the Id entered by the user was found, it will return a message that the announcement was successfully deleted;
- If the id entered by the announcement is not found, it will return a 404 error;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to create a event:

Ex: http://localhost:7000/api#/Eventos/EventsController_create

```
{
  "receiverId": 0,
  "announcementId": 0
}
```

- If all data is passed in the body, it will return status 201, that an event was successfully created;
- If any field in the body of the release is wrong, it will return a status 404 error;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Create a event to send to email:

Ex: http://localhost:7000/api#/Eventos/EventsController_createEventEmail

Obs: You can send an email to more the one user.
Like this: "email": "renzo@gmail.com, leorossato@gmail.com"

```
{
  "receiverId": 1,
  "announcementId": 1,
  "email": "renzo@gmail.com",
  "subject": "opa",
  "html": "<h1> isssssso </h1>"
}
```

- If all data is passed in the body, it will return status 201, that an event was successfully created and sended to email;
- If the email is wrong, it returns an error status 404;
- If any field in the body of the release is wrong, it will return a status 404 error;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Route to create a event to send to whatsAPP:

Ex: http://localhost:7000/api#/Eventos/EventsController_createEventByWhatsApp

```
{
  "receiverId": 1,
  "announcementId": 1,
  "phone": "5527996805998",
  "message": "eventos by global social commerce"
}
```

- If all data is passed in the body, it will return status 201, that an event was successfully created and sended to whatsAPP;
- If a field in the body like phone is wrong, it will return a error, caused by the z-api only
  see the number passed like: 552799801257, with no spaces;
- If the fields receiverId or annoucmentId they not exists in the system, it will return an error
  with status 400, id was not found;
- If any field in the body of the release is wrong, it will return a status 404 error;
- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Route to get all events:

Ex: http://localhost:7000/api#/Eventos/EventsController_findAll

```
- If it has data from the event, it will return 200 Ok, with all the announcements registered in the system,

{
  "id": 1,
  "receiverId": 1,
  "announcementId": 1,
  "createdAt": "2023-01-27T15:30:15.235Z"
}
```

- If there is no data yet in the system, it returns status 200 Ok, with an empty array:

```
[]
```

- If the user tries to access this route without permission by keycloak, it will return error of
  permission.

## Route to get a event By Id:

Ex:http://localhost:7000/api#/Eventos/EventsController_findOne

```
{
  "id": 1,
  "receiverId": 1,
  "announcementId": 1,
  "createdAt": "2023-01-27T15:30:15.235Z"
}
```

- If you have the Id of the event, it will return status 200 Ok, with the event registered in the system;
- If the Id passed by the parameter does not exist, it will return a status error 404;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to update an event By Id:

Ex: http://localhost:7000/api#/Eventos/EventsController_update

```
Parameters id : 1
{
  "receiverId": 0,
  "announcementId": 0
}
```

- If you have the Id of the evnt and all fields in body are correct, it will return status 200 Ok, with the message: event updated successfully;
- If the Id passed by the parameter does not exist, it will return a status error 404;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Route to delete an event By Id:

Ex: http://localhost:7000/api#/Eventos/EventsController_remove

```
Parameter : id: 1
```

- If the Id entered by the user was found, it will return a message that the event was successfully deleted;
- If the id entered by the event is not found, it will return a 404 error;
- If the user tries to access this route without permission by keycloak, it will return permission error.
