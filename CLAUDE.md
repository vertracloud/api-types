# api-types/ — orientador

**Contrato da API pública da Vertra Cloud.** Pacote npm `@vertracloud/api-types` — a **fonte única de verdade** dos tipos, enums e envelopes trocados no fio. Consumido por `api/`, `website/` e `wing/` (o `cli/` mantém tipos locais próprios).

> Contexto e regras do contrato no **`../CLAUDE.md`** (mestre, §"O contrato `api-types`"). Doc de uso do pacote em `README.md`.

## Stack / publicação

TS + **tsup** (gera `cjs` + `esm` + `.d.ts` + sourcemaps, `splitting:false`). Lint/format via **Biome**. Publicação **pública no npm** via **Changesets** (`.changeset/`, `access:"public"`). `prepublishOnly`: clean → lint → build. Versão pré-1.0 (`0.0.41`).

## Estrutura

```
common/v1.ts     transversais: SnowFlake, PaginationMeta<T>, envelopes
                 APIPayload<T>/APIPaginatedPayload<T>/APIReturnService<T>,
                 DeepPartial<T>, ISODateString, UserPlan
payloads/v1/*.ts  1 arquivo por domínio: shapes API<Recurso> + enums de domínio
rest/v1/*.ts      1 arquivo por domínio: envelopes REST<Método><Ação><Recurso>Response|Body (+ @see doc)
v1.ts             barrel (reexporta common/payloads/rest/utils da v1)
utils.ts          Prettify<T>, Brand<T>
```

## Convenções (inegociáveis)

- **Wire `snake_case`** sempre (`owner_id`, `created_at`, `use_credits`).
- **Nomenclatura:** `API<Recurso>` = payload/recurso; `REST<Método><Ação><Recurso>` = envelope de endpoint (`RESTPostAPIApplicationCreateBody`, `RESTGetAPIApplicationResponse`); sufixo `Response` = retorno da API.
- **Enums:** `type X = "a"|"b"` + companion `const X = {...} as const` — **nunca** `enum` do TS.
- **Adicionar endpoint/tipo:** enum de domínio em `payloads/v1/<dominio>.ts`; response em `rest/v1/<dominio>.ts` envolto em `APIPayload<T>`; comentário `@see docs.vertracloud.app/api-reference/...`. Depois: **changeset + publish**, e só então implementar na `api` / consumir no `website`.

## Gates

`npm run build` (roda `check-types` = `tsc --noEmit` + `biome check`). Sem testes de runtime (é só tipo). Ao adicionar/alterar um tipo do fio: crie o changeset e registre a mudança no changelog público (`../docs/changelog/`) quando afetar o usuário.

---

**Mudou algo descrito aqui (estrutura, convenção de nomes, forma de publicar)? Atualize este `CLAUDE.md` na mesma tarefa** — e o `../CLAUDE.md` se a mudança for transversal. Doc desatualizado é bug (Regra zero do mestre).
