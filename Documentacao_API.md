# Evento Z-API

Descrição: Sistema de integração com API`s para criar eventos e envia-los.

Conteudo:

- Comunicados;
- Recebedores;
- Eventos;
- Keycloak.

# Como Usar o Keycloak:

- https://www.keycloak.org/documentation
- https://www.npmjs.com/package/nest-keycloak-connect

### Como que é gerado o Token de acesso

Utilizamos alguns parametros do proprio keycloak e o Postman para gerar o token de acesso no sistema:

- Token Name=global-evento;
- Access Token URL: Url do projeto;
- Client ID: Nome do projeto;
- Client Secret: Sera passado;
- Username: Seu usuario do sistema;
- Password: Sua senha do sistema;
- Scope: openid.
- Postman: é uma plataforma de API para desenvolvedores projetar, construir, testar e iterar suas APIs.

## Permissões do Keycloak:

- global-evento-api-create: Permite quem tenha esta permissão possa criar eventos no sistema.
- global-evento-api-read: Permite quem tenha esta permissão possa ter todos eventos no sistema.
- global-evento-api-update: Permite quem tenha esta permissão possa atualizar eventos no sistema
- global-evento-api-delete: Permite quem tenha esta permissão possa deletar eventos no sistema.

## Erros do Keycloak na aplicação:

- Não autenticado: token expirou;
- Não autorizado: usuario não tem permissão para acessar esta rota.

## Z-API:

Z-API é um serviço RestFul que provê uma API que permite que você interaja com seu Whatsapp através uma API simples e intuitiva, além de webhooks para te avisar sobre interações com seu número.

## Pode conectar com estes bancos:

Postgres

### Dependencias para rodar o projeto

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

## Funcionamento Da API:

Para utilizar a API teremos que esta cadastrado no keycloak(Autorização e autenticação) para utiliza-lá

## Rota de Login:

Para Logar no Sistema precisamos loagr com o username e password.

http://localhost:7000/api/Autenciação/auth/login
EX:

```
{
  "username": "testeste@gmail.com",
  "password": "kiehnrfou3289h"
}
```

- Se a autenticação estiver correta retornara um token para ser utilizado na API;
- Caso o email ou a senha estiverem errados retornar erro 401.

## Rota de recebedores:

Esta rota retorna todos os recebedores que estão cadastrado no sistema.

EX:
http://localhost:7000/api#/Recebedores/RecebedoresController_findAll

```
[
    {
    "id": 1,
    "nomeCompleto": "Teste",
    "email": "olamudo@gmail.com",
    "whatsapp": "552799675994",
    "telefone": "552799675994",
    "message": "ola mundo",
    "createdAt": "2023-01-18T23:31:57.949Z"
  }
]
```

- Caso tenha dados ele retorna todos os recebedores;
- Caso não tenha nenhum dado no banco cadastrado retorna vazio:

```
[]
```

- Agora se ocorrer erro, retorna erro 500;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota de receberdores pelo indenticador unico(Id):

Ex:
http://localhost:7000/api#/Recebedores/RecebedoresController_findOne

- Para encontrar um recebedor utilize o Id como para paremetro de busca:
  EX:

```
Parametro: id:1

{
  "id": 1,
  "nomeCompleto": "string",
  "email": "string",
  "whatsapp": "string",
  "telefone": "string",
  "message": "string",
  "createdAt": "2023-01-19T14:51:45.873Z"
}

```

- Se tiver o id digitado pelo usuario ele vai retornar status 200 com o resultado do id digitado
- Caso o id digitado pelo usuario não existir, ele vai retornar erro 400, não encontrado;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota para atualizar dados do recebedor:

http://localhost:7000/api#/Recebedores/RecebedoresController_update
EX:

Parametro: id: 1

```
{
  "nomeCompleto": "Leoanrdo 32423cds",
  "email": "tresteaqui@gmail.com",
  "whatsapp": "279965852210",
  "telefone": "279965852210",
  "message": "bom dia"
}
```

- Caso os dados do corpo passado pelo usuario forem corretos ira retornar uma mensagem que
  os dados forma atualizados com sucesso;
- Caso o Id digitado pelo usuario não for econtrado, ira retornar erro 404;
- Caso os dados passados pelo usuario dentro do corpo tiverem errados irá retornar erro 404;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota para deletar um recebedor:

http://localhost:7000/api#/Recebedores/RecebedoresController_remove
EX:

```
Parametro: id: 1
```

- Caso o Id digitado pelo usuario for econtrado ira retornar uma mensagem que o recebedor
  foi deletado do sistema com sucesso;
- Caso o Id digitado pelo usuario nmão for econtrado ira retornar erro 404;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota para ver todos os Comunicados:

http://localhost:7000/api#/Comunicados/ComunicadosController_findAll

Ex:

```
[
  {
    "id": 1,
    "nome": "string",
    "email": "string",
    "titulo": "string",
    "tituloComunicado": "string",
    "createdAt": "2023-01-19T14:51:52.738Z"
  }
]
```

- Caso tenha dados dos comunicados irá retornar 200 Ok, com todos os comunicados registrados
  no sistema,
- Caso não tenha nenhum dado ainda no sistema, ele reternorá status 200 Ok, com um array vazio:

```
[]
```

- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota para criar um Comunicado:

http://localhost:7000/api#/Comunicados/ComunicadosController_create

Ex:

```
{
  "nome": "string",
  "email": "string",
  "titulo": "string",
  "tituloComunicado": "string"
}
```

- Se todos os dados forem passados no corpo, ele retornar status 201, de que um comunicado foi criado com sucesso;
- Se algum campo do corpo do comunicado estiver errado, ele retornar erro status 404;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.

## Rota para pegar um comunicado por Id:

http://localhost:7000/api#/Comunicados/ComunicadosController_findOne

Ex:

```
Parametro: id: 1
{
  "id": 1,
  "nome": "string",
  "email": "string",
  "titulo": "string",
  "tituloComunicado": "string",
  "createdAt": "2023-01-19T14:51:52.738Z"
}
```

- Caso tenha o Id do comunicados irá retornar status 200 Ok, com o comunicado registrado
  no sistema,
- Caso o Id passado pelo parametro não exista, irá retornar erro de status 404;
- Caso o usuario tentar acessar essa rota sem permissão pelo keycloak, irá retornar erro de
  permissão.
