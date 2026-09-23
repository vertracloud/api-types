<div align="center">
  <a href="https://vertracloud.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://vertracloud.app/brand/github-banner.png">
      <source media="(prefers-color-scheme: light)" srcset="https://vertracloud.app/brand/github-banner-light.png">
      <img src="https://vertracloud.app/brand/github-banner-light.png" alt="Vertra Cloud" width="1200">
    </picture>
  </a>
</div>

# @vertracloud/api-types

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@vertracloud/api-types?color=red&logo=npm)](https://www.npmjs.com/package/@vertracloud/api-types)

TypeScript types for the public API of [Vertra Cloud](https://vertracloud.app), a Brazilian application hosting platform (PaaS) for applications, managed databases and bots.

- Imports are scoped by API version (`/v1`).
- Every route documented with a link to the [API reference](https://docs.vertracloud.app/api-reference/introduction).

## Installation

```bash
npm install @vertracloud/api-types
```

## Usage

Import from the API version you target:

```ts
import type { APIApplication, RESTGetAPIApplicationResponse } from "@vertracloud/api-types/v1";

const res = await fetch(`https://api.vertracloud.app/v1/apps/${id}`, {
	headers: { Authorization: `Bearer ${process.env.VERTRA_API_KEY}` },
});
const body = (await res.json()) as RESTGetAPIApplicationResponse;

if ("code" in body) {
	console.error(body.code, body.message);
} else {
	const app: APIApplication = body.response;
	console.log(app.name);
}
```

Prefer the official SDK if you don't want to write the requests yourself: [`@vertracloud/sdk-api`](https://www.npmjs.com/package/@vertracloud/sdk-api).

## Conventions

**Envelope.** Every JSON response is `{ response }` on success and `{ code, message?, details? }` on error (`APIPayload<T>`). `code` is a stable English sentinel listed in `APIErrorCode`; routes with nothing to return answer `{ response: null }`. `APIPayload<T>` is a union of both shapes: check `"code" in body` and TypeScript narrows each branch.

**Naming.**

| Prefix | Meaning | Example |
|---|---|---|
| `API*` | A payload returned by the API | `APIApplication` |
| `REST<Method>API<Resource>*Body` | Request body | `RESTPostAPIApplicationCreateBody` |
| `REST<Method>API<Resource>*Query` | Query string | `RESTGetAPIApplicationMetricsQuery` |
| `REST<Method>API<Resource>*Response` | Full response envelope | `RESTGetAPIApplicationResponse` |

**Wire format.** Fields are `snake_case`. Most string unions have a companion `const` with the same name, so you can use either the literal or the constant:

```ts
import { ApplicationLanguage } from "@vertracloud/api-types/v1";

ApplicationLanguage.PYTHON === "python"; // true
```

## License

[MIT](LICENSE)
