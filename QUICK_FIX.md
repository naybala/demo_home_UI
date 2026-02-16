# Quick Fix Guide

## Problem

Nginx container was failing because it was trying to load SSL certificates that don't exist yet.

## Solution

I've created two nginx configurations:

1. **nginx.http-only.conf** - HTTP only, no SSL (use this first)
2. **nginx.https.conf** - HTTPS with SSL (use after SSL setup)

---

## Steps to Get Your Site Running

### Step 1: Use HTTP-Only Configuration (Current)

The configuration is already set to HTTP-only. Just restart the containers:

```bash
./docker-scripts/prod.sh restart
```

### Step 2: Access Your Site

```
http://lucky-click.com:8080
```

### Step 3: (Optional) Set Up SSL Later

When you're ready for HTTPS:

```bash
# 1. Run SSL setup
sudo ./docker-scripts/setup-ssl.sh

# 2. Switch to HTTPS configuration
./docker-scripts/switch-nginx.sh https

# 3. Restart containers
./docker-scripts/prod.sh restart

# 4. Access via HTTPS
# https://lucky-click.com:8443
```

---

## Quick Commands

### Restart Containers

```bash
./docker-scripts/prod.sh restart
```

### Check Container Status

```bash
docker ps
```

### View Logs

```bash
./docker-scripts/prod.sh logs
```

### Switch Nginx Mode

```bash
# Switch to HTTP-only
./docker-scripts/switch-nginx.sh http
./docker-scripts/prod.sh restart

# Switch to HTTPS (after SSL setup)
./docker-scripts/switch-nginx.sh https
./docker-scripts/prod.sh restart

# Check current mode
./docker-scripts/switch-nginx.sh status
```

---

## Current Configuration

- **Mode**: HTTP-only (no SSL)
- **Access URL**: `http://lucky-click.com:8080`
- **Direct Next.js**: `http://lucky-click.com:3001`

---

## What Changed

1. ✅ Created `nginx/nginx.http-only.conf` - Works without SSL
2. ✅ Created `nginx/nginx.https.conf` - For use with SSL
3. ✅ Updated `nginx/nginx.conf` to HTTP-only mode
4. ✅ Created `switch-nginx.sh` script to easily switch modes

---

## Next Steps

**On your VPS, run:**

```bash
./docker-scripts/prod.sh restart
```

Then visit: `http://lucky-click.com:8080`

Your site should now load without errors! 🎉
