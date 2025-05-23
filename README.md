# 🏥 Appointment API

API RESTful desenvolvida para gerenciar **agendamentos médicos** entre **clientes** e **especialistas**, garantindo **disponibilidade**, **segurança** e **automação** de processos.

---

## ✅ Funcionalidades implementadas

### 🧑‍⚕️ Cadastro e gerenciamento de Especialistas

* Cadastro de disponibilidade de horários (`availability`).
* CRUD completo de especialistas.
* Atualização dinâmica da disponibilidade.

### 🧑‍💼 Cadastro e gerenciamento de Clientes

* CRUD completo de clientes.
* Associação com `User` autenticado.

### 📅 Agendamentos

* CRUD completo de agendamentos:

  * Criar, listar, atualizar status e cancelar.
* **Validação de disponibilidade**:

  * Não permite ultrapassar `dailyLimit`.
  * Respeita `minIntervalMinutes`.
  * Impede duplo agendamento no mesmo horário.
  * Respeita dias e horários da disponibilidade cadastrada.

### 🔍 Consulta de horários disponíveis

* Consulta de horários **livres** por:

  * **Especialidade**
  * **Data**
* Considera disponibilidade cadastrada e agendamentos já realizados.

### 🔐 Autenticação e autorização

* JWT Token.
* Proteção de rotas com middleware `authenticate`.
* Controle de acesso por `role` (`client`, `specialist`, `admin`).

### ⏰ Automação com Node Cron

* Jobs diários às **8h**:

  * Notificação de agendamentos.
  * Marcação automática de `Appointments` como `expired`.

### 🛠️ ORM e Migrations

* **Prisma ORM** com:

  * Migrações **versionadas**.
  * Schema gerenciado em `prisma/schema.prisma`.
  * Geração automática do Prisma Client.

---

## 🚀 Como rodar o projeto

### Pré-requisitos:

* Node.js >= 18.x
* PostgreSQL ou MySQL
* Prisma CLI
* Docker (opcional, para banco de dados)

---

### 1. Clone o repositório:

```bash
git clone <repo-url>
cd appointment-api
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure o `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="sua-chave-secreta"
```

### 4. Suba com Docker Compose:

Para rodar o projeto de forma simples, basta utilizar o Docker Compose, que já cuidará de subir o banco de dados, gerar o Prisma Client e aplicar as migrações automaticamente.

1. Ajuste o `DATABASE_URL` no `.env` para:

```env
DATABASE_URL="postgresql://user:password@db:5432/dbname"
```

2. Suba os containers:

```bash
docker-compose up --build
```

3. Acesse a aplicação em: `http://localhost:3000`

> **Obs.:** Não é necessário rodar `npx prisma generate` nem `npx prisma migrate dev` manualmente, pois isso será feito automaticamente na inicialização do container.

```bash
npm run dev
```

### 🚀 Subindo com Docker Compose:
1. Ajuste o `DATABASE_URL` no `.env` para:

```env
DATABASE_URL="postgresql://user:password@db:5432/dbname"
```

2. Suba os containers:

```bash
docker-compose up --build
```

3. Acesse a aplicação em: `http://localhost:3000`

---

## 📝 Documentação das rotas principais

> A documentação completa e interativa está disponível em: `/docs`

| Método | Rota                                      | Descrição                      |
| ------ | ----------------------------------------- | ------------------------------ |
| POST   | `/auth/register`                          | Cadastro de usuário            |
| POST   | `/auth/login`                             | Login e geração de token       |
| POST   | `/clients`                                | Criar cliente                  |
| GET    | `/clients/:id`                            | Buscar cliente                 |
| POST   | `/specialists`                            | Criar especialista             |
| PUT    | `/specialists/:id/availability`           | Atualizar disponibilidade      |
| GET    | `/specialists/available?specialty=&date=` | Consultar horários disponíveis |
| POST   | `/appointments`                           | Criar agendamento              |
| GET    | `/appointments`                           | Listar agendamentos            |
| PATCH  | `/appointments/:id/status`                | Atualizar status               |
| DELETE | `/appointments/:id`                       | Cancelar agendamento           |

---

## ✅ Principais tecnologias

* **Node.js** + **Express**
* **Prisma ORM** + Migrations
* **JWT** para autenticação
* **Node Cron** para automação
* **TypeScript** para tipagem segura
* **Swagger UI** para documentação da API

---

* Documentação centralizada e manual via **Swagger** (/docs).

---