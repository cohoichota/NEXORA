# E-Commerce Enterprise Platform — Master Instruction Guide v2.0
Name of the app: Nexora

> **Goal:** Build a production-grade enterprise E-commerce platform using modern frontend, backend, distributed systems, cloud-native infrastructure, observability, AI features, and advanced architecture patterns.
>
> **Two environments:** `local` (Docker Compose, hot-reload, dev tools) and `prod` (Docker Compose or Kubernetes, optimized images, secrets management).

This project is intentionally over-engineered to maximize:
- CV impact and senior engineering exposure
- System design and distributed systems knowledge
- Cloud-native and DevOps experience
- Architecture interview preparation

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Core Technology Stack](#2-core-technology-stack)
3. [Architecture Overview](#3-architecture-overview)
4. [Environment Strategy](#4-environment-strategy)
5. [Docker Setup — Local](#5-docker-setup--local)
6. [Docker Setup — Production](#6-docker-setup--production)
7. [Development Phases](#7-development-phases)
8. [Repository Structure](#8-repository-structure)
9. [Git Strategy](#9-git-strategy)
10. [Coding Standards](#10-coding-standards)
11. [Advanced Topics](#11-advanced-topics)
12. [Resume Impact](#12-resume-impact)

---

## 1. Project Vision

Build a scalable marketplace platform similar to Amazon, Shopify, Lazada, and Shopee.

The platform supports:
- **Customers** — browse, search, purchase, review
- **Sellers** — list products, manage inventory, fulfill orders
- **Admins** — moderate content, manage users, view analytics
- **System** — real-time updates, payments, AI recommendations, event-driven workflows

---

## 2. Core Technology Stack

### Frontend

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | SSR/SSG framework |
| React 18 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Pre-built accessible components |
| TanStack Query v5 | Server state management |
| Zustand | Client state management |
| React Hook Form + Zod | Form handling and validation |
| Socket.IO Client | Realtime communication |
| Framer Motion | Animations |
| Playwright | E2E testing |
| Vitest | Unit/integration testing |

### Backend

| Tool | Purpose |
|------|---------|
| NestJS 10 | Backend framework |
| TypeScript 5 | Type safety |
| REST API | Public HTTP endpoints |
| GraphQL (Apollo Federation) | Unified graph layer |
| gRPC | Internal service communication |
| Prisma ORM | Database access |
| JWT + Refresh Tokens | Authentication |
| OAuth2 (Google, GitHub) | Social login |
| RBAC | Authorization |
| Swagger/OpenAPI | API documentation |
| WebSocket Gateway | Realtime server events |

### Databases

| Database | Usage |
|----------|-------|
| PostgreSQL 16 | Primary relational store |
| Redis 7 | Cache, sessions, pub/sub |
| OpenSearch 2 | Full-text search, faceted filtering |
| MinIO | Object storage (local S3-compatible) |
| ClickHouse | Analytics (optional, Phase 8+) |

### Event & Messaging

| Tool | Purpose |
|------|---------|
| Apache Kafka 3 | Event streaming backbone |
| KafkaJS | Node.js Kafka client |
| Avro Schema | Typed event contracts |
| Confluent Schema Registry | Schema versioning |
| Debezium | Change Data Capture (CDC) |
| Outbox Pattern | Reliable event publishing |

### DevOps

| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| Docker Compose | Local and prod orchestration |
| Kubernetes (K8s) | Production cluster (Phase 9+) |
| Helm | K8s package manager |
| GitHub Actions | CI/CD pipelines |
| ArgoCD | GitOps deployments |
| NGINX Ingress | Traffic routing |

### Observability

| Tool | Purpose |
|------|---------|
| Prometheus | Metrics collection |
| Grafana | Dashboards and alerting |
| Loki | Centralized log aggregation |
| OpenTelemetry SDK | Instrumentation |
| Jaeger | Distributed tracing |

### Security

| Tool | Purpose |
|------|---------|
| Helmet | HTTP security headers |
| express-rate-limit | Rate limiting |
| throttler (NestJS) | API throttling |
| dotenv / Vault | Secrets management |
| Refresh token rotation | Session security |
| CSRF tokens | Cross-site forgery protection |
| Secure cookies (HttpOnly, SameSite) | Cookie hardening |

### AI Features

| Feature | Tools |
|---------|-------|
| AI chatbot | OpenAI / Gemini API |
| Semantic product search | Embeddings + vector search |
| AI product descriptions | GPT-4o |
| Recommendation engine | Embedding similarity |
| RAG pipeline | LangChain / LlamaIndex |

---

## 3. Architecture Overview

### Frontend Applications

```
apps/
├── storefront/          # Customer-facing shopping app
├── admin-dashboard/     # Admin control panel
└── seller-dashboard/    # Seller inventory and orders
```

#### Customer Storefront
- Product browsing, search, filters
- Checkout flow (cart → address → payment → confirmation)
- User profile, order history, wishlist, reviews
- Realtime inventory status and order tracking

#### Admin Dashboard
- User and seller management
- Product moderation and approval
- Platform analytics and reports
- System monitoring integration (Grafana embed)

#### Seller Dashboard
- Product CRUD with image upload (MinIO)
- Inventory management and low-stock alerts
- Order fulfillment workflow
- Revenue dashboard and payout history

---

### Backend Microservices

```
services/
├── api-gateway/
├── auth-service/
├── user-service/
├── product-service/
├── inventory-service/
├── cart-service/
├── order-service/
├── payment-service/
├── notification-service/
├── search-service/
├── recommendation-service/
└── analytics-service/
```

#### API Gateway
- Route all external traffic to internal services
- GraphQL Federation gateway (Apollo Gateway)
- REST proxy for non-GraphQL consumers
- Authentication middleware (JWT validation)
- Rate limiting and throttling
- Request/response logging

#### Auth Service
- Register, login, logout
- Google / GitHub OAuth2
- JWT access token (15m expiry) + refresh token (7d, stored in Redis)
- Refresh token rotation with token family invalidation
- RBAC: roles `CUSTOMER`, `SELLER`, `ADMIN`
- Session management and device tracking

#### User Service
- User profile CRUD
- Avatar upload to MinIO
- Address book (multiple addresses)
- Notification preferences

#### Product Service
- Product CRUD (title, description, price, images, attributes)
- Category and tag management
- Variant system (size, color, etc.)
- Image upload to MinIO with thumbnail generation
- Product approval workflow (PENDING → APPROVED → REJECTED)

#### Inventory Service
- Real-time stock tracking per SKU
- Inventory reservation on checkout (with TTL via Redis)
- Saga participant: reserve and release inventory
- Optimistic locking to prevent overselling
- Warehouse/location support

#### Cart Service
- Redis-backed cart (TTL: 7 days)
- Guest cart with cart merge on login
- Cart item validation (stock, price changes)
- Coupon/discount application

#### Order Service
- Order lifecycle: `PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED → CANCELLED`
- Saga orchestration for checkout flow
- Invoice PDF generation
- CQRS: write model (PostgreSQL) + read model (Redis projections)
- Outbox pattern for reliable event publishing

#### Payment Service
- Stripe and PayPal integration
- Webhook handling for async payment events
- Refund processing
- Idempotency keys to prevent duplicate charges
- Circuit breaker around payment provider calls

#### Notification Service
- Email via SendGrid / Nodemailer
- SMS via Twilio
- In-app push notifications via WebSocket
- Kafka consumer for all notification events
- Template system for each notification type

#### Search Service
- Product indexing via Kafka consumer
- Full-text search with scoring
- Faceted filtering (category, price range, rating, brand)
- Autocomplete / typeahead
- Typo tolerance and synonyms
- Reindexing strategy via admin API

#### Recommendation Service
- Trending products (by views, purchases)
- Similar products (embedding cosine similarity)
- Personalized recommendations (user purchase/view history)
- Recently viewed (Redis sorted set)

#### Analytics Service
- Kafka consumer for user events (views, clicks, purchases)
- ClickHouse ingestion pipeline
- Aggregated metrics API for dashboards
- Seller-specific revenue analytics

---

## 4. Environment Strategy

Two environments are defined with separate configurations:

| Aspect | Local | Production |
|--------|-------|-----------|
| Compose file | `docker-compose.local.yml` | `docker-compose.prod.yml` |
| Env file | `.env.local` | `.env.prod` (secrets injected by CI) |
| Build type | Development (hot-reload, source maps) | Production (multi-stage, optimized) |
| Databases | Exposed on host ports | Internal network only |
| Observability | Optional, lightweight | Full stack enabled |
| HTTPS | No (HTTP localhost) | Yes (TLS via NGINX) |
| MinIO | localhost:9001 console open | Console disabled or VPN-only |
| Secrets | `.env.local` file | Docker secrets or Vault |

### Environment Variables Convention

```
.env.local          # Local development values (committed as .env.example)
.env.prod           # Production values (NEVER committed, injected by CI/CD)
.env.example        # Template with all keys, no real values (committed)
```

All services read from environment variables. No hardcoded values anywhere.

---

## 5. Docker Setup — Local

### 5.1 Folder Structure for Docker

```
/docker
├── local/
│   ├── docker-compose.local.yml
│   ├── .env.local
│   └── nginx/
│       └── nginx.local.conf
├── prod/
│   ├── docker-compose.prod.yml
│   ├── .env.prod.example
│   └── nginx/
│       └── nginx.prod.conf
└── shared/
    └── init-scripts/
        ├── postgres/
        │   └── 01-init.sql
        └── kafka/
            └── create-topics.sh
```

### 5.2 docker-compose.local.yml

```yaml
# docker-compose.local.yml
# Local development environment — hot-reload, all ports exposed, dev tooling enabled

version: "3.9"

networks:
  ecommerce-local:
    driver: bridge

volumes:
  postgres_local_data:
  redis_local_data:
  minio_local_data:
  opensearch_local_data:
  kafka_local_data:
  zookeeper_local_data:

services:

  # ─────────────────────────────────────────────
  # INFRASTRUCTURE
  # ─────────────────────────────────────────────

  postgres:
    image: postgres:16-alpine
    container_name: ecommerce-postgres-local
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"          # Exposed for local tools (DBeaver, TablePlus)
    volumes:
      - postgres_local_data:/var/lib/postgresql/data
      - ./shared/init-scripts/postgres:/docker-entrypoint-initdb.d
    networks:
      - ecommerce-local
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis-local
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD}
    ports:
      - "6379:6379"          # Exposed for local Redis clients
    volumes:
      - redis_local_data:/data
    networks:
      - ecommerce-local
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      retries: 5

  minio:
    image: minio/minio:latest
    container_name: ecommerce-minio-local
    restart: unless-stopped
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    ports:
      - "9000:9000"          # S3 API
      - "9001:9001"          # Web console
    volumes:
      - minio_local_data:/data
    networks:
      - ecommerce-local

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    container_name: ecommerce-zookeeper-local
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "2181:2181"
    volumes:
      - zookeeper_local_data:/var/lib/zookeeper/data
    networks:
      - ecommerce-local

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    container_name: ecommerce-kafka-local
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"
    ports:
      - "29092:29092"        # Exposed for local Kafka tools (Offset Explorer)
    volumes:
      - kafka_local_data:/var/lib/kafka/data
    networks:
      - ecommerce-local

  schema-registry:
    image: confluentinc/cp-schema-registry:7.6.0
    container_name: ecommerce-schema-registry-local
    depends_on:
      - kafka
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: kafka:9092
    ports:
      - "8081:8081"
    networks:
      - ecommerce-local

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: ecommerce-kafka-ui-local
    depends_on:
      - kafka
      - schema-registry
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092
      KAFKA_CLUSTERS_0_SCHEMAREGISTRY: http://schema-registry:8081
    ports:
      - "8080:8080"          # Kafka UI dashboard
    networks:
      - ecommerce-local

  opensearch:
    image: opensearchproject/opensearch:2.12.0
    container_name: ecommerce-opensearch-local
    environment:
      - discovery.type=single-node
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=${OPENSEARCH_PASSWORD}
      - plugins.security.disabled=true    # Disable for local simplicity
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch_local_data:/usr/share/opensearch/data
    networks:
      - ecommerce-local

  opensearch-dashboards:
    image: opensearchproject/opensearch-dashboards:2.12.0
    container_name: ecommerce-opensearch-dashboards-local
    depends_on:
      - opensearch
    environment:
      OPENSEARCH_HOSTS: '["http://opensearch:9200"]'
      DISABLE_SECURITY_DASHBOARDS_PLUGIN: "true"
    ports:
      - "5601:5601"
    networks:
      - ecommerce-local

  # ─────────────────────────────────────────────
  # MICROSERVICES (development mode with hot-reload)
  # ─────────────────────────────────────────────

  auth-service:
    build:
      context: ../../services/auth-service
      dockerfile: Dockerfile.local
    container_name: ecommerce-auth-local
    restart: unless-stopped
    env_file: .env.local
    environment:
      SERVICE_NAME: auth-service
      PORT: 3001
      DB_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
    volumes:
      - ../../services/auth-service:/app
      - /app/node_modules              # Prevent host node_modules from overriding
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - ecommerce-local

  product-service:
    build:
      context: ../../services/product-service
      dockerfile: Dockerfile.local
    container_name: ecommerce-product-local
    restart: unless-stopped
    env_file: .env.local
    environment:
      SERVICE_NAME: product-service
      PORT: 3002
      DB_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      KAFKA_BROKERS: kafka:9092
      MINIO_ENDPOINT: minio
      MINIO_PORT: 9000
    volumes:
      - ../../services/product-service:/app
      - /app/node_modules
    ports:
      - "3002:3002"
    depends_on:
      - postgres
      - kafka
      - minio
    networks:
      - ecommerce-local

  order-service:
    build:
      context: ../../services/order-service
      dockerfile: Dockerfile.local
    container_name: ecommerce-order-local
    restart: unless-stopped
    env_file: .env.local
    environment:
      SERVICE_NAME: order-service
      PORT: 3003
      DB_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      KAFKA_BROKERS: kafka:9092
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
    volumes:
      - ../../services/order-service:/app
      - /app/node_modules
    ports:
      - "3003:3003"
    networks:
      - ecommerce-local

  # Add remaining services following the same pattern:
  # inventory-service → port 3004
  # cart-service      → port 3005
  # payment-service   → port 3006
  # notification-service → port 3007
  # search-service    → port 3008
  # recommendation-service → port 3009
  # analytics-service → port 3010

  api-gateway:
    build:
      context: ../../apps/api-gateway
      dockerfile: Dockerfile.local
    container_name: ecommerce-gateway-local
    restart: unless-stopped
    env_file: .env.local
    environment:
      PORT: 4000
      AUTH_SERVICE_URL: http://auth-service:3001
      PRODUCT_SERVICE_URL: http://product-service:3002
      ORDER_SERVICE_URL: http://order-service:3003
    volumes:
      - ../../apps/api-gateway:/app
      - /app/node_modules
    ports:
      - "4000:4000"
    depends_on:
      - auth-service
      - product-service
      - order-service
    networks:
      - ecommerce-local

  storefront:
    build:
      context: ../../apps/storefront
      dockerfile: Dockerfile.local
    container_name: ecommerce-storefront-local
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4000
      NEXT_PUBLIC_WS_URL: ws://localhost:4000
    volumes:
      - ../../apps/storefront:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
    networks:
      - ecommerce-local

  # ─────────────────────────────────────────────
  # OBSERVABILITY (lightweight for local)
  # ─────────────────────────────────────────────

  prometheus:
    image: prom/prometheus:latest
    container_name: ecommerce-prometheus-local
    volumes:
      - ./observability/prometheus.local.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      - ecommerce-local

  grafana:
    image: grafana/grafana:latest
    container_name: ecommerce-grafana-local
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
      GF_AUTH_ANONYMOUS_ENABLED: "true"
    ports:
      - "3333:3000"
    volumes:
      - ./observability/grafana/provisioning:/etc/grafana/provisioning
    networks:
      - ecommerce-local
```

### 5.3 Service Dockerfiles — Local

Each service has a `Dockerfile.local` optimized for development:

```dockerfile
# services/auth-service/Dockerfile.local
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source (will be overridden by volume mount in local)
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

EXPOSE 3001

# Use ts-node-dev for hot reload
CMD ["pnpm", "run", "start:dev"]
```

### 5.4 Local Environment File

```bash
# .env.local — Local development environment
# Copy to .env.local and fill in values

# ── Database ──────────────────────────────
POSTGRES_USER=ecommerce_user
POSTGRES_PASSWORD=ecommerce_password_local
POSTGRES_DB=ecommerce_db

# ── Redis ─────────────────────────────────
REDIS_PASSWORD=redis_password_local

# ── MinIO ─────────────────────────────────
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin123
MINIO_BUCKET_PRODUCTS=products
MINIO_BUCKET_AVATARS=avatars

# ── Kafka ─────────────────────────────────
KAFKA_BROKERS=kafka:9092
SCHEMA_REGISTRY_URL=http://schema-registry:8081

# ── OpenSearch ────────────────────────────
OPENSEARCH_URL=http://opensearch:9200
OPENSEARCH_PASSWORD=Admin_password123!

# ── Auth ──────────────────────────────────
JWT_SECRET=super_secret_jwt_key_local_only
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=super_secret_refresh_local
REFRESH_TOKEN_EXPIRES_IN=7d

# ── OAuth ─────────────────────────────────
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# ── Payments ──────────────────────────────
STRIPE_SECRET_KEY=sk_test_xxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxx

# ── Notifications ─────────────────────────
SENDGRID_API_KEY=SG.xxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxx
TWILIO_AUTH_TOKEN=xxxxxx

# ── AI ────────────────────────────────────
OPENAI_API_KEY=sk-xxxxxx

# ── App URLs ──────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
CORS_ORIGIN=http://localhost:3000

# ── Environment ───────────────────────────
NODE_ENV=development
LOG_LEVEL=debug
```

### 5.5 Local Developer Commands

```bash
# Start all infrastructure (databases, kafka, opensearch)
docker compose -f docker/local/docker-compose.local.yml up -d postgres redis kafka minio opensearch

# Start all services
docker compose -f docker/local/docker-compose.local.yml up

# Start only a specific service and its dependencies
docker compose -f docker/local/docker-compose.local.yml up auth-service postgres redis

# Watch logs for a service
docker compose -f docker/local/docker-compose.local.yml logs -f auth-service

# Run Prisma migration inside a container
docker compose -f docker/local/docker-compose.local.yml exec auth-service pnpm prisma migrate dev

# Rebuild a single service after Dockerfile changes
docker compose -f docker/local/docker-compose.local.yml up --build auth-service

# Stop all containers (preserve volumes)
docker compose -f docker/local/docker-compose.local.yml down

# Full reset including volumes
docker compose -f docker/local/docker-compose.local.yml down -v
```

---

## 6. Docker Setup — Production

### 6.1 Design Principles for Production

- **Multi-stage builds**: Final image contains only runtime artifacts, no dev tools or source maps
- **Non-root user**: All containers run as `node` user (UID 1000)
- **No exposed ports**: Services communicate via internal Docker network; only NGINX and monitoring are exposed
- **Health checks**: Every service has a health check; NGINX only routes to healthy containers
- **Read-only secrets**: Injected via Docker secrets or environment variables from CI/CD (not committed files)
- **Image tagging**: Images are tagged with Git SHA for traceability (`image: ecommerce/auth:${GIT_SHA}`)

### 6.2 docker-compose.prod.yml

```yaml
# docker-compose.prod.yml
# Production environment — optimized images, no exposed DB ports, TLS via NGINX

version: "3.9"

networks:
  ecommerce-prod:
    driver: bridge
    internal: false        # NGINX needs external access

volumes:
  postgres_prod_data:
  redis_prod_data:
  minio_prod_data:
  opensearch_prod_data:
  kafka_prod_data:
  zookeeper_prod_data:
  prometheus_prod_data:
  grafana_prod_data:
  loki_prod_data:
  nginx_certs:

services:

  # ─────────────────────────────────────────────
  # INFRASTRUCTURE
  # ─────────────────────────────────────────────

  postgres:
    image: postgres:16-alpine
    container_name: ecommerce-postgres-prod
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    # NO ports exposed — internal only
    volumes:
      - postgres_prod_data:/var/lib/postgresql/data
      - ./shared/init-scripts/postgres:/docker-entrypoint-initdb.d:ro
    networks:
      - ecommerce-prod
    deploy:
      resources:
        limits:
          memory: 1G
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis-prod
    restart: always
    command: >
      redis-server
      --requirepass ${REDIS_PASSWORD}
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
      --save 60 1000
    volumes:
      - redis_prod_data:/data
    networks:
      - ecommerce-prod
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD}", "ping"]
      interval: 10s
      retries: 5

  minio:
    image: minio/minio:latest
    container_name: ecommerce-minio-prod
    restart: always
    command: server /data
    # Console disabled in production (no :9001 port)
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - minio_prod_data:/data
    networks:
      - ecommerce-prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      retries: 3

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    container_name: ecommerce-zookeeper-prod
    restart: always
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
      ZOOKEEPER_DATA_DIR: /var/lib/zookeeper/data
    volumes:
      - zookeeper_prod_data:/var/lib/zookeeper/data
    networks:
      - ecommerce-prod

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    container_name: ecommerce-kafka-prod
    restart: always
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_LOG_RETENTION_HOURS: 168
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "false"   # Explicit topic creation only in prod
    volumes:
      - kafka_prod_data:/var/lib/kafka/data
    networks:
      - ecommerce-prod

  schema-registry:
    image: confluentinc/cp-schema-registry:7.6.0
    container_name: ecommerce-schema-registry-prod
    restart: always
    depends_on:
      - kafka
    environment:
      SCHEMA_REGISTRY_HOST_NAME: schema-registry
      SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: kafka:9092
    networks:
      - ecommerce-prod

  opensearch:
    image: opensearchproject/opensearch:2.12.0
    container_name: ecommerce-opensearch-prod
    restart: always
    environment:
      - discovery.type=single-node
      - OPENSEARCH_INITIAL_ADMIN_PASSWORD=${OPENSEARCH_PASSWORD}
      - plugins.security.ssl.http.enabled=false   # TLS handled by NGINX
      - OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m
    volumes:
      - opensearch_prod_data:/usr/share/opensearch/data
    networks:
      - ecommerce-prod
    deploy:
      resources:
        limits:
          memory: 1G

  # ─────────────────────────────────────────────
  # MICROSERVICES (production builds)
  # ─────────────────────────────────────────────

  auth-service:
    image: ecommerce/auth-service:${IMAGE_TAG:-latest}
    build:
      context: ../../services/auth-service
      dockerfile: Dockerfile.prod
    container_name: ecommerce-auth-prod
    restart: always
    env_file: .env.prod
    environment:
      NODE_ENV: production
      SERVICE_NAME: auth-service
      PORT: 3001
      DB_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379
    # NO ports exposed — only accessible via NGINX
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - ecommerce-prod
    deploy:
      resources:
        limits:
          memory: 512M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  product-service:
    image: ecommerce/product-service:${IMAGE_TAG:-latest}
    build:
      context: ../../services/product-service
      dockerfile: Dockerfile.prod
    container_name: ecommerce-product-prod
    restart: always
    env_file: .env.prod
    environment:
      NODE_ENV: production
      PORT: 3002
      DB_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      KAFKA_BROKERS: kafka:9092
      MINIO_ENDPOINT: minio
      MINIO_PORT: 9000
    networks:
      - ecommerce-prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/health"]
      interval: 30s
      retries: 3

  order-service:
    image: ecommerce/order-service:${IMAGE_TAG:-latest}
    build:
      context: ../../services/order-service
      dockerfile: Dockerfile.prod
    container_name: ecommerce-order-prod
    restart: always
    env_file: .env.prod
    environment:
      NODE_ENV: production
      PORT: 3003
    networks:
      - ecommerce-prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3003/health"]
      interval: 30s
      retries: 3

  # Continue pattern for all remaining services...

  api-gateway:
    image: ecommerce/api-gateway:${IMAGE_TAG:-latest}
    build:
      context: ../../apps/api-gateway
      dockerfile: Dockerfile.prod
    container_name: ecommerce-gateway-prod
    restart: always
    env_file: .env.prod
    environment:
      NODE_ENV: production
      PORT: 4000
    networks:
      - ecommerce-prod
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      retries: 3

  storefront:
    image: ecommerce/storefront:${IMAGE_TAG:-latest}
    build:
      context: ../../apps/storefront
      dockerfile: Dockerfile.prod
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
        NEXT_PUBLIC_WS_URL: ${NEXT_PUBLIC_WS_URL}
    container_name: ecommerce-storefront-prod
    restart: always
    environment:
      NODE_ENV: production
    networks:
      - ecommerce-prod

  # ─────────────────────────────────────────────
  # NGINX — Single entry point
  # ─────────────────────────────────────────────

  nginx:
    image: nginx:alpine
    container_name: ecommerce-nginx-prod
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./prod/nginx/nginx.prod.conf:/etc/nginx/nginx.conf:ro
      - nginx_certs:/etc/nginx/certs
    depends_on:
      - storefront
      - api-gateway
    networks:
      - ecommerce-prod

  # ─────────────────────────────────────────────
  # OBSERVABILITY — Full stack
  # ─────────────────────────────────────────────

  prometheus:
    image: prom/prometheus:latest
    container_name: ecommerce-prometheus-prod
    restart: always
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.retention.time=30d"
      - "--storage.tsdb.path=/prometheus"
    volumes:
      - ./observability/prometheus.prod.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_prod_data:/prometheus
    networks:
      - ecommerce-prod

  grafana:
    image: grafana/grafana:latest
    container_name: ecommerce-grafana-prod
    restart: always
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_ADMIN_PASSWORD}
      GF_AUTH_ANONYMOUS_ENABLED: "false"
      GF_SERVER_ROOT_URL: https://${DOMAIN}/grafana
    volumes:
      - grafana_prod_data:/var/lib/grafana
      - ./observability/grafana/provisioning:/etc/grafana/provisioning:ro
    networks:
      - ecommerce-prod

  loki:
    image: grafana/loki:latest
    container_name: ecommerce-loki-prod
    restart: always
    command: -config.file=/etc/loki/loki.yml
    volumes:
      - ./observability/loki.yml:/etc/loki/loki.yml:ro
      - loki_prod_data:/loki
    networks:
      - ecommerce-prod

  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: ecommerce-jaeger-prod
    restart: always
    environment:
      COLLECTOR_OTLP_ENABLED: "true"
    networks:
      - ecommerce-prod
```

### 6.3 Service Dockerfile — Production (Multi-Stage)

```dockerfile
# services/auth-service/Dockerfile.prod
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Stage 2: Prune dev dependencies
FROM node:20-alpine AS deps

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Stage 3: Production runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

USER nodejs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["node", "dist/main.js"]
```

### 6.4 Production NGINX Configuration

```nginx
# docker/prod/nginx/nginx.prod.conf

events {
  worker_connections 1024;
}

http {
  # ── Upstreams ─────────────────────────────────
  upstream storefront {
    server storefront:3000;
  }

  upstream api_gateway {
    server api-gateway:4000;
  }

  upstream grafana {
    server grafana:3000;
  }

  # ── HTTP → HTTPS redirect ─────────────────────
  server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
  }

  # ── HTTPS main server ─────────────────────────
  server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # ── Routes ──────────────────────────────────

    # API Gateway (REST + GraphQL + WebSocket)
    location /api/ {
      proxy_pass http://api_gateway/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket (Socket.IO)
    location /socket.io/ {
      proxy_pass http://api_gateway;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }

    # Grafana (password-protected in prod)
    location /grafana/ {
      proxy_pass http://grafana/;
    }

    # Storefront (everything else)
    location / {
      proxy_pass http://storefront;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

### 6.5 Production Deployment Commands

```bash
# Build all images and tag with git SHA
export GIT_SHA=$(git rev-parse --short HEAD)
docker compose -f docker/prod/docker-compose.prod.yml build

# Push to registry (replace with your registry)
docker tag ecommerce/auth-service:latest ghcr.io/yourorg/auth-service:${GIT_SHA}
docker push ghcr.io/yourorg/auth-service:${GIT_SHA}

# Deploy with specific image tag
IMAGE_TAG=${GIT_SHA} docker compose -f docker/prod/docker-compose.prod.yml up -d

# Run database migrations in production
docker compose -f docker/prod/docker-compose.prod.yml exec auth-service \
  npx prisma migrate deploy

# Zero-downtime service update (single service)
IMAGE_TAG=${GIT_SHA} docker compose -f docker/prod/docker-compose.prod.yml \
  up -d --no-deps auth-service

# View service health
docker compose -f docker/prod/docker-compose.prod.yml ps

# Tail logs from all services
docker compose -f docker/prod/docker-compose.prod.yml logs -f --tail=100
```

---

## 7. Development Phases

---

### PHASE 1 — Foundation Setup

**Objective:** Build a clean, well-tooled monorepo that every phase builds upon.

**Duration estimate:** 3–5 days

#### Monorepo Setup

```bash
# Initialize with pnpm + turborepo
npx create-turbo@latest ecommerce-platform
cd ecommerce-platform
pnpm install
```

#### Folder Structure

```txt
/apps
  /storefront              # Next.js customer app
  /admin-dashboard         # Next.js admin app
  /seller-dashboard        # Next.js seller app
  /api-gateway             # NestJS gateway

/services
  /auth-service
  /user-service
  /product-service
  /inventory-service
  /order-service
  /payment-service
  /notification-service
  /search-service
  /recommendation-service
  /analytics-service

/packages
  /ui                      # Shared shadcn/ui components
  /eslint-config           # Shared ESLint config
  /tsconfig                # Shared TypeScript config
  /shared-types            # Shared TypeScript interfaces/DTOs
  /shared-utils            # Shared utility functions
  /kafka-events            # Kafka event type definitions (Avro schemas)
  /grpc-protos             # gRPC proto definitions

/docker
  /local
  /prod
  /shared

/infrastructure
  /kubernetes
  /helm
  /terraform
  /monitoring
```

#### Developer Tooling

```bash
# Husky + lint-staged + commitlint
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional

# Configure commit messages: feat|fix|chore|docs|refactor|test|ci
```

**Deliverables:**
- Working monorepo with pnpm workspaces
- Shared `tsconfig`, `eslint`, `prettier` configs
- Git hooks enforcing conventional commits
- GitHub Actions lint + type-check pipeline
- Both Docker Compose files scaffolded and running infrastructure

---

### PHASE 2 — Frontend Foundation

**Objective:** Build a design system and core pages for the customer storefront.

**Duration estimate:** 1–2 weeks

#### Design System (packages/ui)

- Typography scale
- Color tokens (light/dark)
- Button (primary, secondary, ghost, destructive)
- Input, Textarea, Select
- Card, Badge, Avatar
- Modal / Dialog
- Toast (using sonner)
- Skeleton loaders
- Data Table (TanStack Table)

#### Authentication Pages

- `/login` — email/password + Google OAuth button
- `/register` — multi-step form (email → profile → verify)
- `/forgot-password` — email entry
- `/verify-otp` — 6-digit OTP input

#### Product Pages

- `/products` — grid with filters sidebar + pagination
- `/products/[slug]` — detail page with images, variants, reviews
- `/search` — search results with faceted filters

#### Shopping Flow

- `/cart` — cart items with quantity controls
- `/checkout` — multi-step: address → shipping → payment → review
- `/orders/[id]` — order confirmation and tracking
- `/profile` — user profile, address book, order history

#### Advanced Frontend Patterns

- Infinite scroll for product listing (Intersection Observer)
- Optimistic updates on cart mutations (TanStack Query)
- Suspense streaming with Next.js loading.tsx
- Server Components for initial product data
- Dark mode with next-themes

**Deliverables:**
- Complete design system in `packages/ui`
- All core pages functional with mock API
- Responsive design (mobile-first)
- Unit tests for shared components (Vitest)

---

### PHASE 3 — Backend Monolith

**Objective:** Build one NestJS app with all modules. Validate the full system before splitting.

**Duration estimate:** 2–3 weeks

#### NestJS Modules

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/          # JWT, Google, GitHub Passport strategies
│   └── guards/              # JwtAuthGuard, RolesGuard
├── users/
├── products/
├── inventory/
├── cart/
├── orders/
├── payments/
└── common/
    ├── filters/             # Global exception filter
    ├── interceptors/        # Logging, response transform
    ├── decorators/          # @CurrentUser, @Roles
    └── pipes/               # ZodValidationPipe
```

#### Prisma Database Design (ERD)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  role      Role     @default(CUSTOMER)
  profile   Profile?
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?   // Soft delete
}

model Product {
  id          String      @id @default(cuid())
  title       String
  slug        String      @unique
  description String
  price       Decimal
  status      ProductStatus @default(PENDING)
  categoryId  String
  category    Category    @relation(fields: [categoryId], references: [id])
  variants    Variant[]
  images      ProductImage[]
  inventory   Inventory?
  createdAt   DateTime    @default(now())
}

model Order {
  id         String      @id @default(cuid())
  userId     String
  user       User        @relation(fields: [userId], references: [id])
  status     OrderStatus @default(PENDING)
  items      OrderItem[]
  payment    Payment?
  total      Decimal
  createdAt  DateTime    @default(now())
}
```

#### API Design Standards

Every endpoint follows:
- `POST /auth/register` → returns `{ accessToken, refreshToken, user }`
- `GET /products?page=1&limit=20&category=electronics&sort=price_asc`
- `PATCH /products/:id` → partial update with DTO validation
- All errors return `{ statusCode, message, error, timestamp, path }`
- All responses wrapped in `{ data, meta }` for lists

#### Redis Usage

- `session:{userId}` → user session data (TTL: 24h)
- `refresh_token:{tokenId}` → refresh token metadata (TTL: 7d)
- `product:{productId}` → cached product (TTL: 5m)
- `cart:{userId}` → cart items (TTL: 7d)
- `rate_limit:{ip}` → request counter (TTL: 1min)

**Deliverables:**
- Full CRUD APIs for all modules
- JWT + OAuth authentication
- Swagger docs at `/api/docs`
- Integration tests with supertest
- Docker Compose local running the monolith

---

### PHASE 4 — Microservices Migration

**Objective:** Extract each module into an independent service. Establish service communication patterns.

**Duration estimate:** 2–3 weeks

#### Service Extraction Strategy

Extract in this order (lowest to highest dependency):
1. Auth Service (standalone, no service deps)
2. User Service (depends on Auth)
3. Product Service (depends on Auth)
4. Inventory Service (depends on Product)
5. Cart Service (depends on Product + Inventory)
6. Notification Service (event consumer only)
7. Order Service (depends on Cart + Inventory + Payment)
8. Payment Service (depends on Order)

#### Communication Patterns

**Synchronous (REST/gRPC) — use when:**
- You need an immediate response
- Example: API Gateway → Auth Service (token validation)
- Example: Order Service → Inventory Service (check stock before checkout)

**Asynchronous (Kafka) — use when:**
- Response not needed immediately
- Example: Order created → Notification Service sends email
- Example: Payment completed → Inventory Service decrements stock

#### Kafka Topic Design

```
# Naming convention: {service}.{entity}.{action}

auth.user.registered
auth.user.password_reset

product.product.created
product.product.updated
product.product.deleted

inventory.stock.updated
inventory.stock.reserved
inventory.stock.released

order.order.created
order.order.confirmed
order.order.cancelled
order.order.shipped
order.order.delivered

payment.payment.initiated
payment.payment.completed
payment.payment.failed
payment.payment.refunded

notification.email.requested
notification.sms.requested
notification.push.requested
```

#### Event Payload Structure (Avro)

```json
{
  "namespace": "ecommerce.order",
  "type": "record",
  "name": "OrderCreated",
  "fields": [
    { "name": "orderId", "type": "string" },
    { "name": "userId", "type": "string" },
    { "name": "items", "type": { "type": "array", "items": {
      "type": "record", "name": "OrderItem",
      "fields": [
        { "name": "productId", "type": "string" },
        { "name": "quantity", "type": "int" },
        { "name": "price", "type": "double" }
      ]
    }}},
    { "name": "total", "type": "double" },
    { "name": "createdAt", "type": "long", "logicalType": "timestamp-millis" }
  ]
}
```

**Deliverables:**
- All services running independently in Docker Compose
- Kafka event flow tested end-to-end
- gRPC protos defined and generated
- Service-to-service auth via internal JWT

---

### PHASE 5 — Event-Driven Architecture

**Objective:** Implement advanced distributed patterns for reliability and consistency.

**Duration estimate:** 2 weeks

#### Saga Pattern — Checkout Flow

```
Customer clicks "Place Order"
         │
         ▼
  1. Order Service
     Creates order (status: PENDING)
     Publishes: order.created
         │
         ▼
  2. Inventory Service (consumer)
     Reserves stock (Redis TTL: 15min)
     Publishes: inventory.reserved  ──(failure)──▶ inventory.reservation_failed
         │                                              │
         ▼                                              ▼
  3. Payment Service (consumer)                 Order Service
     Charges customer                          Cancels order, releases stock
     Publishes: payment.completed  ──(failure)──▶ payment.failed
         │
         ▼
  4. Order Service (consumer)
     Updates order status: CONFIRMED
     Publishes: order.confirmed
         │
         ▼
  5. Notification Service (consumer)
     Sends confirmation email + push notification
```

#### Outbox Pattern Implementation

```typescript
// In Order Service — within the same database transaction:
async createOrder(dto: CreateOrderDto): Promise<Order> {
  return this.prisma.$transaction(async (tx) => {
    // 1. Create the order
    const order = await tx.order.create({ data: dto });

    // 2. Write to outbox table (same transaction)
    await tx.outboxEvent.create({
      data: {
        aggregateId: order.id,
        aggregateType: 'Order',
        eventType: 'order.created',
        payload: JSON.stringify(order),
        status: 'PENDING',
      }
    });

    return order;
  });
}

// Separate outbox worker polls and publishes:
// SELECT * FROM outbox_events WHERE status = 'PENDING' LIMIT 100
// → publish to Kafka
// → UPDATE status = 'PUBLISHED'
```

#### CQRS in Order Service

```
Write Model (PostgreSQL):
  POST /orders          → creates order, emits events

Read Model (Redis projections):
  GET /orders/:id       → reads from Redis cache
  GET /orders?userId=   → reads from pre-built projection

Projection Consumer:
  Listens to order.* events
  Updates Redis read model on each state change
```

**Deliverables:**
- Working Saga for checkout (happy path + all compensation flows)
- Outbox pattern with polling worker
- CQRS with read/write model separation
- Debezium CDC setup for Outbox (optional enhancement)

---

### PHASE 6 — Search & Recommendation

**Objective:** Build production-grade search and AI-powered recommendation.

**Duration estimate:** 1–2 weeks

#### OpenSearch Index Mapping

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "standard" },
      "description": { "type": "text" },
      "price": { "type": "float" },
      "category": { "type": "keyword" },
      "tags": { "type": "keyword" },
      "rating": { "type": "float" },
      "inStock": { "type": "boolean" },
      "embedding": {
        "type": "knn_vector",
        "dimension": 1536,
        "method": { "name": "hnsw", "space_type": "cosinesimil" }
      }
    }
  }
}
```

#### Search API Design

```
GET /search?q=wireless+headphones
           &category=electronics
           &minPrice=50&maxPrice=300
           &rating=4
           &inStock=true
           &sort=relevance
           &page=1&limit=20

Response:
{
  "hits": [...products],
  "total": 142,
  "facets": {
    "category": [{ "key": "electronics", "count": 89 }],
    "brand": [{ "key": "Sony", "count": 23 }],
    "priceRange": [{ "key": "50-100", "count": 45 }]
  },
  "suggestions": ["wireless earbuds", "bluetooth headphones"]
}
```

#### Recommendation Engine

| Type | Method | Data Source |
|------|--------|-------------|
| Trending | View/purchase count in last 24h | ClickHouse / Redis sorted set |
| Similar products | Embedding cosine similarity | OpenSearch kNN |
| Personalized | User purchase + view embeddings | User history + product embeddings |
| Recently viewed | Ordered list | Redis sorted set (score = timestamp) |

**Deliverables:**
- Full-text search with facets working end-to-end
- Kafka consumer indexing products on create/update/delete
- Recommendation API returning all 4 types
- Autocomplete endpoint (suggest-as-you-type)

---

### PHASE 7 — Realtime Features

**Objective:** Add WebSocket-powered live features.

**Duration estimate:** 1 week

#### Architecture

```
Client ──WebSocket──▶ API Gateway ──Socket.IO──▶ Redis Pub/Sub
                                                      │
                         All service events ──────────┘
                         (order status, stock, notifications)
```

#### Realtime Events

```typescript
// Server → Client events
'inventory:stock_updated'  // { productId, quantity }
'inventory:low_stock'      // { productId, quantity }
'order:status_changed'     // { orderId, status, updatedAt }
'notification:new'         // { title, body, type, link }
'reservation:expiring'     // { orderId, expiresIn: 120 }
```

#### Socket.IO Rooms

- `user:{userId}` — private notifications per user
- `order:{orderId}` — order status updates
- `product:{productId}` — stock level changes (sellers and customers)

**Deliverables:**
- Live stock countdown on product page
- Real-time order status tracker
- In-app notification bell with WebSocket feed

---

### PHASE 8 — Observability

**Objective:** Full visibility into system health, performance, and errors.

**Duration estimate:** 1 week

#### Metrics to Track (Prometheus)

| Metric | Labels | Alert Threshold |
|--------|--------|----------------|
| `http_request_duration_ms` | service, route, status | p99 > 500ms |
| `http_requests_total` | service, status | error_rate > 1% |
| `kafka_consumer_lag` | topic, group | lag > 1000 |
| `db_query_duration_ms` | service, query | p99 > 200ms |
| `redis_hit_rate` | service | hit_rate < 80% |
| `order_saga_duration_ms` | result (success/failure) | — |

#### Structured Logging (Loki)

Every log entry includes:
```json
{
  "timestamp": "2025-01-01T00:00:00Z",
  "level": "info",
  "service": "order-service",
  "traceId": "abc123",
  "spanId": "def456",
  "userId": "user_xyz",
  "message": "Order created",
  "orderId": "ord_abc",
  "duration": 45
}
```

#### Distributed Tracing (Jaeger + OpenTelemetry)

```typescript
// Each service instrument with OTel SDK
import { NodeSDK } from '@opentelemetry/sdk-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({ endpoint: 'http://jaeger:14268/api/traces' }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

**Deliverables:**
- Grafana dashboards: API overview, Kafka lag, DB performance
- Alerting rules configured (PagerDuty or Slack webhook)
- Full request trace visible in Jaeger across all services

---

### PHASE 9 — Kubernetes & Cloud

**Objective:** Deploy the platform on Kubernetes with GitOps.

**Duration estimate:** 2 weeks

#### Kubernetes Resource per Service

```yaml
# Each service gets:
- Deployment (replicas: 2, rolling update strategy)
- Service (ClusterIP, internal only)
- ConfigMap (non-secret env vars)
- Secret (passwords, API keys)
- HorizontalPodAutoscaler (min: 2, max: 10, CPU target: 70%)
- PodDisruptionBudget (minAvailable: 1)
```

#### Helm Chart Structure

```
infrastructure/helm/
├── Chart.yaml
├── values.yaml              # Base values
├── values.local.yaml        # Local k8s overrides
├── values.prod.yaml         # Production overrides
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    ├── hpa.yaml
    └── ingress.yaml
```

#### ArgoCD GitOps Flow

```
Developer pushes to main
        │
        ▼
GitHub Actions builds Docker image
Tags with commit SHA
Pushes to ghcr.io
        │
        ▼
GitHub Actions updates values.prod.yaml
  image.tag: abc1234
        │
        ▼
ArgoCD detects Git change
Syncs cluster to desired state
        │
        ▼
Rolling update applied to cluster
Zero downtime deployment
```

**Deliverables:**
- All services running on local k8s (minikube or kind)
- ArgoCD dashboard showing all app states
- Horizontal autoscaling tested under load
- NGINX Ingress routing all traffic

---

### PHASE 10 — Security Hardening

**Objective:** Harden the platform for production threats.

**Duration estimate:** 1 week

#### Security Checklist

**API Layer:**
- [ ] Rate limiting per IP (100 req/min general, 5 req/min for auth endpoints)
- [ ] Helmet middleware on all services (CSP, HSTS, X-Frame-Options)
- [ ] CORS whitelist (only storefront domain)
- [ ] Input sanitization (strip HTML from all string inputs)
- [ ] SQL injection prevention (Prisma parameterized queries — automatic)

**Authentication:**
- [ ] Refresh token rotation (invalidate old token on use)
- [ ] Token family invalidation (detect theft via reuse of rotated token)
- [ ] Device fingerprinting for session management
- [ ] Account lockout after 5 failed login attempts (Redis counter)

**Infrastructure:**
- [ ] All containers run as non-root user
- [ ] Read-only filesystem where possible
- [ ] No secrets in environment files committed to git
- [ ] TLS between NGINX and upstream services (mTLS for internal gRPC)
- [ ] Network policies in Kubernetes (deny all by default)

**Deliverables:**
- Security audit checklist completed
- OWASP Top 10 review done
- Penetration test with OWASP ZAP

---

### PHASE 11 — AI Features

**Objective:** Integrate AI-powered features into the commerce experience.

**Duration estimate:** 1–2 weeks

#### Semantic Search Pipeline

```
Product created/updated
        │
        ▼
Generate embedding (OpenAI text-embedding-3-small)
  Input: title + description + category + tags
  Output: 1536-dimensional vector
        │
        ▼
Store in OpenSearch kNN index
        │
        ▼
User query → embed query → kNN search → rerank with BM25 → return results
```

#### AI Shopping Assistant (RAG)

```
User: "I need a laptop for video editing under $1500"
        │
        ▼
1. Embed user query
2. Search product index (semantic similarity)
3. Retrieve top 10 candidate products
4. Build context: product details + user purchase history
5. GPT-4o generates recommendation with reasoning
        │
        ▼
Response: "Based on your needs, here are 3 options..."
```

#### AI Product Description Generator

```typescript
// Seller uploads product with basic info
// System auto-generates SEO-optimized description

const prompt = `
  Generate a compelling product description for an e-commerce listing.
  Product: ${productName}
  Category: ${category}
  Key features: ${features.join(', ')}
  Target audience: ${targetAudience}
  
  Requirements:
  - 150-200 words
  - SEO-friendly
  - Highlight benefits, not just features
  - Include a call-to-action
`;
```

**Deliverables:**
- Semantic search integrated and replacing keyword search
- AI chatbot widget on storefront
- AI description generator in seller dashboard
- Personalized recommendation section on homepage

---

### PHASE 12 — Production Engineering

**Objective:** Add resilience, performance, and chaos engineering.

**Duration estimate:** 1 week

#### Circuit Breaker (Payment Service)

```typescript
import CircuitBreaker from 'opossum';

const options = {
  timeout: 3000,           // If Stripe doesn't respond in 3s, trigger
  errorThresholdPercentage: 50,  // Open circuit if 50% of requests fail
  resetTimeout: 30000      // After 30s, try half-open
};

const breaker = new CircuitBreaker(callStripeAPI, options);

breaker.on('open', () => logger.warn('Circuit OPEN — Stripe calls blocked'));
breaker.on('halfOpen', () => logger.info('Circuit HALF-OPEN — testing Stripe'));
breaker.on('close', () => logger.info('Circuit CLOSED — Stripe recovered'));
```

#### Feature Flags (LaunchDarkly or custom Redis flags)

```typescript
// Flag-gate new AI search feature
const useAISearch = await featureFlags.isEnabled('ai-semantic-search', userId);

if (useAISearch) {
  return this.searchService.semanticSearch(query);
} else {
  return this.searchService.keywordSearch(query);
}
```

#### Chaos Testing Scenarios

| Scenario | Tool | Expected Behavior |
|----------|------|------------------|
| Kill auth service | `docker stop auth` | Gateway returns 503 gracefully |
| Kill Kafka | `docker stop kafka` | Services queue events, resume on recovery |
| PostgreSQL slow queries | tc netem delay | Circuit breaker triggers |
| Memory pressure | stress-ng | OOM killed, K8s restarts pod |
| Network partition | iptables rules | Saga compensates, order cancelled |

**Deliverables:**
- Circuit breakers on all external service calls
- Feature flag system in place for all new features
- Chaos test runbook documented and executed
- Load test results: 500 concurrent users sustained

---

## 8. Repository Structure

```txt
ecommerce-platform/
├── apps/
│   ├── storefront/               # Next.js 14 customer app
│   ├── admin-dashboard/          # Next.js admin app
│   ├── seller-dashboard/         # Next.js seller app
│   └── api-gateway/              # NestJS GraphQL + REST gateway
│
├── services/
│   ├── auth-service/
│   ├── user-service/
│   ├── product-service/
│   ├── inventory-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── notification-service/
│   ├── search-service/
│   ├── recommendation-service/
│   └── analytics-service/
│
├── packages/
│   ├── ui/                       # Shared shadcn/ui components
│   ├── eslint-config/            # Shared ESLint rules
│   ├── tsconfig/                 # Shared tsconfig base
│   ├── shared-types/             # Cross-service TypeScript types
│   ├── shared-utils/             # date, format, validation helpers
│   ├── kafka-events/             # Avro schemas + generated types
│   └── grpc-protos/              # .proto files + generated clients
│
├── docker/
│   ├── local/
│   │   ├── docker-compose.local.yml
│   │   ├── .env.local
│   │   └── nginx/
│   ├── prod/
│   │   ├── docker-compose.prod.yml
│   │   ├── .env.prod.example
│   │   └── nginx/
│   └── shared/
│       └── init-scripts/
│
├── infrastructure/
│   ├── kubernetes/
│   ├── helm/
│   ├── terraform/
│   └── monitoring/
│       ├── prometheus/
│       ├── grafana/
│       │   └── dashboards/
│       ├── loki/
│       └── jaeger/
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint, type-check, test on PR
│       ├── build.yml            # Build Docker images on merge to main
│       └── deploy.yml           # Deploy to prod via ArgoCD
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .env.example
└── README.md
```

---

## 9. Git Strategy

### Branching Model

```
main              ← Production-ready code, protected branch
develop           ← Integration branch for features
feature/*         ← Feature development (branch from develop)
hotfix/*          ← Emergency production fixes (branch from main)
release/*         ← Release preparation
```

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <description>

Types: feat | fix | chore | docs | refactor | test | ci | perf | style

Examples:
feat(order-service): implement saga orchestration for checkout
fix(auth-service): fix refresh token rotation race condition
chore(docker): add prod docker-compose with nginx
test(product-service): add integration tests for product CRUD
ci(github-actions): add docker build and push workflow
```

### Pull Request Rules

- Require 1 reviewer approval
- All CI checks must pass (lint, types, tests)
- No direct push to `main` or `develop`
- PRs must reference an issue or ticket

---

## 10. Coding Standards

### Backend (NestJS)

```
src/
├── domain/              # Core business logic — no framework deps
│   ├── entities/
│   ├── value-objects/
│   └── repositories/   # Interfaces only
├── application/         # Use cases / services
│   ├── commands/
│   ├── queries/
│   └── events/
├── infrastructure/      # Framework-specific implementations
│   ├── database/
│   │   └── prisma/
│   ├── kafka/
│   └── redis/
└── presentation/        # Controllers, DTOs, GraphQL resolvers
    ├── controllers/
    ├── dto/
    └── resolvers/
```

Key patterns:
- **Repository pattern**: business logic depends on interfaces, not Prisma directly
- **DTO validation**: all inputs validated with class-validator or Zod
- **SOLID principles**: every class has a single reason to change
- **No raw SQL**: use Prisma query builder only

### Frontend (Next.js)

```
src/
├── app/                 # Next.js App Router pages
├── features/            # Feature-based modules
│   └── products/
│       ├── components/
│       ├── hooks/
│       ├── api/         # TanStack Query + fetch functions
│       └── types/
├── components/          # Truly shared UI components
│   └── ui/              # Shadcn components
├── lib/                 # Utilities, constants, config
└── store/               # Zustand stores
```

Key patterns:
- Server Components by default, Client Components only when needed
- TanStack Query for all server state
- Zustand for UI-only state (modal open, drawer state)
- Feature folders, not file-type folders

---

## 11. Advanced Topics

### Distributed Systems Concepts Practiced

| Concept | Where Practiced |
|---------|----------------|
| Eventual consistency | Order + Inventory Saga |
| CAP theorem | PostgreSQL (CP) vs Redis (AP) tradeoffs |
| Idempotency | Payment Service + Kafka consumers |
| Distributed locks | Redis SETNX for inventory reservation |
| Message ordering | Kafka partition key = orderId |
| Backpressure | Kafka consumer group lag monitoring |

### Architecture Patterns Applied

| Pattern | Service |
|---------|---------|
| CQRS | Order Service |
| Outbox Pattern | Order + Payment Service |
| Saga Orchestration | Order Service (checkout) |
| Circuit Breaker | Payment Service → Stripe |
| Retry with backoff | All Kafka consumers |
| Domain-Driven Design | All services (bounded contexts) |
| Hexagonal Architecture | All services (ports & adapters) |

---

## 12. Resume Impact

Upon completion, your CV can include:

**Backend / Distributed Systems:**
- Architected and built a cloud-native microservice e-commerce platform with 10+ NestJS services
- Implemented event-driven Saga pattern for distributed checkout across 4 services using Apache Kafka
- Designed Outbox pattern to guarantee reliable event publishing without dual-write problems
- Built CQRS architecture with separate read/write models and Redis projections for the Order domain

**Frontend:**
- Built enterprise Next.js 14 frontend with App Router, Server Components, and streaming
- Developed shared design system using shadcn/ui, Tailwind, and TanStack Query

**Infrastructure / DevOps:**
- Deployed containerized platform using Docker Compose (local) and Kubernetes with Helm (production)
- Implemented GitOps deployment pipeline with GitHub Actions and ArgoCD
- Configured horizontal pod autoscaling and zero-downtime rolling deployments

**Observability:**
- Built full observability stack: Prometheus metrics, Grafana dashboards, Loki logging, Jaeger tracing
- Implemented distributed tracing across all services using OpenTelemetry SDK

**AI / Search:**
- Developed semantic product search using OpenAI embeddings and OpenSearch kNN vector index
- Built AI-powered shopping assistant using RAG pipeline with product catalog as knowledge base

**Security:**
- Implemented JWT + refresh token rotation with token family invalidation
- Hardened API layer with rate limiting, Helmet, CORS, and OWASP Top 10 mitigations

---

*This guide is a living document. Update each phase section with actual implementation notes as you build.*
