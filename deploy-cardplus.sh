#!/bin/bash

# CardPlus Edge Functions Deployment Script
# Run from Mac M4: bash deploy-cardplus.sh

set -e

echo "🚀 CardPlus Edge Functions Deployment"
echo "======================================"
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found!"
    echo "Installing via Homebrew..."
    brew install supabase/tap/supabase
fi

echo "✅ Supabase CLI found"
echo ""

# Project info
PROJECT_REF="kyxfxzoqvkyeblwbjxjq"
FUNCTIONS_DIR="supabase/functions"

echo "📦 Project: $PROJECT_REF"
echo "📁 Functions directory: $FUNCTIONS_DIR"
echo ""

# Check if logged in
echo "🔐 Checking Supabase login..."
if ! supabase projects list &> /dev/null; then
    echo "Not logged in. Running login..."
    supabase login
fi

echo "✅ Logged in"
echo ""

# Link project if not already linked
echo "🔗 Linking project..."
if [ ! -f ".supabase/config.toml" ]; then
    supabase link --project-ref $PROJECT_REF
else
    echo "✅ Project already linked"
fi
echo ""

# Deploy functions
echo "🚀 Deploying edge functions..."
echo ""

echo "1️⃣ Deploying cardplus-initiate..."
supabase functions deploy cardplus-initiate

echo ""
echo "2️⃣ Deploying cardplus-callback..."
supabase functions deploy cardplus-callback

echo ""
echo "✅ Edge functions deployed successfully!"
echo ""

# Check secrets
echo "🔐 Checking secrets..."
echo ""
SECRETS=$(supabase secrets list 2>/dev/null || echo "")

if echo "$SECRETS" | grep -q "CARDPLUS_CLIENT_ID"; then
    echo "✅ CARDPLUS_CLIENT_ID exists"
else
    echo "⚠️  CARDPLUS_CLIENT_ID missing!"
    echo "Run: supabase secrets set CARDPLUS_CLIENT_ID=xxxxx"
fi

if echo "$SECRETS" | grep -q "CARDPLUS_STORE_KEY"; then
    echo "✅ CARDPLUS_STORE_KEY exists"
else
    echo "⚠️  CARDPLUS_STORE_KEY missing!"
    echo "Run: supabase secrets set CARDPLUS_STORE_KEY=xxxxx"
fi

if echo "$SECRETS" | grep -q "SITE_URL"; then
    echo "✅ SITE_URL exists"
else
    echo "⚠️  SITE_URL missing!"
    echo "Run: supabase secrets set SITE_URL=https://zorluplus.com"
fi

echo ""
echo "======================================"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================================"
echo ""
echo "📋 Next steps:"
echo "1. Set missing secrets (if any)"
echo "2. Register callback URL in CardPlus panel:"
echo "   https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback"
echo "3. Test payment with 5 TL demo product"
echo ""
echo "🧪 Test endpoints:"
echo "Initiate: https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-initiate"
echo "Callback: https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback"
echo ""
