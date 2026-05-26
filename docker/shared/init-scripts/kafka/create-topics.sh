#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Nexora — Kafka Topic Creation Script
# Run once after Kafka starts to create all required topics
# Usage: docker exec nexora-kafka-local bash /scripts/create-topics.sh
# ═══════════════════════════════════════════════════════════════

set -e

KAFKA_BOOTSTRAP=localhost:9092
PARTITIONS=3
REPLICATION_FACTOR=1

echo "Creating Nexora Kafka topics..."

# Function to create a topic
create_topic() {
  local TOPIC=$1
  local PARTITIONS=${2:-$PARTITIONS}
  kafka-topics --bootstrap-server $KAFKA_BOOTSTRAP \
    --create --if-not-exists \
    --topic "$TOPIC" \
    --partitions "$PARTITIONS" \
    --replication-factor $REPLICATION_FACTOR
  echo "  ✓ $TOPIC"
}

# ── Auth Topics ─────────────────────────────────────────────────
create_topic "auth.user.registered"
create_topic "auth.user.password_reset"

# ── Product Topics ──────────────────────────────────────────────
create_topic "product.product.created"
create_topic "product.product.updated"
create_topic "product.product.deleted"
create_topic "product.product.approved"

# ── Inventory Topics ────────────────────────────────────────────
create_topic "inventory.stock.updated"
create_topic "inventory.stock.reserved"
create_topic "inventory.stock.released"
create_topic "inventory.stock.reservation_failed"
create_topic "inventory.stock.low_stock"

# ── Order Topics ────────────────────────────────────────────────
create_topic "order.order.created"
create_topic "order.order.confirmed"
create_topic "order.order.cancelled"
create_topic "order.order.shipped"
create_topic "order.order.delivered"

# ── Payment Topics ──────────────────────────────────────────────
create_topic "payment.payment.initiated"
create_topic "payment.payment.completed"
create_topic "payment.payment.failed"
create_topic "payment.payment.refunded"

# ── Notification Topics ─────────────────────────────────────────
create_topic "notification.email.requested"
create_topic "notification.sms.requested"
create_topic "notification.push.requested"

# ── User Event Topics (analytics) ───────────────────────────────
create_topic "user.product.viewed"
create_topic "user.product.searched"
create_topic "user.cart.updated"

echo ""
echo "All Nexora Kafka topics created successfully!"
kafka-topics --bootstrap-server $KAFKA_BOOTSTRAP --list
