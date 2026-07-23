## Intro

- A progressive nodejs framework for building efficient adn ascalabel server-side applications.
- Built with TypeScript and heavily inspired by Angular
- uses module architecture for better organization.

## Why we need NESTJs

- To simplify backedn development using modern architecture
- provides a structured way to build scalable and tesable apps.
- solves the limitations of tradidions express apps.

## Benifits

- Fully supports TS.
- Built-in Dependency injection sys.
- Easy intergration with DB like WS, GraphQL and microservices.
- scalable and maintainable codebase.
- Active and growing community support

## Installation

Run this command

$ nest new project-name

<blockquote style="padding : 10px 0px 5px 8px;font-size:18px">
 $ npm / pnpm i -g  <span style="color: #2e7d32; font-weight: bold;">
@nestjs/cli</span> <br/>
  <p>$ nest new project-name</p>
</blockquote>


# File and folder Structer

📁 my-nestjs-app/
├── 📁 src/
│   ├── 📁 common/
│   │   ├── 📁 filters/
│   │   │   └── 📄 http-exception.filter.ts
│   │   └── 📁 guards/
│   │       └── 📄 auth.guard.ts
│   ├── 📁 config/
│   │   └── 📄 database.config.ts
│   ├── 📁 users/
│   │   ├── 📁 dto/
│   │   │   ├── 📄 create-user.dto.ts
│   │   │   └── 📄 update-user.dto.ts
│   │   ├── 📁 interfaces/
│   │   │   └── 📄 user.interface.ts
│   │   ├── 📄 users.controller.ts
│   │   ├── 📄 users.module.ts
│   │   └── 📄 users.service.ts
│   ├── 📄 app.module.ts
│   └── 📄 main.ts
├── 📄 .env
├── 📄 package.json
└── 📄 tsconfig.json

## Core Components Explained

* 📁 src/: Root directory for all application source code.
* 📁 common/: Stores reusable global utilities like authentication guards, interceptors, and error filters.
* 📁 users/: A domain module. NestJS organizes code by features, grouping related controllers, services, and modules together.
* 📁 dto/: Data Transfer Objects define the schema for incoming request data validation.
* 📄 main.ts: The application entry point that bootstraps the NestJS server instance.

Would you like to explore:

* How to generate these files automatically using the NestJS CLI?
* How to integrate TypeORM or Prisma database models into this structure?
* The specific roles and differences between Controllers and Services?


---

# Controllers
- controllers handle incoming HTTP requests.
- They define routes ( e.g., GET, POST, PUT, DELEtE).
- Bridge bt client & business logic (services).

 ### Benefits
- Orgnaize API endpoints clearly & modularly.
- help separete concern: routing vs business logic.
- make code scalable & manintaable.
- improve code readability wiht clean structure.

### Decorators.
specail functions that give some special power to any method, class, function etc
- Special functions that add metadata to classes or methods.
- Start with @ symbol ( e.g, @Controller(), @GET()).
- tell nestjs how to treat the class or method.
- use for routing, dependency injection, validations,etc

### Generate Auto Controller
<blockquote style="padding : 10px 0px 5px 8px;font-size:18px">
 $ nest g controller <span style="color: #2e7d32; font-weight: bold;">
controller-name</span>
</blockquote>
this will create a folder name controller-name along with two files

---


# Services
- TypeScript class with logic like calculations, data accesss, etc
- used to write business logic in a clean & reusbale way.
- they are marked with @injectable() decorator so nestjs can use them.
- Logics like fetching data, calculations and api calls goes inside services.

### Why use
- To separete logic from controllers.
- makes code modular, clearn & testable.
- services can be reused in multiple places.
- helps keep your app organized & scalable.

### Generate Auto Controller
<blockquote style="padding : 10px 0px 5px 8px;font-size:18px">
 $ nest g service<span style="color: #2e7d32; font-weight: bold;">
service-name</span>
</blockquote>
this will create a folder name service-name along with two files

---

# Modules
- A container where we keep related controllers, services and provider
for out apps.
- core part of nestjs architecture. 
- Every nestjs app has at least one 



### Generate Auto module
<blockquote style="padding : 10px 0px 5px 8px;font-size:18px">
 $ nest g module<span style="color: #2e7d32; font-weight: bold;">
module-name</span>
</blockquote>
this will create a folder name module-name along with two files


# Dependency Injection
It is a machanism where the framework automatically provides the rquired 
dependencies wihtout creating them manually.
- It makes the code reusable and clean.
- It makes testing easier
- it promotes loose coupling (classesss don't tightly depend on each other)
- It improves readablity and maintainability
- e.g. @Get(), @Controller(), @Injectable(), @Params() etc.

---

# DTO (Data tranfer Objects)
- An object that carries data between layer like (like from client to backend);
- Used to define the shape of incoming request data.
- Ensures only required data passed (security + validation)  

### Interface in TS
- Interfae define the structure type of an object.
- Help write clean, structured, type-safe code.
- used for both request (DOTs) & response obj.

### Custom Pips 
- Pipes are used to transform or validate incoming data.
- nestjs allows you to create your own custom pips.
- they can be used for custom validation, data transformation, or business logic filtering.

