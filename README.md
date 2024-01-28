# MS Production

Este repositório contém um microserviço dedicado ao gerenciamento de pedidos em um restaurante/lanchonete. O microserviço permite a criação e consulta de pedidos em andamento, juntamente com seus respectivos status. A documentação do microserviço está disponível por meio do Swagger, oferecendo uma interface intuitiva para testar e explorar os endpoints.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FIAP-SOAT-GRP5_ms-production&metric=alert_status)](https://sonarcloud.io/project/overview?id=FIAP-SOAT-GRP5_ms-production)

## Pré-requisitos

- Node.js
- Docker

## Início

Siga as instruções abaixo para obter uma cópia do projeto localmente e executá-lo para fins de desenvolvimento e teste.

1. Faça o download do repositório do projeto:

```shell
git clone https://github.com/FIAP-SOAT-GRP5/ms-production.git
```

2. Instale as dependências necessárias, se necessário:

```shell
cd ms-production
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes informações de banco de dados:

```
NODE_ENV="development"
TZ="America/São Paulo"
PORT="3000"

DB_TYPE="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE="app"

MP_ACCESS_TOKEN=""

JWT_KEY=""

QUEUE_CREATE_ORDER_URL=""
QUEUE_UPDATE_ORDER_URL=""

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
```

## Documentação das rotas

### Pedido(s)

Lista de Status do Pedido:

| STATUS           |
| ---------------- |
| awaiting_payment |
| received         |
| processing       |
| ready            |
| finished         |
| canceled         |

#### Cadastrar

O cadastro do pedido(s) será realizado por meio de mensageria, utilizando o microserviço de pedidos e a fila `create_order`.

Cada pedido deve conter os seguintes campos:

- `status`: string
- `id`: number (id do produto)

#### Atualizar

A atualização do pedido será realizada por meio de mensageria e/ou via Swagger, utilizando o microserviço de pedidos e a fila `update_order`.

Cada pedido deve conter os seguintes campos:

- `status`: string
- `id`: number (id do produto)

A atualização do status segue algumas regras, a saber:

- Um pedido no status `received` só poderá ser atualizado para `processing`;
- Um pedido no status `processing` só poderá ser atualizado para `ready`
- Um pedido no status `ready` só poderá ser atualizado para `finished`

Em caso de atualização via Swagger, utilize os seguintes Endpoints:

- Para atualizar o pedido para o status `processing`:
  Endpoint: `PUT /order/{id}/status/processing`

- Para atualizar o pedido para o status `ready`:
  Endpoint: PUT `/order/{id}/status/ready`

- Para atualizar o pedido para o status `finished`:
  Endpoint: PUT `/order/{id}/status/finished`

#### Consultar

Para realizar consultas após o cadastro de um pedido, existe uma rota disponível para buscar todos os pedidos em processamento (status de `processing`)

Buscar todos os pedidos em processamento

Endpoint: `GET /order/list-processing-orders`

## Cadastrar pedido(s)

Para cadastrar um pedido, envie uma mensagem para a fila `create_order`.

Exemplo de como preencher os valores para cadastrar um pedido:

```json
{
  "id": 1,
  "status": "awaiting_payment"
}
```

## Consultar pedido(s) e status

Para consultar os pedidos em processamento, faça uma requisição GET para o endpoint `/list-processing-orders`.
