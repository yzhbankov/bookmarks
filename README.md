# Bookmarks

A cloud-native bookmark management application with Google authentication, tags, spaces, and sharing capabilities.

**Production URL:** https://bookmarks.ink

---

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment Guide](#deployment-guide)
  - [Deploy Frontend](#deploy-frontend)
  - [Deploy Backend](#deploy-backend)
  - [GitHub Plan/Apply Workflow](#github-planapply-workflow)
- [Configuration Reference](#configuration-reference)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### I want to... run locally

```bash
git clone https://github.com/yzhbankov/bookmarks.git
cd bookmarks
yarn install
yarn start:client
```
Then open http://localhost:3001

### I want to... deploy frontend changes

```bash
git checkout -b deploy-client
git push origin deploy-client --force
```

### I want to... deploy backend changes

1. Create PR to `master`
2. Comment `/plan prod` on the PR
3. Review the plan, then comment `/apply prod`

---

## Architecture Overview

```
                                    ┌─────────────────────────────────────────┐
                                    │               AWS Cloud                  │
                                    │                                          │
                                    │  ┌───────────────────────────────────┐  │
                                    │  │        S3 (Static Assets)          │  │
                                    │  │          bookmarks.ink             │  │
                                    │  └─────────────────┬─────────────────┘  │
                                    │                    │                     │
                                    │                    ▼                     │
                                    │  ┌───────────────────────────────────┐  │
┌─────────────┐   static assets     │  │           CloudFront               │  │
│             │◄────────────────────┼──│             (CDN)                  │  │
│   Browser   │                     │  └───────────────────────────────────┘  │
│   (React)   │                     │                                          │
│             │                     │  ┌───────────────────────────────────┐  │
└──────┬──────┘                     │  │      API Gateway (REST API)        │  │
       │                            │  │    api-gw-server.bookmarks.ink     │  │
       │    REST API requests       │  └─────────────────┬─────────────────┘  │
       └───────────────────────────►│                    │                     │
                                    │                    ▼                     │
                                    │  ┌───────────────────────────────────┐  │
                                    │  │       AWS Lambda Functions         │  │
                                    │  │                                    │  │
                                    │  │  ┌──────┐ ┌─────────┐ ┌────────┐  │  │
                                    │  │  │ Auth │ │Bookmarks│ │ Spaces │  │  │
                                    │  │  └──────┘ └─────────┘ └────────┘  │  │
                                    │  │  ┌──────┐ ┌─────────┐             │  │
                                    │  │  │ Tags │ │Feedback │             │  │
                                    │  │  └──────┘ └─────────┘             │  │
                                    │  └─────────────────┬─────────────────┘  │
                                    │                    │                     │
                                    │                    ▼                     │
                                    │  ┌───────────────────────────────────┐  │
                                    │  │            DynamoDB                │  │
                                    │  │      (Single-table design)         │  │
                                    │  └───────────────────────────────────┘  │
                                    └─────────────────────────────────────────┘
```

### How It Works

1. **User visits bookmarks.ink** - CloudFront serves the React app from S3
2. **User logs in** - Browser calls API Gateway, which invokes the Auth Lambda
3. **User manages bookmarks** - API Gateway routes requests to the appropriate Lambda
4. **Lambdas read/write data** - All Lambdas interact with a single DynamoDB table

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TailwindCSS, React Query |
| CDN | AWS CloudFront |
| API | AWS API Gateway (REST) |
| Backend | AWS Lambda (Node.js 20.x) |
| Database | AWS DynamoDB |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |

---

## Project Structure

```
bookmarks/
├── apps/
│   ├── api-gateway/          # OpenAPI spec (api.yaml)
│   ├── client/               # React frontend
│   └── lambdas/              # Backend functions
│       ├── auth/             #   - Google OAuth, JWT
│       ├── bookmarks/        #   - CRUD for bookmarks
│       ├── spaces/           #   - Bookmark collections
│       ├── tags/             #   - Categorization
│       ├── feedback/         #   - User feedback
│       └── shared/           #   - Common utilities
├── dev-ops/
│   └── terraform/            # Infrastructure as Code
└── .github/
    └── workflows/            # CI/CD pipelines
```

---

## Local Development

### Prerequisites

- Node.js >= 14.15.4
- Yarn

### Step 1: Install Dependencies

```bash
git clone https://github.com/yzhbankov/bookmarks.git
cd bookmarks
yarn install
```

### Step 2: Configure Environment

Create the environment file:

```bash
touch shared/env/.env
```

Add your configuration:

```env
REACT_APP_BOOKMARKS_GOOGLE_CLIENT_ID=<your-google-client-id>
REACT_APP_BOOKMARKS_BASE_URL=http://localhost:3000
```

### Step 3: Run the App

```bash
yarn start:client
```

Open http://localhost:3001 in your browser.

### Setting Up Google OAuth (First Time Only)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services > Credentials**
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add authorized JavaScript origins:
   - `http://localhost:3001`
   - `http://localhost`
6. Copy the Client ID to your `.env` file

---

## Deployment Guide

### Deploy Frontend

The frontend deploys automatically when you push to the `deploy-client` branch.

```bash
# From any branch with your changes
git checkout -b deploy-client
git push origin deploy-client --force
```

**What happens:**
1. GitHub Actions builds the React app
2. Build artifacts sync to S3
3. CloudFront serves the updated site

---

### Deploy Backend

The backend (Lambdas + API Gateway) deploys via Terraform using a PR-based workflow.

**Quick Version:**
```bash
# 1. Create PR to master with your changes
# 2. Comment on PR: /plan prod
# 3. Review plan output
# 4. Comment on PR: /apply prod
# 5. PR auto-merges on success
```

---

### GitHub Plan/Apply Workflow

This project uses GitOps for infrastructure changes. All changes go through Pull Requests with manual approval.

#### The Process

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Create PR  │────►│ /plan prod   │────►│ /apply prod  │────►│  Auto-merge  │
│  to master   │     │              │     │              │     │  to master   │
└──────────────┘     └──────┬───────┘     └──────┬───────┘     └──────────────┘
                            │                    │
                            ▼                    ▼
                     terraform plan       terraform apply
                     + adds label         + merges PR
                     "prod_planned"       + adds "applied"
```

#### Step-by-Step

**1. Create your branch and make changes**

```bash
git checkout -b feature/my-changes
# Edit files in apps/lambdas/, apps/api-gateway/, or dev-ops/terraform/
git add .
git commit -m "Description of changes"
git push origin feature/my-changes
```

**2. Open a Pull Request to `master`**

**3. Plan the changes**

Comment on your PR:
```
/plan prod
```

This runs `terraform plan` and shows what will change. The PR gets labeled `prod_planned`.

**4. Review the plan**

Check the GitHub Actions output to see exactly what Terraform will create, modify, or destroy.

**5. Apply the changes**

When you're satisfied with the plan, comment:
```
/apply prod
```

This runs `terraform apply`. On success, the PR auto-merges to master.

#### Command Reference

| Command | What it does | Requirements |
|---------|--------------|--------------|
| `/plan prod` | Preview infrastructure changes | PR targets `master` |
| `/apply prod` | Deploy to production | PR has `prod_planned` label |

#### Example: Fixing a CORS Issue

```bash
# 1. Create branch
git checkout -b fix/cors-headers

# 2. Edit the API spec
#    File: apps/api-gateway/api.yaml

# 3. Commit and push
git add .
git commit -m "Add CORS headers to auth endpoints"
git push origin fix/cors-headers

# 4. Create PR to master on GitHub

# 5. Comment: /plan prod
#    Wait for plan, review output

# 6. Comment: /apply prod
#    Wait for deployment
#    PR merges automatically
```

---

### Manual Deployment (Alternative)

If you need to deploy without GitHub Actions:

```bash
cd dev-ops/terraform

terraform init
terraform workspace select -or-create prod

terraform plan -var-file="./env/prod.tfvars" \
  -var="GOOGLE_API_CLIENT_ID=<client-id>" \
  -var="GOOGLE_API_CLIENT_SECRET=<client-secret>" \
  -var="JWT_SECRET=<jwt-secret>" \
  -var="BOOKMARKS_DOMAIN=bookmarks.ink"

terraform apply -var-file="./env/prod.tfvars" \
  -var="GOOGLE_API_CLIENT_ID=<client-id>" \
  -var="GOOGLE_API_CLIENT_SECRET=<client-secret>" \
  -var="JWT_SECRET=<jwt-secret>" \
  -var="BOOKMARKS_DOMAIN=bookmarks.ink"
```

---

## Configuration Reference

### GitHub Secrets

Configure these in your repository settings under **Settings > Secrets and variables > Actions**.

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key for deployments |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `GOOGLE_API_CLIENT_ID` | Google OAuth client ID (backend) |
| `GOOGLE_API_CLIENT_SECRET` | Google OAuth client secret |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `BOOKMARKS_GOOGLE_CLIENT_ID` | Google client ID (frontend) |

### GitHub Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `AWS_REGION` | `us-east-1` | AWS region for resources |
| `S3_BUCKET` | `bookmarks.ink` | S3 bucket (same as domain) |
| `BOOKMARKS_BASE_URL` | `https://api-gw-server.bookmarks.ink` | API base URL |
| `BOOKMARKS_DOMAIN` | `bookmarks.ink` | Domain for cookies |

### AWS IAM Permissions

The CI/CD user needs these policies:
- `AmazonS3FullAccess`
- `AmazonDynamoDBFullAccess`
- `AWSLambda_FullAccess`
- `AmazonAPIGatewayAdministrator`
- `IAMFullAccess`

---

## API Reference

Base URL: `https://api-gw-server.bookmarks.ink`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Exchange Google auth code for session |
| GET | `/api/v1/auth/validate` | Validate current session |

### Bookmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/bookmarks` | List all bookmarks |
| POST | `/api/v1/bookmarks` | Create a bookmark |
| PUT | `/api/v1/bookmarks/{id}` | Update a bookmark |
| DELETE | `/api/v1/bookmarks/{id}` | Delete a bookmark |

### Tags

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tags` | List all tags |
| POST | `/api/v1/tags` | Create a tag |
| DELETE | `/api/v1/tags/{id}` | Delete a tag |

### Spaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/spaces` | List all spaces |
| POST | `/api/v1/spaces` | Create a space |
| DELETE | `/api/v1/spaces/{id}` | Delete a space |

### Feedback

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/feedback` | Get feedback history |
| POST | `/api/v1/feedback` | Submit feedback |

---

## Troubleshooting

### CORS Errors

**Symptom:** Browser console shows `Access-Control-Allow-Origin` errors.

**Solution:**
1. Check that `api.yaml` has `OPTIONS` methods for affected endpoints
2. Verify the `Access-Control-Allow-Origin` header matches your domain
3. Redeploy: create a PR and run `/plan prod` then `/apply prod`

### Login Not Working

**Symptom:** Google login fails or redirects incorrectly.

**Checklist:**
- [ ] Google OAuth credentials are correctly configured in GitHub Secrets
- [ ] `BOOKMARKS_DOMAIN` matches your cookie domain
- [ ] `JWT_SECRET` is the same across all Lambda functions
- [ ] Authorized JavaScript origins include your domain in Google Console

### Lambda Timeouts

**Symptom:** API requests take a long time or timeout.

**Info:** Lambdas have a 60-second timeout. First requests after idle periods may be slow due to cold starts. This is normal for infrequently-used functions.

### Deployment Fails

**Symptom:** `/apply prod` shows errors.

**Steps:**
1. Check the error message in the PR comment
2. Review GitHub Actions logs for details
3. Common issues:
   - Missing secrets/variables
   - IAM permission errors
   - Terraform state conflicts (try `/plan prod` again)
