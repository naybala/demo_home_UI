module.exports = {
  apps: [
    {
      name: "home-ui",
      script: "./server.js",
      instances: process.env.PM2_INSTANCES || 1,
      exec_mode: "cluster",

      watch: false,
      max_memory_restart: "512M",

      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      time: true,

      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",

      listen_timeout: 3000,
      kill_timeout: 5000,

      wait_ready: false,
    },
  ],
};
