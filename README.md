# Monorepo Supported By Rush and PNPM

> keywords: Monorepo/Rush/PNPM/React/CRA/Vite

## Features

- Structures
  - apps: Web Apps
  - features: packages that do not need to be released, only reused in this Monorepo
  - packages: packages that need to be released
  - tools: common tools for all projects
- Examples
  - create-react-app
  - vite-react-app
  - tsc package
  - feature package
- commitlint/eslint/prettier/lint-staged
- commit-msg and pre-commit hooks

## Quick Start

If using `nvm`, run `nvm use` before all.

```shell
$ npm i/pnpm i
$ npm run dev:web
$ npm run build:web
```
