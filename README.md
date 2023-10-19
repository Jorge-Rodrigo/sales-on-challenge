<h1 align="center">Sales On - API</h1>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>


## **Endpoints**

Para fazer a intalação da API localmente:

## Como Instalar
 
 **Passo 1 -** Clone o repositório do projeto para a sua máquina local usando o Git. Você pode fazer isso executando o seguinte comando no seu terminal:
  ```
git clone https://github.com/Jorge-Rodrigo/sales-on-challenge.git
```

**Passo 2 -** Navegue até a pasta do projeto:

  ```
  cd nome-da-pasta
```

**Passo 3 -** Instale as dependências do projeto. Certifique-se de que você tem o Node.js e o npm instalados na sua máquina. Em seguida, execute o seguinte comando:
 ```
 npm install
```
 **Passo 4 -** Inicie o servidor. Isso irá compilar o projeto e executá-lo localmente:

 ```
 npm run dev
```

A API tem um total de 3 endpoints

O url base da API é http://localhost:3000/

<h2 align ='center'> Cadastrando Vendas </h2>

<p>O  paymentMethod so funciona se for "À Vista" ou "Parcelado"</p>

`POST /sales -  FORMATO DA REQUISIÇÃO`
```json
{
  "client": {
    "name": "Marcio"
  },
  "products": [
    {
      "name": "bola",
      "price": 20,
      "amount": 1
    },
    {
      "name": "faca",
      "price": 50,
      "amount": 2
    }
  ],
  "paymentMethod": "Parcelado",
  "portion": 4,
  "customDueDates": ["2023-11-18", "2023-12-18", "2024-01-18","2024-02-18"],
  "customInstallmentPrice": [10.0, 50.0, 50.0,10.0]
}
```

Se tudo der certo essa sera a resposta:

`FORMATO DA RESPOSTA - STATUS 201`
```json
{
  "id": 6,
  "client": {
    "name": "Marcio",
    "id": 6
  },
  "products": [
    {
      "name": "bola",
      "price": 20,
      "amount": 1,
      "id": 11
    },
    {
      "name": "faca",
      "price": 50,
      "amount": 2,
      "id": 12
    }
  ],
  "totalPrice": 120,
  "paymentMethod": "Parcelado",
  "portion": 4,
  "customDueDates": [
    "2023-11-18",
    "2023-12-18",
    "2024-01-18",
    "2024-02-18"
  ],
  "customInstallmentPrice": [
    10,
    50,
    50,
    10
  ],
  "createdAt": "2023-10-19",
  "updatedAt": "2023-10-19"
}
```

<h2 align ='center'> Vendo todas as Vendas </h2>

`GET /sales -  FORMATO DA REQUISIÇÃO`

`FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": 1,
    "totalPrice": "120",
    "paymentMethod": "Parcelado",
    "portion": 4,
    "installmentPrice": "0",
    "customDueDates": [
      "2023-11-18",
      "2023-12-18",
      "2024-01-18",
      "2024-02-18"
    ],
    "customInstallmentPrice": [
      "10",
      "50",
      "50",
      "10"
    ],
    "createdAt": "2023-10-18",
    "updatedAt": "2023-10-19",
    "client": {
      "id": 12,
      "name": "Paulo"
    },
    "products": [
      {
        "id": 1,
        "name": "bola",
        "price": "20",
        "amount": 1
      },
      {
        "id": 2,
        "name": "faca",
        "price": "50",
        "amount": 2
      }
    ]
  },
  {
    "id": 2,
    "totalPrice": "120",
    "paymentMethod": "Parcelado",
    "portion": 4,
    "installmentPrice": "0",
    "customDueDates": [
      "2023-11-18",
      "2023-12-18",
      "2024-01-18",
      "2024-02-18"
    ],
    "customInstallmentPrice": [
      "10",
      "50",
      "50",
      "10"
    ],
    "createdAt": "2023-10-18",
    "updatedAt": "2023-10-18",
    "client": {
      "id": 2,
      "name": "Marcio"
    },
    "products": [
      {
        "id": 3,
        "name": "bola",
        "price": "20",
        "amount": 1
      },
      {
        "id": 4,
        "name": "faca",
        "price": "50",
        "amount": 2
      }
    ]
  },
  {
    "id": 3,
    "totalPrice": "120",
    "paymentMethod": "Parcelado",
    "portion": 4,
    "installmentPrice": "0",
    "customDueDates": [
      "2023-11-18",
      "2023-12-18",
      "2024-01-18",
      "2024-02-18"
    ],
    "customInstallmentPrice": [
      "10",
      "50",
      "50",
      "10"
    ],
    "createdAt": "2023-10-18",
    "updatedAt": "2023-10-18",
    "client": {
      "id": 3,
      "name": "Marcio"
    },
    "products": [
      {
        "id": 5,
        "name": "bola",
        "price": "20",
        "amount": 1
      },
      {
        "id": 6,
        "name": "faca",
        "price": "50",
        "amount": 2
      }
    ]
  },
  {
    "id": 6,
    "totalPrice": "120",
    "paymentMethod": "Parcelado",
    "portion": 4,
    "installmentPrice": "0",
    "customDueDates": [
      "2023-11-18",
      "2023-12-18",
      "2024-01-18",
      "2024-02-18"
    ],
    "customInstallmentPrice": [
      "10",
      "50",
      "50",
      "10"
    ],
    "createdAt": "2023-10-19",
    "updatedAt": "2023-10-19",
    "client": {
      "id": 6,
      "name": "Marcio"
    },
    "products": [
      {
        "id": 11,
        "name": "bola",
        "price": "20",
        "amount": 1
      },
      {
        "id": 12,
        "name": "faca",
        "price": "50",
        "amount": 2
      }
    ]
  },
  {
    "id": 7,
    "totalPrice": "60",
    "paymentMethod": "Parcelado",
    "portion": 2,
    "installmentPrice": "0",
    "customDueDates": [
      "2023-10-26",
      "2023-11-19"
    ],
    "customInstallmentPrice": [
      "30",
      "30"
    ],
    "createdAt": "2023-10-19",
    "updatedAt": "2023-10-19",
    "client": {
      "id": 7,
      "name": "Pedro"
    },
    "products": [
      {
        "id": 13,
        "name": "bola",
        "price": "30",
        "amount": 1
      },
      {
        "id": 14,
        "name": "faca",
        "price": "30",
        "amount": 1
      }
    ]
  }
]
```
<h2 align ='center'> Vendo todas as parcelas de uma venda </h2>

`GET /sales/{id da venda}/payment-plan -  FORMATO DA REQUISIÇÃO`

`FORMATO DA RESPOSTA - STATUS 200`
```json
{
  "totalPrice": "120",
  "portions": 4,
  "allPortions": [
    {
      "price": 30,
      "date": "2023-10-19"
    },
    {
      "price": 30,
      "date": "2023-11-19"
    },
    {
      "price": 30,
      "date": "2023-12-19"
    },
    {
      "price": 30,
      "date": "2024-01-19"
    }
  ]
}
```


<h2 align ='center'> Deletar uma venda </h2>

`DELETE /sales/{id da venda} -  FORMATO DA REQUISIÇÃO`

`FORMATO DA RESPOSTA - STATUS 203`
```json
no content
```
