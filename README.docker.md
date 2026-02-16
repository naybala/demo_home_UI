# Docker Deployment Guide

This guide covers deploying the Home UI application using Docker with nginx, PM2, and Node.js.

## 📋 Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)
- At least 2GB RAM available
- Ports 80, 443, and 3000 available

## 🚀 Quick Start

### Development Environment

```bash
# Start development environment
./docker-scripts/start.sh

# Or manually
docker-compose up -d

# View logs
docker-compose logs -f
```

Access the application:

- **Next.js Dev Server**: http://localhost:3001
- **Nginx Proxy**: http://localhost

### Production Environment

```bash
# Start production environment
./docker-scripts/start.sh prod

# Or manually
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

Access the application:

- **Application**: http://localhost

## 📁 Project Structure

```
.
├── Dockerfile                  # Production Dockerfile with PM2
├── Dockerfile.dev             # Development Dockerfile
├── docker-compose.yml         # Development configuration
├── docker-compose.prod.yml    # Production configuration
├── ecosystem.config.js        # PM2 process manager config
├── nginx/
│   ├── Dockerfile            # Nginx image
│   └── nginx.conf            # Nginx configuration
├── docker-scripts/
│   ├── start.sh              # Start services script
│   └── stop.sh               # Stop services script
└── .env.example              # Environment template
```

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Key variables:

- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_BASE_URL`: API base URL
- `NEXT_PUBLIC_PROPERTIES_API_URL`: Properties API endpoint
- `NEXT_PER_TOKEN`: Authentication token
- `PM2_INSTANCES`: Number of PM2 instances (default: 2)

> [!NOTE]
> **Port Configuration**: The Docker setup uses port 3001 for the Next.js container to avoid conflicts with existing Node.js applications running on port 3000.

### PM2 Configuration

Edit `ecosystem.config.js` to customize:

- Number of instances (clustering)
- Memory limits
- Log file locations
- Auto-restart behavior

### Nginx Configuration

Edit `nginx/nginx.conf` to customize:

- SSL certificates (uncomment SSL server block)
- Rate limiting
- Caching policies
- Security headers

## 🔧 Common Commands

### Development

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f nextjs
docker-compose logs -f nginx

# Rebuild containers
docker-compose up -d --build

# Access container shell
docker exec -it home-ui-dev sh
```

### Production

```bash
# Build and start
docker-compose -f docker-compose.prod.yml up -d --build

# Stop services
docker-compose -f docker-compose.prod.yml down

# View PM2 status
docker exec home-ui-prod pm2 status

# View PM2 logs
docker exec home-ui-prod pm2 logs

# Restart PM2 processes
docker exec home-ui-prod pm2 restart all

# Monitor resources
docker stats
```

### Cleanup

```bash
# Stop and remove containers
./docker-scripts/stop.sh

# Stop and remove volumes
./docker-scripts/stop.sh dev --volumes
./docker-scripts/stop.sh prod --volumes

# Remove all unused Docker resources
docker system prune -a
```

## 🏥 Health Checks

The application includes health check endpoints:

- **Application Health**: http://localhost:3000/api/health
- **Nginx Health**: http://localhost/api/health

Health check response:

```json
{
  "status": "healthy",
  "timestamp": "2026-02-02T06:35:00.000Z",
  "uptime": 123.45,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🔍 Monitoring

### Container Status

```bash
# Check container health
docker ps --filter "name=home-ui"

# View resource usage
docker stats home-ui-prod home-ui-nginx-prod
```

### PM2 Monitoring

```bash
# PM2 status
docker exec home-ui-prod pm2 status

# PM2 monitoring dashboard
docker exec home-ui-prod pm2 monit

# View logs
docker exec home-ui-prod pm2 logs --lines 100
```

### Nginx Logs

```bash
# Access logs
docker exec home-ui-nginx-prod tail -f /var/log/nginx/access.log

# Error logs
docker exec home-ui-nginx-prod tail -f /var/log/nginx/error.log
```

## 🔒 SSL/HTTPS Setup

To enable HTTPS:

1. **Obtain SSL certificates** (Let's Encrypt, etc.)

2. **Create SSL directory**:

   ```bash
   mkdir -p nginx/ssl
   ```

3. **Copy certificates**:

   ```bash
   cp /path/to/cert.pem nginx/ssl/
   cp /path/to/key.pem nginx/ssl/
   ```

4. **Update nginx.conf**:
   - Uncomment the SSL server block
   - Update certificate paths
   - Update server_name

5. **Update docker-compose.prod.yml**:
   - Uncomment SSL volume mount

6. **Restart services**:
   ```bash
   docker-compose -f docker-compose.prod.yml restart nginx
   ```

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo lsof -i :80
sudo lsof -i :3000

# Remove old containers
docker-compose down -v
docker-compose up -d --build
```

### PM2 process crashes

```bash
# Check PM2 logs
docker exec home-ui-prod pm2 logs --err

# Restart PM2
docker exec home-ui-prod pm2 restart all

# Check memory usage
docker stats home-ui-prod
```

### Nginx 502 Bad Gateway

```bash
# Check if Next.js is running
docker exec home-ui-prod pm2 status

# Check nginx logs
docker logs home-ui-nginx-prod

# Verify network connectivity
docker exec home-ui-nginx-prod ping nextjs
```

### Build fails

```bash
# Clear Docker cache
docker builder prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check disk space
df -h
```

## 📊 Performance Optimization

### Production Build

The production Dockerfile uses:

- Multi-stage builds for smaller images
- PM2 clustering for better CPU utilization
- Nginx caching for static assets
- Gzip compression
- Non-root user for security

### Resource Limits

Adjust in `docker-compose.prod.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: "2"
      memory: 2G
    reservations:
      cpus: "1"
      memory: 1G
```

### PM2 Instances

Adjust in `ecosystem.config.js` or via environment:

```bash
PM2_INSTANCES=4 docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
- name: Build and push Docker image
  run: |
    docker build -t home-ui:latest .
    docker push home-ui:latest

- name: Deploy to server
  run: |
    ssh user@server 'cd /app && docker-compose -f docker-compose.prod.yml pull'
    ssh user@server 'cd /app && docker-compose -f docker-compose.prod.yml up -d'
```

## 📝 Notes

- **Development**: Uses hot-reload, mounts source code as volume
- **Production**: Optimized build, PM2 clustering, nginx reverse proxy
- **Logs**: Stored in `./logs` directory and Docker volumes
- **Health Checks**: Automatic container health monitoring
- **Auto-restart**: PM2 automatically restarts on crashes

## 🆘 Support

For issues or questions:

1. Check logs: `docker-compose logs -f`
2. Verify configuration: `.env` and `ecosystem.config.js`
3. Check health endpoint: http://localhost/api/health
4. Review nginx logs: `docker logs home-ui-nginx-prod`
