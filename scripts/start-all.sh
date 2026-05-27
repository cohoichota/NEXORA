#!/bin/bash
ROOT_DIR=$(pwd)

echo "Starting Auth Service..."
cd "$ROOT_DIR/services/auth-service" && pnpm exec ts-node-dev --respawn --transpile-only src/main.ts > /tmp/auth.log 2>&1 &

echo "Starting Product Service..."
cd "$ROOT_DIR/services/product-service" && pnpm exec ts-node-dev --respawn --transpile-only src/main.ts > /tmp/product.log 2>&1 &

echo "Starting Cart Service..."
cd "$ROOT_DIR/services/cart-service" && pnpm exec ts-node-dev --respawn --transpile-only src/main.ts > /tmp/cart.log 2>&1 &

echo "Starting Order Service..."
cd "$ROOT_DIR/services/order-service" && pnpm exec ts-node-dev --respawn --transpile-only src/main.ts > /tmp/order.log 2>&1 &

echo "Starting API Gateway..."
cd "$ROOT_DIR/apps/api-gateway" && pnpm exec ts-node-dev --respawn --transpile-only src/main.ts > /tmp/gateway.log 2>&1 &

echo "All backend services started in background."
