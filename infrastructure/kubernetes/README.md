# Nexora Kubernetes & GitOps

This directory contains the Infrastructure-as-Code for deploying the Nexora
Microservices architecture to Kubernetes.

## Architecture

We use the **App of Apps** pattern with ArgoCD:

1. **`helm/nexora-service`**: A generic, highly parameterized base Helm chart.
   Instead of managing 11 different sets of `deployment.yaml` and
   `service.yaml`, all microservices use this single chart.
2. **`kubernetes/argocd/applications/`**: Contains an ArgoCD Application custom
   resource for each microservice. Each file references the base Helm chart but
   injects its own specific configuration (image, ports, environment variables)
   via `values`.
3. **`kubernetes/argocd/app-of-apps.yaml`**: The master Application. Deploying
   this single file into your ArgoCD cluster will automatically discover and
   deploy all microservices.

## Getting Started (Local Testing with Minikube/Kind)

1. **Install ArgoCD**

   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```

2. **Deploy Data Infrastructure** For local testing, you need the dependencies
   running inside your cluster (Postgres, Redis, Kafka, OpenSearch). You can use
   Bitnami charts:

   ```bash
   helm repo add bitnami https://charts.bitnami.com/bitnami
   helm install postgres bitnami/postgresql -n nexora-infra --create-namespace
   helm install redis bitnami/redis -n nexora-infra
   helm install kafka bitnami/kafka -n nexora-infra
   ```

   _(Note: For production, we assume you are using managed services like AWS
   RDS, Elasticache, MSK, and will inject the endpoints via Kubernetes
   Secrets)._

3. **Bootstrap Nexora**
   ```bash
   kubectl apply -f infrastructure/kubernetes/argocd/app-of-apps.yaml
   ```
   ArgoCD will immediately begin syncing and deploying `api-gateway`,
   `auth-service`, `product-service`, `order-service`, etc., into the
   `nexora-prod` namespace.
