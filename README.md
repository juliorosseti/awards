<p align="center">
  <img alt="Logo" with="300" height="300" src="./static/trophy.png" />
</p>

<h1 align="center">
  Golden Raspberry Awards
</h1>
<h3 align="center">
  Worst Movies
</h3>
<br />

We have developed a RESTful API to facilitate the reading and analysis of the list of nominees and winners in the Worst Movies category of the Golden Raspberry Awards. The application meets a series of functional and non-functional requirements to ensure efficiency, ease of use, and data integrity.

## Project technologies

- Express
- SQLite3
- Sequelize

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

## Setup

You just need to have [make pkg](https://linuxhint.com/install-make-ubuntu/) and [docker](https://www.docker.com/) installed in your workspace.

Recommended to read the [Makefile](./Makefile) to see the all commands

#### Build docker image

```bash
$ make docker_build
```

#### Start container (detached mode default)

```bash
$ make up
```

#### URL to access the endpoint API

http://localhost:3000
