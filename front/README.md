# Groupomania

Create a business social network

This folder contain all files related to the Front-end-side of the application.
It use VueJS 3.0 to render content and Express to serve files as HTTP server.

## Summary

- [Required](#required)
- [Projet setup](#project-setup)
- [Run the Client](#run-the-client)
- [Other commands](#other-commands)

## Required

- Node 15.x
- Npm 7.7.x

## Project setup

Open a new terminal in the same directory, then go to the client folder

> `cd front`

Install node modules

```
npm install
```

### Create .env file (copy .env.local) and configure it

```
VUE_APP_BASE_API_URI=http://localhost:3000/api

```

## Run the client

```
npm run serve

The client is available on http://localhost:8080 (default configuration)

```

⚠️ If the page is blank and you got an error in the console about the user or the Local Storage, verify that you don't already have a "user" key inside your Local Storage for the localhost:8080. (Chrome: Open web inspector -> Application -> Local Storage)

## Other commands

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Thanks for reading 🙇
> 💬 ask me about anything, i am happy to help.