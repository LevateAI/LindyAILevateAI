-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."WorkflowStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DRAFT', 'ERROR');

-- CreateEnum
CREATE TYPE "public"."TriggerType" AS ENUM ('WEBHOOK', 'SCHEDULE', 'EVENT', 'MANUAL');

-- CreateEnum
CREATE TYPE "public"."RunStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."TemplateCategory" AS ENUM ('EMAIL_CRM', 'CALENDAR', 'ECOMMERCE', 'OPERATIONS', 'DATA_SYNC', 'SOCIAL_MEDIA', 'ANALYTICS', 'AUTOMATION');

-- CreateEnum
CREATE TYPE "public"."RequestStatus" AS ENUM ('NEW', 'TRIAGE', 'PROPOSED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."RequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."ConnectionType" AS ENUM ('N8N', 'GOOGLE', 'SLACK', 'DISCORD', 'OPENAI', 'WEBHOOK', 'HTTP', 'EMAIL', 'CALENDAR');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "clerkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "avatar" TEXT,
    "ownerId" TEXT NOT NULL,
    "n8nUrl" TEXT,
    "n8nApiKey" TEXT,
    "webhookSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflows" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."WorkflowStatus" NOT NULL DEFAULT 'DRAFT',
    "triggerType" "public"."TriggerType" NOT NULL,
    "triggerConfig" JSONB,
    "steps" JSONB NOT NULL DEFAULT '[]',
    "envVars" JSONB NOT NULL DEFAULT '{}',
    "secretRefs" JSONB NOT NULL DEFAULT '{}',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "version" INTEGER NOT NULL DEFAULT 1,
    "lastRunAt" TIMESTAMP(3),
    "n8nWorkflowId" TEXT,
    "webhookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."runs" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "status" "public"."RunStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "durationMs" INTEGER,
    "inputPayload" JSONB,
    "outputPayload" JSONB,
    "error" TEXT,
    "correlationId" TEXT,
    "n8nExecIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "signatureOK" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."templates" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "category" "public"."TemplateCategory" NOT NULL,
    "apps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "templateConfig" JSONB NOT NULL,
    "estimatedSetupMins" INTEGER NOT NULL DEFAULT 15,
    "difficulty" TEXT NOT NULL DEFAULT 'Beginner',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."requests" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "apps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "priority" "public"."RequestPriority" NOT NULL DEFAULT 'MEDIUM',
    "budgetUsd" INTEGER,
    "status" "public"."RequestStatus" NOT NULL DEFAULT 'NEW',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."connections" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."ConnectionType" NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "isHealthy" BOOLEAN NOT NULL DEFAULT false,
    "lastChecked" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."encrypted_secrets" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "ciphertext" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encrypted_secrets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkId_key" ON "public"."users"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_slug_key" ON "public"."workspaces"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "memberships_userId_workspaceId_key" ON "public"."memberships"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "encrypted_secrets_workspaceId_key_key" ON "public"."encrypted_secrets"("workspaceId", "key");

-- AddForeignKey
ALTER TABLE "public"."workspaces" ADD CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."memberships" ADD CONSTRAINT "memberships_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflows" ADD CONSTRAINT "workflows_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."runs" ADD CONSTRAINT "runs_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "public"."workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."runs" ADD CONSTRAINT "runs_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."templates" ADD CONSTRAINT "templates_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."requests" ADD CONSTRAINT "requests_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."connections" ADD CONSTRAINT "connections_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."encrypted_secrets" ADD CONSTRAINT "encrypted_secrets_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
