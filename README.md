<h2 align="center">
  NestJs API Starter
</h2>

> Starter application for building APIs with [Nest!](https://nestjs.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [PNPM](https://pnpm.io/installation)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/)

---

Packages:

- [Prisma](https://www.prisma.io/) ORM
- [PostgreSQL](https://www.postgresql.org/)
- [nestjs/swagger](https://docs.nestjs.com/openapi/introduction) for API documentation
- [Docker](https://docs.docker.com/engine/docker-overview/) support for Development and Production
- [ESLint](http://eslint.org/) for code linting
- [Prettier](https://www.npmjs.com/package/prettier) for code formatting
- [dotenv](https://www.npmjs.com/package/dotenv) for configuration management


## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone --depth=1 git@github.com:ngKisor/nestjs-starter.git <application-name>
    $ cd <application-name>
    $ rm -rf .git
    $ pnpm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials.

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

Navigate to http://localhost:8080/api/ to verify installation.

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Contributing

For contribution and feature requests, please create an [issue](https://github.com/ngKisor/nestjs-starter/issues) first.

## License

NestJs-Api-Starter is under [MIT License](LICENSE).
