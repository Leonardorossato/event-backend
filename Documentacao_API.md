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

## Permissions do Keycloak:

- global-events-api-create: Allow who was the access can create events on system.
- global-events-api-read: Allow who was the access can see all events on system.
- global-events-api-update: Allow who was the access can update events on system
- global-events-api-delete: Allow who was the access can delete events on system.

## Erros in Keycloak on application:

- No authenticade: token expire;
- No authorazed: user dont have permission to access this route.

## Z-API:

Z-API is a RestFul service that provides an API that allows you to interact with your Whatsapp through a simple and intuitive API, as well as webhooks to warn you about relaxed with your number.

## Can connect with databases:

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

## Route to update receiver data:

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

## Rota para deletar um recebedor:

http://localhost:7000/api#/Recebedores/RecebedoresController_remove
EX:

```
Parametro: id: 1
```

- If the Id entered by the user was found, it will return a message that the recipient was successfully deleted from the system;
- If the id entered by the user is not found, it will return a 404 error;
- If the user tries to access this route without permission by keycloak, it will return permission error.

## Rota para ver todos os Comunicados:

http://localhost:7000/api#/Comunicados/ComunicadosController_findAll

Ex:

```
[
  {
    "id": 1,
    "name": "string",
    "email": "string",
    "title": "string",
    "tituloComunicado": "string",
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

## Rota para criar um Comunicado:

http://localhost:7000/api#/Comunicados/ComunicadosController_create

Ex:

```
{
  "name": "string",
  "email": "string",
  "titulo": "string",
  "tituloComunicado": "string"
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

## Create a event by Email:

EX: http://localhost:7000/api#/Comunicados/AnnouncementsController_createEventByEmail

```
{
  "receiverId": 0,
  "creatorAnnouncement": "string",
  "creatorEmail": "string",
  "communiqContent": "string"
}
```

- If the user passes the correct data in the body, it returns status 200 Ok;
- If the user passes incomplete data in the body, it returns status 404 error;
- If the user tries to access this route without permission by keycloak, it will return permission error.
