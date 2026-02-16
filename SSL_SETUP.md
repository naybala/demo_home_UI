# SSL/TLS Setup Instructions

This guide will help you set up HTTPS for your application using Let's Encrypt SSL certificates.

## Prerequisites

Before running the setup script, ensure:

1. ✅ Your domain `lucky-click.com` DNS A record points to your VPS IP address
2. ✅ Ports 80 and 443 are open in your VPS firewall
3. ✅ Docker containers are running

## Quick Setup

### Step 1: Run the SSL Setup Script on Your VPS

SSH into your VPS and navigate to your project directory, then run:

```bash
cd /path/to/your/project
sudo ./docker-scripts/setup-ssl.sh
```

**What this script does:**

- Installs Certbot (if not already installed)
- Stops the Nginx container temporarily
- Obtains SSL certificates from Let's Encrypt
- Restarts all Docker containers

### Step 2: Verify HTTPS is Working

After the script completes, test your site:

```bash
# Test HTTPS access
curl -I https://lucky-click.com

# Test HTTP to HTTPS redirect
curl -I http://lucky-click.com
```

Or simply visit in your browser:

- `https://lucky-click.com` ✅
- `http://lucky-click.com` (should redirect to HTTPS) ✅

## Certificate Auto-Renewal

SSL certificates from Let's Encrypt expire after 90 days. Set up automatic renewal:

### Add to Crontab

```bash
sudo crontab -e
```

Add this line to renew certificates daily at 2 AM:

```cron
0 2 * * * /path/to/your/project/docker-scripts/renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1
```

Or use the renewal script manually:

```bash
sudo ./docker-scripts/renew-ssl.sh
```

## Troubleshooting

### Certificate Issuance Failed

If the SSL setup fails, check:

1. **DNS Configuration:**

   ```bash
   nslookup lucky-click.com
   # Should return your VPS IP address
   ```

2. **Port 80 Accessibility:**

   ```bash
   sudo ufw status
   # Ensure ports 80 and 443 are allowed
   ```

3. **No Service on Port 80:**
   ```bash
   sudo netstat -tlnp | grep :80
   # Should be empty when running the setup script
   ```

### Mixed Content Warnings

If you see mixed content warnings in the browser:

- Ensure all API calls use HTTPS
- Update any hardcoded HTTP URLs to HTTPS
- Check for HTTP resources (images, scripts, etc.)

### Certificate Renewal Issues

Check certificate status:

```bash
sudo certbot certificates
```

Test renewal (dry run):

```bash
sudo certbot renew --dry-run
```

## Manual Certificate Management

### View Certificate Details

```bash
sudo certbot certificates
```

### Renew Certificates Manually

```bash
sudo certbot renew
```

### Revoke Certificate

```bash
sudo certbot revoke --cert-path /etc/letsencrypt/live/lucky-click.com/cert.pem
```

## Files Modified

The following files have been updated for SSL support:

1. **docker-compose.yml** - Added SSL certificate volume mounts
2. **nginx/nginx.conf** - Added HTTPS server block and HTTP redirect
3. **docker-scripts/setup-ssl.sh** - SSL setup automation script
4. **docker-scripts/renew-ssl.sh** - SSL renewal script

## Security Best Practices

The Nginx configuration includes:

- ✅ TLS 1.2 and 1.3 only (no older protocols)
- ✅ Strong cipher suites
- ✅ OCSP stapling for faster certificate validation
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## Next Steps

After SSL is set up:

1. Update your `.env` file to use HTTPS URLs if needed
2. Test all application features over HTTPS
3. Monitor certificate expiration (auto-renewal should handle this)
4. Consider adding a CDN for better performance
