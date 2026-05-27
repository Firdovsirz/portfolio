# Architecture — {{Project Name}}

## 1. Context

Who uses this system, in what setting, under what constraints? Include non-functional requirements that shaped the design (audit, multi-tenancy, latency, offline tolerance, compliance).

## 2. High-level diagram

![High-level architecture](./diagrams/high-level.png)

Caption: clients on the left, services in the middle, data and external systems on the right. Arrows are request direction; dashed arrows are async / event flow.

## 3. Components

For each major component:

### {{Component name}}

- **Responsibility** — single sentence.
- **Inputs** — what it consumes.
- **Outputs** — what it produces.
- **Owns** — what data it is the source of truth for.
- **Doesn't own** — what it reads but doesn't write.
- **Failure modes** — what happens when it's slow, down, or returns garbage.

Repeat per component.

## 4. Data model

Entity-relationship sketch and the half-dozen most important tables. For each:

- Purpose.
- Primary key strategy and why.
- Indexes that are load-bearing.
- Invariants enforced in the DB vs in the application.
- Migration considerations (especially for tables that are versioned across academic years, competition rounds, etc.).

## 5. Request lifecycle

Pick the most important read path and the most important write path. Walk through each end-to-end: auth, validation, domain, persistence, response. Note any caching, fan-out, or async hand-off.

## 6. External integrations

For each external system ({{Scopus, Web of Science, payments, etc.}}):

- Purpose.
- Auth mechanism.
- Rate limits and how they're respected.
- Failure mode handling (retry, backoff, degraded operation).
- Identifier reconciliation strategy if applicable.

## 7. Authorisation model

- Roles and the resources they scope to.
- Where authorisation is enforced (middleware, service layer, query layer).
- How permission changes propagate.

## 8. Observability

- Logs — structured, correlation IDs.
- Metrics — what's tracked, what's alerted on.
- Tracing — where spans are emitted.

## 9. Deployment

- Containers, orchestration, environments.
- Migration strategy.
- Rollback plan.

## 10. Open questions

Things that are not yet decided or that need to change. Be honest — open questions are a sign of a real system, not an unfinished one.

## 11. Decision log

Pointers to the ADRs in `docs/DECISIONS/`.

---

Last updated · {{YYYY-MM-DD}}
Maintainer · Firdovsi Rzaev
