# @vertracloud/api-types

Simple type definitions for the **Vertra Cloud API**.

[![GitHub](https://img.shields.io/github/license/vertracloud/api-types)](https://github.com/vertracloud/api-types/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@vertracloud/api-types?color=red&logo=npm)](https://www.npmjs.com/package/@vertracloud/api-types)

## Installation

```bash
npm install @vertracloud/api-types
// or
yarn add @vertracloud/api-types
// or
pnpm add @vertracloud/api-types
```

## Getting Started

Using these type definitions is straightforward. To specify a particular API version, simply append `/v*` to the import path, where `*` corresponds to your desired version. For example:

```ts
// Importing type definitions for version 1
import { APIUser, APIDatabase, APIApplication } from '@vertracloud/api-types/v1';
```

You can also import only the specific types you need:

```ts
// Importing only the APIUser type from version 1
import { APIUser } from '@vertracloud/api-types/v1';
```

> ***Note:** The versioned exports (`@vertracloud/api-types/v*`) include relevant types for `user`, `database`, as well as additional utilities and helpers.*

## Project Structure

The exported types for each API version are organized into two main categories:

* Types prefixed with `API` represent the payloads returned by the REST API.
* Types prefixed with `REST` represent the data sent to or received from REST API endpoints.

REST types follow a specific naming convention:

```
REST<HTTP Method><Action><Type>
```

Where:

* `HTTP Method` is one of: `Get`, `Post`, `Put`, `Delete`, etc.
* `Action` describes the intent (e.g., `Create`, `Update`, `Delete`)
* `Type` represents the related resource (e.g., `User`, `Database`, `Application`)

### Examples

* `RESTPostAPIApplicationCreateBody`: request payload for creating a app.
* `RESTGetAPIApplicationResponse`: expected response when retrieving a app.

If a type name ends with `Response`, it refers to the structure returned by the API for that route.

This separation provides a clear distinction between:

* What is **sent to** the API (via `REST*Body` or similar types)
* And what is **returned from** the API (via `API*` or `REST*Response` types)