# counting-carbs-app
These are the backend and frontend applications for the CountingCarbs app. The application is the result of a 6 months uni project with HTW Berlin and the Berlin based startup 2Zero. 
Contributors: 
- Nancy Armas Martinez (Backend)
- Paula Mehner (Frontend)
- Erik Hagen (Frontend)
- Emmanuel Wilke (Design)
- Jennifer Zelmer (Product Management)
- Nina Böhm (Tech Lead)

## Structure
The backend is a NodeJS app using Express and Prisma/Planetscale for the database.
The frontend is a React Native application for iOS and Android.

# Backend setup
## Store your environment variables
1. Copy the `example.env` file.
2. Rename it to `.env`. Any filed named `.env` will be ignored by git. It is a good place to store API keys and Bearer Tokens which should never added to git.
3. Save your variables in the `.env` file. Common usage is to store the key in all-caps
4. Inside the app, if you need to use an environment variable, replace it with `process.env.<VARIABLE_NAME>`, e.g. `process.env.PORT`


## Running the app

Requirement: Docker is installed. 

```bash
# development
$ docker compose up dev

```

## Test

```bash
# unit tests
$ npm run test

```
