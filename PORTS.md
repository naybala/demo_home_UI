# Alternative Ports Configuration

Since port 80 is already in use by another service on your VPS, the Docker containers are configured to use alternative ports:

## Port Mapping

- **HTTP**: Port 8080 → `http://lucky-click.com:8080`
- **HTTPS**: Port 8443 → `https://lucky-click.com:8443`
- **Next.js Direct**: Port 3001 → `http://lucky-click.com:3001`

## Accessing Your Application

### With SSL (Recommended)

```
https://lucky-click.com:8443
```

### Without SSL

```
http://lucky-click.com:8080
```

### Direct Next.js (Bypass Nginx)

```
http://lucky-click.com:3001
```

## SSL Certificate Setup

When running the SSL setup script, the certificates will still be obtained for the standard ports, but Nginx inside Docker will serve them on port 8443.

### Run SSL Setup

```bash
sudo ./docker-scripts/setup-ssl.sh
```

**Note:** The SSL setup script temporarily stops Nginx to free port 80 for Let's Encrypt validation. After obtaining certificates, your containers will run on ports 8080/8443.

## Firewall Configuration

Make sure these ports are open in your VPS firewall:

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 8080/tcp
sudo ufw allow 8443/tcp
sudo ufw allow 3001/tcp

# Or using firewalld (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=8443/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

## Switching to Standard Ports (80/443)

If you want to use standard ports in the future:

1. Stop the service using port 80:

   ```bash
   sudo systemctl stop apache2  # or nginx
   sudo systemctl disable apache2
   ```

2. Update `docker-compose.prod.yml`:

   ```yaml
   ports:
     - "80:80"
     - "443:443"
   ```

3. Update `nginx/nginx.conf`:

   ```nginx
   return 301 https://$server_name$request_uri;  # Remove :8443
   ```

4. Rebuild containers:
   ```bash
   ./docker-scripts/prod.sh rebuild
   ```

## Current Configuration Files

- **docker-compose.prod.yml**: Ports 8080:80 and 8443:443
- **nginx/nginx.conf**: Redirects HTTP (8080) to HTTPS (8443)
- **Next.js**: Runs on port 3000 inside container, exposed as 3001

## Testing

After starting containers:

```bash
# Check if containers are running
docker ps

# Test HTTP (should redirect to HTTPS)
curl -I http://lucky-click.com:8080

# Test HTTPS (after SSL setup)
curl -I https://lucky-click.com:8443

# Test direct Next.js
curl -I http://lucky-click.com:3001
```
