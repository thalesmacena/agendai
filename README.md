# Agendai
## 🗂 Tabela de Conteúdo
- [Agendai](#agendai)
  - [🗂 Tabela de Conteúdo](#-tabela-de-conteúdo)
  - [📑 Sobre](#-sobre)
  - [💻 Technologies](#-technologies)
    - [💱 Back-end](#-back-end)
    - [🌐 Front-end Web](#-front-end-web)
  - [✨ Instalação](#-instalação)
    - [💱 Back-end](#-back-end-1)
      - [🔥 Rodando a aplicação](#-rodando-a-aplicação)
    - [🌐 Front-End Web](#-front-end-web-1)
      - [🔥 Rodando a aplicação](#-rodando-a-aplicação-1)

## 📑 Sobre
Aplicativo de agendamento de bandejão da ufrj

## 💻 Technologies
<a href="https://yarnpkg.com/"><img src="https://img.shields.io/badge/-Yarn-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=yarn&logoColor=2D325E" alt="Yarn"></a>

<a href="https://eslint.org/"><img src="https://img.shields.io/badge/-ESLint-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=eslint&logoColor=2D325E" alt="ESLint"></a>

<a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/-Node.JS-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=node.js&logoColor=2D325E" alt="Node.js"></a>

### 💱 Back-end
<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/-Express-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=express&logoColor=2D325E" alt="Express"></a>

<a href="https://www.docker.com/"><img src="https://img.shields.io/badge/-Docker-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=docker&logoColor=2D325E" alt="Docker"></a>

<a href="https://sequelize.org/"><img src="https://img.shields.io/badge/-Sequelize-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=Javascript&logoColor=2D325E" alt="Sequelize"></a>

<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=postgresql&logoColor=2D325E" alt="PostgreSQL"></a>

### 🌐 Front-end Web
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-typescript-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=typescript&logoColor=2D325E" alt="Typescript"></a>

<a href="https://reactjs.org/"><img src="https://img.shields.io/badge/-React-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=react&logoColor=2D325E" alt="React"></a>

<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/-Next.js-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=next.js&logoColor=2D325E" alt="Next.js"></a>

<a href="https://styled-components.com/"><img src="https://img.shields.io/badge/-Styled%20Components-2D325E?labelColor=F0DB4F&style=for-the-badge&logo=styled-components&logoColor=2D325E" alt="Styled Components"></a>

## ✨ Instalação
```PowerShell
# Para copiar o repositório
git clone https://github.com/thalesmacena/agendai.git
```

### 💱 Back-end
O back-end foi feito utilizando Express.js, ele também utiliza o padrão de arquitetura MVC com o Sequelize, integrando Postgres como banco de dados. Além disso o projeto utiliza o padrão de estilo do Airbnb que junto com o plugin do prettier garantem um código limpo e claro.

#### 🔥 Rodando a aplicação

**Pré Requisitos**

Para rodar o aplicato você vai precisar ter instalado:

- Uma versão atualizada do Node.JS
- O Gerenciador de pacotes Yarn ou NPM
- Uma imagem do Postgres (é recomendável que utilize Docker para ter uma imagem desses banco de dados).
- Uma cópia deste repositório localmente

**Rodando a aplicação**

1. Acesse a pasta api e renomeie o arquivo `.env.example` para `.env`, altere as variaveis de ambiente com as credencias do passo a passo.
2. Utilize o seguinte comando para baixar as dependencias:

```
yarn
```

3. Utilize o seguinte comando para realizar as migrations do banco de dados:

```
yarn sequelize db:migrate
```

4. Utilize o seguinte comando para inserir as unidades no banco:

```
yarn sequelize db:seed:all
```

5. Utilize o seguinte comando para fazer o mock de uma api externa ao bandejão:
```
yarn dev
```

### 🌐 Front-End Web
O Front-end é feito em React utilizando o Framework Next.js, ele é estilizado utilizando styled-components.

#### 🔥 Rodando a aplicação

**Pré Requisitos**

Para rodar o aplicato você vai precisar ter instalado:
- Uma versão atualizada do Node.JS
- O Gerenciador de pacotes Yarn ou NPM
- Uma cópia deste repositório localmente 

**Rodando a aplicação**

1. Acesse a pasta web, que é referente ao front-end web
2. Utilize o seguinte comando para baixar as dependencias:

```
yarn
```

3. Utilize o seguinte comando para fazer a mock da api externa:

```
yarn server
```

4. Você pode rodar o programa com o seguinte comando:

```
yarn dev
```

A aplicação rodará em [localhost:3000](http://localhost:3000/)