# GrowStore API

API RESTful de back-end para uma plataforma de e-commerce desenvolvida com Node.js, TypeScript, Prisma ORM e PostgreSQL.

## Tecnologias

* Node.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Express.js
* Bcrypt

## Status

🚧 Projeto em desenvolvimento

### Implementações atuais

#### Banco de Dados

* Model de Usuário
* Model de Endereço
* Model de Categoria
* Model de Produto
* Model de Variante de Produto
* Model de Imagem de Produto
* Model de Carrinho
* Model de Item do Carrinho
* Model de Pedido
* Model de Item do Pedido

#### Funcionalidades

* Cadastro de usuário
* Criptografia de senha com Bcrypt

## Endpoints Implementados

### Criar usuário

**POST** `/api/users`

#### Request

```json
{
  "name": "user",
  "email": "email@email.com",
  "password": "password",
  "birthDate": "2001-01-01"
}
```

#### Response

```json
{
    "ok": true,
    "user": {
        "id": "uuid",
        "name": "user",
        "email": "email@email.com",
        "birthDate": "2001-01-01T00:00:00.000Z",
        "role": "CUSTOMER",
        "createdAt": "2026-06-20T09:53:23.826Z",
        "updatedAt": "2026-06-20T09:53:23.826Z"
    }
}
```

## Próximas Implementações

* Login de usuário
* Autenticação JWT
* Middleware de autorização
* CRUD de categorias
* CRUD de produtos
* Carrinho de compras
* Pedidos

## Autor

Matheus Rodrigues
