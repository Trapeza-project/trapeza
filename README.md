# Trapeza

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 4.1.0.

Trapeza aims to make information management process secure, transparent and effortless. As a user, you have full control over your whole information flow, whenever and wherever you are.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [SQLite](https://www.sqlite.org/quickstart.html)

### Install local development environment

1. Run `npm install` to install server dependencies.

2. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

3. Open [Trapeza](http://localhost:3000/user/start), [Trapeza Business](http://localhost:3000/customer/main) and [Trapeza Admin](http://localhost:3000/admin/dashboard)

4. Login details:
```
[{
  name: 'Anna Svensson',
  email: 'anna.svensson@gmail.com',
  password: 'test',
},{
  name: 'Michael Ericsson',
  email: 'michael@trapeza.com',
  password: 'test',
}, {
  role: 'admin',
  name: 'Admin',
  email: 'admin@example.com',
  password: 'admin',
}]
```

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## File tree
Overview of the main parts in the application

    .
    ├── README.md                     # Base README
    ├── client                        #  Front-end
    │   └── app                       
    │       ├── admin-interface       #  Module for Trapeza Admin
    │       ├── customer-interface    #  Module for Trapeza Business 
    │       └── user-interface        #  Module for Trapeza  
    ├── e2e                           #  NOT IMPLEMENTED, scripts for end-to-end testing
    └── server                        # Back-end
        └── api                       # Source code for the REST API
