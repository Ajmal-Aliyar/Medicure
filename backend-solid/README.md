#  Scalable Backend Boilerplate

A clean, scalable, and production-ready backend built with **Node.js**, **TypeScript**, **Express**, **InversifyJS**, and **MongoDB**. Designed to support starter applications with ease, this boilerplate embraces **SOLID principles**, **clean architecture**, and **modular structure** to ensure long-term maintainability.


##  Why This Project Exists

Building reliable backends shouldn't mean reinventing the wheel each time. This starter is crafted for developers who care about:

- ✅ **Scalability** – Structured for growth without becoming a mess  
- ✅ **Maintainability** – Clear separation of concerns and responsibility  
- ✅ **Security & Best Practices** – Helmet, CORS, cookie-parser, etc.


##  Stack & Features

| Tech            | Purpose                                |
|-----------------|----------------------------------------|
| Node.js + Express | Web server & routing                  |
| TypeScript      | Type safety & better DX                |
| InversifyJS     | Dependency injection (SOLID)           |
| Zod             | Runtime request validation             |
| JWT + Bcrypt    | Authentication & secure password hashing |
| Redis           | Caching & token/session management     |
| MongoDB (Mongoose) | Data persistence                    |
| Nodemailer      | Email (OTP) service                    |
| Winston         | Logging to file & console              |
| Helmet, CORS    | Basic security practices               |

---

##  Project Structure

```bash
src/
├── app/ # App bootstrapping logic (Express app setup)
├── config/ # Configs for env, logger, redis, DB, nodemailer
├── constant/ # Application constants and enums
├── controllers/ # Thin route controllers
├── dtos/ # Zod schemas (DTOs for validation)
├── errors/ # Custom error classes (BadRequestError, etc.)
├── inversify/ # IoC container setup with InversifyJS bindings
├── middlewares/ # Express middlewares (error handler, auth, etc.)
├── models/ # Mongoose models and schemas
├── repositories/ # Data access layer
├── routes/ # Express route definitions and grouping
├── services/ # Business logic (fat services, SOLID)
├── types/ # Global/custom TypeScript types
├── utils/ # Utility functions ( api response, format date etc.)
├── validators/ # Shared and modular validation helpers
├── index.ts # Entry point for app initialization
└── server.ts # Server dependency injection
