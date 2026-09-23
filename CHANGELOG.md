# @vertracloud/api-types

## 0.2.0 (2026-09-23)

Esta versão alinha o contrato com o que a API pública realmente aceita e devolve. Há muitas mudanças **breaking**: nomes foram renomeados sem alias, campos soltos foram estreitados e tipos sem rota correspondente foram removidos.

### Envelope e erros

- `APIPayload` ganha `details?: Record<string, unknown>` — o envelope de erro é `{ code, message?, details? }`. Em `VALIDATION_ERROR`, o campo inválido vem em `details.path`.
- Rotas sem retorno respondem `{ response: null }`: toda resposta vazia passa a ser `APIPayload<null>` (antes `APIPayload<void>`).
- Novo catálogo de códigos de erro públicos em `payloads/v1/api-error`.
- Novo `RESTAPIWorkspaceQuery` (`workspace_id?`), compartilhado pelas rotas de aplicação e banco.

### Aplicações

- `APIApplication` ganha `build_command`, `github` (`repo_owner`/`repo_name` ou `null`) e `shield_cooldown` (contenção ativa do Vertra Shield, com `until`, `reason`, `direction` e `strikes`; `null` quando não há contenção).
- `RESTPostAPIApplicationCreateBody` ganha `build` e `snapshot_id`; `memory`, `main` e `version` ficam opcionais (obrigatórios só ao criar a partir de `file`). `file` e `snapshot_id` são mutuamente exclusivos.
- `RESTPostAPIApplicationRestartBody` com `reinstall_dependencies`, `force_build` e `cleanup_old_runtime_language`. Os dois primeiros contam no limite de deploys por hora do plano.
- Publicação web liga e desliga depois da criação: `APIApplicationWebPublish` e os envelopes de `POST`/`DELETE /v1/apps/{id}/network/publish`. `subdomain` é opcional — ausente, a plataforma sorteia o endereço.
- `APIApplicationStatus` e `APIApplicationStatusShort` ganham `installing` e `uptime` (segundos, `null` quando desconhecido). `APIApplicationStatus` perde `status` (nunca era enviado) e `network` fica anulável; `APIApplicationStatusShort` ganha `storage` e `network` opcionais.
- `GET /v1/apps/status` e `GET /v1/databases/status` devolvem listas.
- `APIApplicationFileContent` é sempre base64, com `size` e `last_modified`. A forma `buffer` e `ApplicationFileContentType.BUFFER` foram removidas. `last_modified` pode ser reenviado no `PUT` de arquivo para detectar conflito (`FILE_MODIFIED`).
- Novos: `APIApplicationRuntime`/`APIApplicationRuntimes` (`GET /v1/apps/runtimes`), `ApplicationRealtimeEventType` e `APIApplicationRealtimeEvent`, `ApplicationDnsRecordType`, `ApplicationDnsRecordStatus`, `RESTGetAPIApplicationFileTreeResponse` e os tipos de query de métricas, tempo real, arquivos e upload.
- Webhook de deploy automático: caminho unificado no singular; `APIApplicationWebhook` carrega `webhook_url`, `repo_owner` e `repo_name`.
- Removidos `RESTPostAPIApplicationInstallDependenciesBody`/`Response` (use `reinstall_dependencies` no restart) e `APIApplicationActivity`.

### Bancos de dados

- Contrato da aba **Dados** do banco em `payloads/v1/database-data` e `rest/v1/database-data` (SQL, Mongo e Redis). Disponível apenas pelo painel.
- `RESTPostAPIDatabaseCreateBody` ganha `snapshot_id`; ao criar de uma snapshot, `type` fica opcional.
- `APIDatabaseStatus.status` é `"running" | "stopped"` e `network` fica anulável.
- Atualizar e resetar devolvem `APIDatabaseOperationResponse`; excluir devolve o id; o certificado vem em JSON (`APIDatabaseCertificate`). Novo `RESTPutAPIDatabaseUpdateBody`.
- As respostas de iniciar e parar foram renomeadas pelo verbo da rota e devolvem `{ status }`.
- Removidos `APIDatabaseActivity` e `APIDatabaseSnapshot`.

### Snapshots

- `APIResourceSnapshot` ganha `resource_name`.
- Novos `SnapshotScope`, `SnapshotResourceType`, `RESTPostAPISnapshotRestoreBody` e queries por rota (`RESTGetAPISnapshotsQuery`, `RESTGetAPIGroupedSnapshotsQuery`, `RESTPostAPISnapshotCreateQuery`, `RESTPostAPISnapshotRestoreQuery`, `RESTGetAPISnapshotDownloadQuery`).
- `APIGroupedResourceSnapshots.snapshots` usa o formato compacto `APIGroupedResourceSnapshot`.
- Removido `RESTGetAPISnapshotResponse` (a rota não existe).

### Conta, chaves de API e OAuth

- Chaves de API múltiplas com escopos: `APIApiKey`, `APIApiKeyCreated`, `APIApiKeyScope`, o catálogo `API_KEY_SCOPES`, presets (`apiKeyPresetScopes`) e os envelopes de `/v1/users/me/api-keys`, incluindo o histórico de requisições por chave.
- Novos escopos `billing:read`, `billing:write`, `redeem:write`, `workspaces:delete` e `workspaces:invites`.
- Ficam só no painel, sem escopo de chave: aba Dados do banco, notificações e log de atividades.
- Fluxo OAuth de "conectar conta" (`payloads/v1/oauth`, `rest/v1/oauth`): cliente, registro dinâmico, consentimento e troca do código por token. O token emitido é uma chave de API comum.
- Novo `UserLanguage` (`"pt-br" | "en-us" | "es-es"`). `RESTPatchAPIUserMeResponse` e `RESTPostAPIUserDowngradeResponse` devolvem `APIUser`.
- Leitura de arquivo de repositório do GitHub: `APIGitHubFile` e os envelopes de `POST /v1/github/repository/file`.

### Workspaces e atividades

- Workspaces v2: catálogo de `WorkspacePermission`, papéis personalizáveis (`APIWorkspaceRole`, presets `admin`/`developer`/`operator`/`viewer`), convites por e-mail e link (`APIWorkspaceInvite*`), pedidos de ação (`APIWorkspaceActionRequest`, união discriminada por `action`) e `WORKSPACE_ERROR_CODES`.
- Organização salva de aplicações e bancos por usuário: pastas e favoritos, no escopo pessoal ou do workspace.
- `APIActivity` ganha `origin` (`ActivityOrigin`), `workspace_id` e `author`; a listagem reflete a resposta paginada, com query própria.
- `APIUser` ganha `workspace_invites_enabled`.
- Removidos `WorkspaceMemberRole`, `APIUserWorkspaceInviteKey`, `RESTGetAPIWorkspaceResponse`, `RESTGetAPIActivityResponse` e `APIReturnService`.

### Pedidos

- `POST /v1/orders` aceita apenas planos: `RESTPostAPIOrderCreateBody.plan` e `months` são obrigatórios, `amount` saiu, e `related_to.plan` é sempre presente.
- `OrderStatus`, `OrderType` e `OrderProvider` ganham `const` companheiro. `APIOrderCreateResponse` ganha `discount` (`APIOrderDiscount`). Nova `RESTGetAPIOrderListQuery`.
- `APIApplication` e `APIDatabase` perdem `use_credits` e `credits_used`; os tipos de saldo e uso foram removidos.

### Renomeados

- `RESTPostAPIApplicationUpdateConfigResponse` → `RESTPatchAPIApplicationUpdateConfigResponse`
- `RESTPostAPIPixPaymentResponse` → `RESTPostAPIOrderPixPaymentResponse`; `APIPixPaymentResponse` → `APIOrderPixPayment`
- `RESTPostAPIApplicationEnvironmentObject` → `RESTPostAPIApplicationEnvironmentVariableBody`
- `APICustomDomainResponse` → `APIApplicationCustomDomain`, `APISubdomainResponse` → `APIApplicationSubdomain`, `APIWebhookUrl` → `APIApplicationWebhookUrl`, `APIDnsRecord` → `APIApplicationDnsRecord`, `APIAppFileUploadResponse` → `APIApplicationFileUpload`
- `APIOrderCreateType` → `OrderType`

### Pacote

- Tipos que nunca fizeram parte da API pública foram removidos.
- Todo link `@see` aponta para uma página existente da referência da API.

## 0.1.1

- `APIApplication` ganha `missing_dependencies`, com os tipos REST de instalação de dependências.

## 0.1.0

- `APIActivity.title` e `message` passam de `string` para `LocalizedContent`, para tradução.
- `plan_id` em aplicação e workspace; aplicação e banco ganham o workspace dono.
- Variáveis de ambiente de aplicação e ajustes no status.
- `APIDatabase` perde `db_name`, `username`, `password` e `connection`.
- `domain` renomeado para `subdomain`.

## 0.0.38 (2026-03-21)

- Tipos de pedido (`APIOrderCreateResponse`, `APIOrderStatus`, `APIOrderListItem`, `OrderStatus`, `OrderType`, `OrderProvider`), resgate de código (`APIRedeemResponse`) e notificações (`RESTGetAPINotificationsResponse`).
- Aplicação: `APIApplicationOperationResponse`, `APIApplicationDeployment`, DNS, webhook, subdomínio e domínio personalizado.
- Banco: `APIDatabasePasswordReset`. Usuário: `APIUserApiKey` e `is_current` em `APIUserSession`. Workspace: adicionar membro e alterar papel. Snapshot: `APISnapshotRestoreResponse`.
- Envelopes REST de aplicações, bancos, usuário, workspaces e snapshots.
- Links `@see` apontam para a documentação.

## 0.0.37 (2026-03-19)

- Tipos de workspace (`APIWorkspace`, `APIWorkspaceInfoResponse`, `APIWorkspaceMember`) substituem os de organização.
- `offline_since` em `APIApplication` e `APIDatabase`.

## 0.0.36 (2026-03-17)

- Linguagens `ruby`, `java` e `rust` em `ApplicationLanguage`.

## 0.0.35 (2026-03-10)

- Módulo `snapshot` dedicado: `APIResourceSnapshot`, `APIGroupedResourceSnapshots` e `ResourceType`.

## 0.0.34 (2026-03-09)

- **Breaking:** backup passa a se chamar snapshot em todos os tipos e campos. Tipos de commit removidos.

## 0.0.33 (2026-03-08)

- Ajustes nos tipos de banco.

## 0.0.32 (2026-03-06)

- Notificações: `APINotification`, `NotificationType`, `NotificationImportance` e `LocalizedContent`.
- Usuário: `language`, `APIUserConnection` e `APIUserSession`. Novo `RESTGetAPIUserInfoResponse`.

## 0.0.31 (2026-01-17)

- `description` opcional em `APIApplication`; `email` em `APIUser`.

## 0.0.30 (2025-12-01)

- Linguagens `go` e `php` em `ApplicationLanguage`.

## 0.0.29 (2025-11-24)

- Ajustes no tipo de plano do usuário.

## 0.0.28 (2025-11-14)

- `static` em `ApplicationLanguage`, para sites estáticos.

## 0.0.27 (2025-11-10)

- Cluster `USA_3` em `ApplicationCluster` e `DatabaseCluster`.

## 0.0.26 (2025-10-22)

- Plano `INTERMEDIARY` (id 9) em `UserPlan`.

## 0.0.25 (2025-09-22)

- Ajustes no enum de linguagens.

## 0.0.24 (2025-09-19)

- Melhorias gerais de tipagem.

## 0.0.23 (2025-08-03)

- **Breaking:** `APIDatabase` perde `password`, `username` e `connection`.

## 0.0.22 (2025-07-25)

- Estrutura de memória de `APIUserPlan` e tipos de organização e usuário atualizados.

## 0.0.21 (2025-07-22)

- Ajustes no plano do usuário.

## 0.0.20 (2025-07-12)

- Ajustes na conexão de banco.

## 0.0.19 (2025-07-10)

- `APIApplicationEnvironment` e `RESTGetAPIApplicationEnvironmentResponse`.

## 0.0.18 (2025-07-03)

- `APIApplicationNetwork`, métricas e status de banco.

## 0.0.17 (2025-06-28)

- Atividades: `APIActivity`, `ActivityStatus`, `ActivityTargetType` e envelopes REST.

## 0.0.16 (2025-06-25)

- Tipos de backup de aplicação (depois renomeados para snapshot).

## 0.0.15 (2025-06-17)

- Tipos de commit de aplicação (depois substituídos por snapshots).

## 0.0.14 (2025-05-03)

- Gerenciador de arquivos: `APIApplicationFile`, `APIApplicationFileTree`, `APIApplicationFileContent` e tipos relacionados.
- `custom_domain` em `APIApplication`.

## 0.0.13 (2025-04-28)

- Tipos de organização (depois renomeados para workspace).

## 0.0.12 (2025-04-21)

- Primeira versão: usuário, plano, aplicação, banco, status, tipos comuns e envelopes REST.
