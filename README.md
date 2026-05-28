# Nexora — Enterprise E-Commerce Platform

> A production-grade microservices e-commerce platform built with Next.js 14,
> NestJS, Kafka, PostgreSQL, Redis, OpenSearch, and Kubernetes.

## Architecture

```
apps/          → Next.js frontends (storefront, admin, seller)
services/      → NestJS microservices (auth, product, order, payment, etc.)
packages/      → Shared libraries (ui, types, utils, kafka-events, grpc-protos)
docker/        → Docker Compose configs (local & prod)
infrastructure/ → Kubernetes, Helm, Terraform, Monitoring
```

## Tech Stack

| Layer         | Tools                                                                              |
| ------------- | ---------------------------------------------------------------------------------- |
| Frontend      | Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zustand |
| Backend       | NestJS 10, TypeScript, REST, GraphQL (Apollo Federation), gRPC                     |
| Databases     | PostgreSQL 16, Redis 7, OpenSearch 2, MinIO                                        |
| Messaging     | Apache Kafka 3, Avro, Confluent Schema Registry, Debezium                          |
| DevOps        | Docker, Kubernetes, Helm, GitHub Actions, ArgoCD                                   |
| Observability | Prometheus, Grafana, Loki, Jaeger, OpenTelemetry                                   |
| AI            | OpenAI, LangChain, vector search (kNN)                                             |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop

### Local Development

```bash
# Install dependencies
pnpm install

# Start infrastructure (databases, kafka, opensearch)
docker compose --env-file docker/local/.env.local -f docker/local/docker-compose.local.yml up -d postgres redis kafka minio opensearch

# Start all apps and services (with hot-reload)
pnpm dev
```

### Environment Setup

```bash
cp .env.example .env.local
# Fill in the required values in .env.local
```

## Services

| Service                | Port | Description                    |
| ---------------------- | ---- | ------------------------------ |
| storefront             | 3000 | Customer-facing Next.js app    |
| api-gateway            | 4000 | GraphQL + REST gateway         |
| auth-service           | 3001 | Authentication & authorization |
| user-service           | 3002 | User profiles & addresses      |
| product-service        | 3003 | Product catalog management     |
| inventory-service      | 3004 | Stock tracking                 |
| cart-service           | 3005 | Shopping cart (Redis-backed)   |
| order-service          | 3006 | Order lifecycle + Saga         |
| payment-service        | 3007 | Stripe/PayPal integration      |
| notification-service   | 3008 | Email/SMS/push notifications   |
| search-service         | 3009 | OpenSearch full-text + kNN     |
| recommendation-service | 3010 | AI-powered recommendations     |
| analytics-service      | 3011 | ClickHouse analytics           |

## Dev Tools (local)

| Tool                  | URL                            |
| --------------------- | ------------------------------ |
| Kafka UI              | http://localhost:8080          |
| OpenSearch Dashboards | http://localhost:5601          |
| MinIO Console         | http://localhost:9001          |
| Prometheus            | http://localhost:9090          |
| Grafana               | http://localhost:3333          |
| API Docs (Swagger)    | http://localhost:4000/api/docs |

## Git Conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(order-service): implement saga orchestration
fix(auth-service): fix refresh token rotation race condition
chore(docker): add prod docker-compose with nginx
```

## Development Phases

1. ✅ Foundation Setup (monorepo, Docker, shared packages)
2. 🔄 Frontend Foundation (design system, storefront pages)
3. ⬜ Backend Monolith (NestJS + Prisma + Auth)
4. ⬜ Microservices Migration
5. ⬜ Event-Driven Architecture (Saga, Outbox, CQRS)
6. ⬜ Search & Recommendation
7. ⬜ Realtime Features (WebSocket)
8. ⬜ Observability
9. ⬜ Kubernetes & Cloud
10. ⬜ Security Hardening
11. ⬜ AI Features
12. ⬜ Production Engineering
